const nodemailer=require("nodemailer")
const ejs =require("ejs")
const {google}=require("googleapis")
const path=require("path")


const OAuth2=google.auth.OAuth2

const passChange=async(req)=>{
    try{
    // const data=await ejs.renderFile(path.join(__dirname,"../","views/index.ejs"))
    const oauth2Client=new OAuth2(
        process.env.OAUTH_CLIENTID,
        process.env.OAUTH_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    )

    oauth2Client.setCredentials({
        refresh_token:process.env.OAUTH_REFRESH_TOKEN
    })

    const accessToken= await new Promise((resolve,reject)=>{
        oauth2Client.getAccessToken((err,token)=>{
            if(err){
                reject("some error has occured");
            }
            resolve(token)
        })
    })

    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            type:"OAuth2",
            user:process.env.MAIL_USERNAME,
            accessToken,
            clientId:process.env.OAUTH_CLIENTID,
            clientSecret:process.env.OAUTH_CLIENT_SECRET,
            refreshToken:process.env.OAUTH_REFRESH_TOKEN
        }
    })
    
    const mailOption={
        from:"amann5153@gmail.com",
        to:req.to,
        subject:`Hi! ${req.name}`,
        html:'<p>`hello ${req.name}`</p><p>reset your password <a href=`http://localhost:3000/Login/EnterPassChange?token=${req.passToken}&email=${req.to}`> click here</a> </p>'
    }
   const result= await transporter.sendMail(mailOption); 
    } 
    catch(e){
        console.log(e)
    }
}


module.exports={passChange}