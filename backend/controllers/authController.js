const { json } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async(req,res)=>{
    try{
            const { name, email, password } = req.body; 
            if(!name || !email || !password)
            {
                return res.status(400).json({message:"All fields required"});
            }

            const existingUser = await User.findOne({email}); 

            if(existingUser)
            {
                return res.status(400).json({message:"Email already exists"});
            }

            const hashedPassword = await bcrypt.hash(password,10);
            
            const newUser = new User({
                name,
                email,
                password:hashedPassword
            });

            await newUser.save();
            res.status(200).json({message:"User registered successfully"});
    }catch(err){
        res.status(500).json({message:"Register Error 123"});
    }
};

const loginUser = async (req,res) => {
    try{
            const { email , password } = req.body;
            if(!email || !password)
            {
                return res.status(400).json({message:"All fields required"});
            }
            const user = await User.findOne({email});
            if(!user)
            {
                return res.status(404).json({message:"Invalid Email"});
            }
            const isMatched = await bcrypt.compare(password,user.password);
            if(!isMatched)
            {
                return res.status(400).json({message:"Invalid Password"});
            }
            const token = jwt.sign(
                {
                    id:user._id
                },
                "secretkey",
                {
                    expiresIn: "1d"
                }
            );
            res.status(200).json({
                message:"Login successfully",
                token
            });

    }catch(error){
        res.status(500).json({message:"Login Error"});
    }
}

module.exports = { registerUser, loginUser };

