
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const User = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        trim: true,
    },
    userEmail:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    userPassword:{
        type: String,
        required: true,
        trim: true,
    },

},{timestamps:true})

User.pre("save", async function (next) {
    // PAROLA DEĞİŞTİRİLMEMİŞSE DEVAM ET
    if (!this.isModified("userPassword")) {
      return next();
    }
  
    try {
      // PAROLA DEĞİŞTİRİLMİŞSE ŞİFREYİ HASHLE
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(this.userPassword, salt);
      this.userPassword = hashedPass;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  

const userModel = mongoose.model("pos-users", User)

module.exports = userModel

