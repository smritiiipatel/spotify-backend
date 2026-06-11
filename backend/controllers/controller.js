import userModal from "../models/model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

 async function registerUser(req,res) {
    
const {username,email,password, role='user'}=req.body;

const isUserAlreadyExsists = await  userModal.findOne({
    $or:[
        {username},{email}
    ]
})
if(isUserAlreadyExsists){
    return res.status(400).json({message :"user already exists"})
}

const hash = await bcrypt.hash(password,10);

const user =await userModal.create({
username, email,password:hash,role
})

const token = jwt.sign({
    id:user._id,   //jwt banane ke liye ek unique cheez deni padhti hai
    role: user.role,
}, process.env.JWT_SECRETKEY)

res.cookie("token", token)

res.status(201).json({
    message:"user created successfully",
    user:{
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    }
})

}

async function loginUser(req,res) {

    const {username , email, password}= req.body;
     
    const user = await userModal.findOne({
        $or:[
            {username},{email}
        ]
    })

    if(!user){
        return res.status(401).json({message:"invalid credentials"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(401).json({message:"invalid credentials"})

    }

    const token = jwt.sign({
        id:user._id,
        role:user.role, 
    },process.env.JWT_SECRETKEY)

    res.cookie("token" ,token)

    res.status(200).json({
        message:"user logged in successfully",
        token,
        username: user.username,
        email: user.email,
        role: user.role,
    })
}

async function logoutUser(req,res) {

    res.clearCookie("token");
    res.status(200).json({message:"logged out successfully"})
    
}


export { registerUser, loginUser , logoutUser }