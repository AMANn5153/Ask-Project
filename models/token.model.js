const mongoose=require("mongoose")

const token=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId},
    token:{type:String},
    expiresAt:{
        type:Date,
        default:Date.now,
        expires:3600
    }
})


const Token=new mongoose.model("Token",token);

module.exports={Token}