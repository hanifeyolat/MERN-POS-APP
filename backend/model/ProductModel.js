
const mongoose = require("mongoose")

const Product = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
        unique:true,
        trim: true,
    },
    productPrice:{
        type: Number,
        required: true,
        trim: true,
    },
    productImg:{
        type: String,
        required: true,
        trim: true,
    },
    productCategory:{
        type: String,
        required: true,
        trim: true,
    },

},{timestamps:true})

const productModel = mongoose.model("pos-products", Product)

module.exports = productModel

