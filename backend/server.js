import express from "express"
import cloudinary from "cloudinary"
import shortid from "shortid"
import Razorpay from "razorpay"
import passport from 'passport'
import morgan from "morgan"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoute from "./routes/productRoutes.js"
import UserRoute from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import OrderRoute from "./routes/orderRoutes.js"
import CouponRoute from './routes/couponRoutes.js'
import Order from "./models/orderModel.js"
import CartRoutes from './routes/cartRoutes.js'
import session from "express-session"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import User from "./models/userModel.js"
import generateToken from "./utills/generateTokens.js"




dotenv.config()
connectDB()

const app = express()
app.use(express.json({limit:'50mb'}))

app.use(session({
  secret:'rokiemlo',
  resave:false,
  saveUninitialized:false
}))


app.use(passport.initialize())
app.use(passport.session())

if (process.env.NODE_ENV === "development mode") {
  app.use(morgan("dev"))
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const razorpay=new Razorpay({
  key_id:process.env.RAZORPAY_KEY,
  key_secret:process.env.RAZORPAY_KEY_SECRET
  
})


app.post('/razorpay/pay/:id',async(req,res)=>{
  const order=await Order.findById(req.params.id)
  const payment_capture=1
  const amount=200
  const currency='INR'

  const options={
    amount:order.totalPrice * 100,
    currency,
    receipt:shortid.generate(),
    payment_capture,
  }
  try {
    const response=await razorpay.orders.create(options)
    res.json({
      id:response.id,
      currency:response.currency,
      amount:response.amount,

    })
  } catch (error) {
    console.log(error)
  }
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          done(null, existingUser);
        } else {
          const user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email:profile.emails[0].value
          });
          done(null, user);
        }
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);

// Serialize and deserialize user object for session management
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .exec()
    .then((user) => done(null, user))
    .catch((err) => done(null, err));
});



// Route to initiate the Google sign-in flow
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile",'email'] })
);

// Route to handle the Google callback and redirect to client-side login
app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("http://localhost:3000/login");
  }
);

// API endpoint to retrieve authenticated user's information
app.get("/api/auth/user", (req, res) => {
  if (req.user) {
    // const { _id, googleId, name } = req.user;
    const user=req.user
    res.json({
      id:user. _id,
      email:user.emails,
      googleId:user.googleId,
      name:user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Unauthorized please register" });
  }
});











app.get("/", (req, res) => {
  res.send("api called")
})
app.use("/api/products", productRoute)
app.use("/users", UserRoute)
app.use("/orders", OrderRoute)
app.use('/api/cart',CartRoutes)
app.use('/api',CouponRoute)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
app.listen(PORT, console.log(`server running in ${NODE_ENV} on port ${PORT}`))
