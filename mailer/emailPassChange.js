const nodemailer=require("nodemailer")
const hbs =require("nodemailer-express-handlebars")
const {google}=require("googleapis")
const path=require("path")


const OAuth2=google.auth.OAuth2

const passChange=async(req)=>{
    try{
    const link=`http://localhost:3000/Login/EnterPassChange?token=${req.passToken}&email=${req.to}`//link to passwo`rd change 
    //page provides an acess token to the page and email from which password change request has come
    const oauth2Client=new OAuth2(//Creating an object of Oauth2 from googleapi third party module which allows 
    //us to use googleApi. we're using this to get access token so that we dont need to refresh access token 
    //after its get expire
    //configuring  the clientId ClientSecret in oauthplayground to get acces token for 
    //Api services
        process.env.OAUTH_CLIENTID,
        process.env.OAUTH_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    )

    oauth2Client.setCredentials({
        //refresh token provided for the particular google Api services 
        //this can be exhange for access token
        refresh_token:process.env.OAUTH_REFRESH_TOKEN
    })

    const accessToken= await new Promise((resolve,reject)=>{//creating a promise fot getting an access token
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
    
    const handlebarOptions={// handling handle bar template 
        viewEngine:{//defing thr engine path
            partialsDir:path.join(__dirname,"../","/views/"),
            defaultLayout:false//defining engine extension
        },
        viewPath:path.join(__dirname,"../","/views/")//giving template path
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