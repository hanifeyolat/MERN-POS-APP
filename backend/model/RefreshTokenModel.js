
const mongoose = require("mongoose")

const RefreshToken = new mongoose.Schema({
    refreshToken:{
        type: String,
        required: true,
        unique:true,
        trim: true,
    }
},{timestamps:true})

const RefreshTokenModel = mongoose.model("pos-refresh-tokens" , RefreshToken)

module.exports = RefreshTokenModel

