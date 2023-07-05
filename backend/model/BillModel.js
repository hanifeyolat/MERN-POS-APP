
const mongoose = require("mongoose")

const Bill = new mongoose.Schema({
    userEmail:{
        type: String,
        required: true,
        trim: true,
    },
    userName:{
        type: String,
        required: true,
        trim: true,
    },
    cartItems:{
        type: [], 
        required: true,
    },
    cartTotal:{
        type: Number, 
        required: true,
    },
    tax:{
        type: Number, 
        required: true,
    },
    subTotal:{
        type: Number, 
        required: true,
    },
    paymentMode:{
        type: String, 
        required: true,
    },
    teslimAlan:{
        type: String, 
        required: true,
    },   
    address:{
        type: String, 
        required: true,
    },  
    city:{
        type: String, 
        required: true,
    },  
    country:{
        type: String, 
        required: true,
    }
},{timestamps:true})

const billModel = mongoose.model("pos-bills", Bill)

module.exports = billModel

