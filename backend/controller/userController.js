import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utills/generateTokens.js"


const registerUser=asyncHandler(async(req,res)=>{
  const {name,email,password}=req.body

  const userExist= await User.findOne({email})

  if(name.length < 3){
    res.status(400)
    throw new Error('name should be atleast 3 character long')
  
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    res.status(400)
    throw new Error('Invalid email address')
  }
  if(password.length < 4 || password===""){
    res.status(400)
    throw new Error('password is required and should be atleast 4 character long')
  }

  if(userExist){
    res.status(400)
    throw new Error('user already exist')
  }
  const user = await User.create({
    name,
    email,
    password
  })
  if(user){
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      token:generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error('user not found')
  }
})



const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if(email && password === ''){
   res.status(400) 
   throw new Error('both field required')
    
  }
  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("invalid email or password")
    
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error("user not found")
  }
})
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name=req.body.name || user.name
    user.email=req.body.email || user.email

    if(req.body.password){
      user.password = req.body.password
    }
    const updateUser=await user.save()
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    })
  } else {
    res.status(401)
    throw new Error("user not found")
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
   if(user){
    await User.findByIdAndRemove(req.params.id)
    res.json({message:'user removed'})
   }else{
    res.status(401)
    throw new Error('user not found')
   }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
   if(user){
    res.json(user)
   }else{
    res.status(401)
    throw new Error('user not found')
   }
})

//@desc  Update user
//@route PUT /users/:id
//access  Private/Admin

const updateUser=asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id)

  if (user) {
    user.name=req.body.name || user.name
    user.email=req.body.email || user.email
    user.isAdmin=req.body.isAdmin || user.isAdmin

    const updateUser=await user.save()
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      
    })
  } else {
    res.status(401)
    throw new Error("user not found")
  }
})

const countUsersToday = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

    const startOfPrevMonth = new Date(today.getFullYear(), today.getMonth() -1,1);
    const endOfPrevMonth = new Date(today.getFullYear(), today.getMonth() , 0, 23, 59, 59, 999);

    const userCountToday = await User.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    const userCountMonth = await User.countDocuments({
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth
      }
    });

    const userCountPrevMonth = await User.countDocuments({
      createdAt: {
        $gte: startOfPrevMonth,
        $lte: endOfPrevMonth
      }
    });

    return res.json({ userCountToday,userCountMonth ,userCountPrevMonth});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
}






export { authUser, getUserProfile,registerUser,updateUserProfile,getUsers,deleteUser ,getUserById,updateUser,countUsersToday}
