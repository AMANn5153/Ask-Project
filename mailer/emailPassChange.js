const nodemailer=require("nodemailer")
const ejs =require("ejs")

const passChange=async(req)=>{
    try{
    const data=await ejs.renderFile(__dirname+"/template/changePassword.ejs")
    console.log(data)

    let  transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            type:"OAuth2",
            user:process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId:process.env.OAUTH_CLIENTID,
            clientSecret:process.env.OAUTH_CLIENT_SECRET,
            refreshToken:process.env.OAUTH_REFRESH_TOKEN
  
        }
    })
    let mailOption={
        from:"amann5153@gmail.com",
        to:req.to,
        subject:`Hi! ${req.name}`,
        text:"hello",
        html:data
    }
    await transporter.sendMail(mailOption); 
    } 
    catch(e){
        console.log(e)
    }
}


module.exports={passChange}