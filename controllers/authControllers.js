const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

async function registerUser(req, res){

let {firstName,lastName,userName,passWord} = req.body;

  try{

    const duplicate = await User.find({userName});

    if(duplicate && duplicate.length > 0){
        return res.status(400).send({message: 'User already registered with this username'});
    } 

    let user = new User({firstName,lastName,userName,passWord});
    
    const result = await user.save();
    console.log(result);
    res.status(201).send({message: 'User registered successfully'});

  } catch(err){
    console.log(err);
    res.status(400).send(err);
  }
}

async function loginUser(req, res) {

    try{
      const {userName, passWord} = req.body;

      const user = await User.findOne({userName});
      if(!user){
        return res.status(400).send({error: "Authenticate Failed"});
      }
      
      const isPasswordValid = await user.comparePassword(passWord);
      if(!isPasswordValid){
        return res.status(400).send({error: "Wrong password"});
      }


      let token = jwt.sign({userId:user?._id},secretKey, {expiresIn: '1h'});
      let finalData = {
        userId:user?._id,
        userName:user?.userName,
        firstName:user?.firstName,
        lastName:user?.lastName,
        token
      }
      res.send(finalData);
    } catch(err)
    {
        console.log(err);
        res.status(400).send();
    }
}

const AuthController = {
    registerUser,
    loginUser
}

module.exports = AuthController;