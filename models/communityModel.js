const mongoose=require("mongoose")


const community=new mongoose.Schema({
    communityName:{
        type:String,
        required:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    technology:[{
        type:String
    }],
    members:[{
        type:mongoose.Schema.Types.ObjectId
    }],
    Post:[{
        postCreator:{type:mongoose.Schema.Types.ObjectId},
        title:{type:String,required:true},
        content:{type:String,required:true},
    }],
})

const Community=new mongoose.model("Community",community)

module.exports={Community}
