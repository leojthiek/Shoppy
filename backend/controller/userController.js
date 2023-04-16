import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utills/generateTokens.js"


const registerUser=asyncHandler(async(req,res)=>{
  const {name,email,password}=req.body

  const userExist= await User.findOne({email})

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

export { authUser, getUserProfile,registerUser,updateUserProfile,getUsers,deleteUser ,getUserById,updateUser}
