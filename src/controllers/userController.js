const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI"

const signup = async(req,res)=>{

    //Existing user check
    //Hashed Password
    //User creation/
    // Token generate

    const {username,email, password}= req.body;
    try {
        const existingUser = userModel.findOne({email : email});
        if(existingUser){
            return res.status(400).json({message:"Email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await userModel.create({
            email:email,
            password: hashedPassword,
            username: username
        });
        const token = jwt.sign({id:result._id}, SECRET_KEY, {expiresIn: ""})
        res.status(201).json({message:"User created successfully",token:token})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
}

const signin =async (req,res)=>{
    const {email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({email : email});
        if(!existingUser){
            return res.status(404).json({message:"User not found"})
        }

        const matchPassword = await bcrypt.compare(password,existingUser,password);
        if(!matchPassword){
            return res.status(400).json({message:"Invalid password"})
        }
        const token = jwt.sign({email: existingUser.email,id:existingUser._id},SECRET_KEY);
        res.status(200).json({message:"User logged in successfully",token:token})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports = {signup,signin}