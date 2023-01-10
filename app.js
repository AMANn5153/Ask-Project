const express = require('express')
const app = express()
const dotenv=require("dotenv")
const cookieParser=require("cookie-parser")


app.use(express.static("/profile_pic"))
app.use("/passChange",express.static(__dirname+"/mailer/template/public"))

dotenv.config({path:"./config.env"})
app.use(express.json())// it is middleware which parses income request with json payload

require("./db/conn")
app.use(cookieParser())

app.use(require("./router/routingask"))// middleware where all the routes are defined or all the Api's are defined


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(8081, () => console.log("connected to port number 8081"))//creting a port number 8081