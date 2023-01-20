const mongoose=require("mongoose")

const token=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId},
    token:{type:String},
    expireAt:{
        type:Date,
        default:Date.now,
        expires:'60m'
    }
},{timestamps:true})


const Token=new mongoose.model("Token",token);

module.exports={Token}