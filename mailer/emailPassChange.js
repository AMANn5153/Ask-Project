const nodemailer=require("nodemailer")
const hbs =require("nodemailer-express-handlebars")
const {google}=require("googleapis")
const path=require("path")


const OAuth2=google.auth.OAuth2

const passChange=async(req)=>{
    try{
        const link=`http://localhost:3000/Login/EnterPassChange?token=${req.passToken}&email=${req.to}`
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
    
    const handlebarOptions={
        viewEngine:{
            partialsDir:path.join(__dirname,"../","/views/"),
            defaultLayout:false
        },
        viewPath:path.join(__dirname,"../","/views/")
    }

    transporter.use('compile',hbs(handlebarOptions))


    const mailOption={
        from:"amann5153@gmail.com",
        to:req.to,
        subject:`Hi! ${req.name}`,
        template:'index',
        context:{name:req.name,
            link:link
        }
    }
   const result= await transporter.sendMail(mailOption); 
    } 
    catch(e){
        console.log(e)
    }
}


module.exports={passChange}