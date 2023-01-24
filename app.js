const express = require('express')
const app = express()
const dotenv=require("dotenv")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const PORT=process.env.PORT||8081


app.use(cors({
    origin: 'https://ask-project-aman.netlify.app/Question',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
}))
app.use(express.static("/profile_pic"))

dotenv.config({path:"./config.env"})
app.use(express.json())// it is middleware which parses income request with json payload

require("./db/conn")
app.use(cookieParser())

app.use(require("./router/routingask"))// middleware where all the routes are defined or all the Api's are defined


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`connected to port number ${PORT}`))//creting a port number 8081