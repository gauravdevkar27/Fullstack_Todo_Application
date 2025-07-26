const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, required: true },
    passWord: { type: String, required: true }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified) return next();
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(user.passWord, salt);
    user.passWord = hash;
    next();
});

userSchema.methods.comparePassword = async function (passWord){
    return bcrypt.compare(passWord, this.passWord);
}



const User = mongoose.model("User", userSchema);

module.exports = User; 