const mongoose=require("mongoose")
const { default: isEmail } = require("validator/lib/isEmail")
const bycrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const backendtest=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    profilePic:{
        type:String
    },
    email:{
        type:String,
        required:true,
        validator(v){
            if(v!=isEmail){
                throw new error("email is not valid")
            }
        }
    },
    About:{
        type:String
    },
    mobile:{
        type:String
    },
    profession:{
        type:String
    },
    company:{
        type:String
    },
    college:{
        type:String
    },
    Password:{
        type:String,
        required:true
    },
    Post:[
        {   
            title:{type:String},
            ques:{type:String},
            Likes:[{type:mongoose.Schema.Types.ObjectId}],

        }
    ],
    tokens:[
        {
            token:{
                type:String
            }
        }
    ]
})

const comments=new mongoose.Schema({

    userId:{type:mongoose.Schema.Types.ObjectId, ref:'backendtest'},
    Postid:{type:mongoose.Schema.Types.ObjectId},
    comment:[{
        commenterid:{type:mongoose.Schema.Types.ObjectId},
        comment:{type:String},
        like:{type:Number},
        reply:[{
            replyId:{type:mongoose.Schema.Types.ObjectId},
            message:{type:String}
            }]    
        }
    ]
})

   



backendtest.pre("save",async function(next){
    if(this.isModified("Password")){
        this.Password=await bycrypt.hash(this.Password,12)
    }
    next();
})

backendtest.methods.generateAuthToken=async function(){
    try{
    const tokenGen= jwt.sign({_id:this._id},process.env.SECRET)//genertaes token
    this.tokens=this.tokens.concat({token:tokenGen})
     await this.save();
     return tokenGen;
    }
     catch(e){
        console.log(e)
     }
}
const Testbackend=new mongoose.model("Testbackend",backendtest)
const Comment=new mongoose.model("Comment",comments)

module.exports={Testbackend,Comment}