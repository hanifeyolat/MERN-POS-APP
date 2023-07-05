
const mongoose = require("mongoose")

const Category = new mongoose.Schema({
    categoryName:{
        type: String,
        required: true,
        unique:true,
        trim: true,
    }
},{timestamps:true})

const categoryModel = mongoose.model("pos-categories" , Category)

module.exports = categoryModel

