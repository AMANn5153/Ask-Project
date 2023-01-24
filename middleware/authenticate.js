const jwt=require("jsonwebtoken")
const {Testbackend}=require("../models/models")


const authenticate= async (req,res,next)=>{
    try{
    const token= req.cookies.authcookie// taking token
    const authnToken= jwt.verify(token,process.env.SECRET)//verfify token with secret key{token is made up of user unique id and secret key} return unique id
    const userInfo= await Testbackend.find({_id:authnToken._id},{"tokens.token":token})//finding document that matches the unique id and token 

    if(!userInfo){res.status(209).json({error:"user info is not available"})}
        req.token=token;
        req.userinfo=userInfo;
        req.userId=userInfo[0]._id;
        next();
    }
    catch(e){
        res.status(401).json({message:"Please loggin first"})
        console.log(e)
    }

}

module.exports=authenticate
