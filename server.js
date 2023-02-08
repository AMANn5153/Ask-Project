const express = require('express')
const app = express()
const dotenv=require("dotenv")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const path=require("path")
const PORT=process.env.PORT||8003

    
   
app.enable('trust proxy');
// app.use(cors({
    
//     origin:["https://ask-frontend-lzaw.onrender.com","http://localhost:3000"],
//     credentials: true,
//     methods: ['GET','POST','HEAD','PUT','PATCH','DELETE','OPTIONS'],
//     allowedHeaders: ['Content-Type','Authorization','Set-Cookie','Origin','X-Api-Key','X-Requested-With'],
//     exposedHeaders: ['Content-Type','Authorization','Origin','X-Api-Key','X-Requested-With']
// }))
app.use(express.static("/profile_pic"))

dotenv.config({path:"./config.env"})
app.use(express.json())// it is middleware which parses income request with json payload

require("./db/conn")
app.use(cookieParser())

app.use(require("./router/routingask"))// middleware where all the routes are defined or all the Api's are defined

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static("client/build"))

    app.get('/', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

  

app.listen(PORT, () => console.log(`connected to port number ${PORT}`))//creting a port number 8081