const mongoose = require('mongoose');
const {Schema} =  mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: {type:String, required: true},
    passWord: {type:String, required: true}
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

module.exports = User;