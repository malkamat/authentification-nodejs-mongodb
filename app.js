const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
//import routes
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

dotenv.config()

//conect to db*
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
() => console.log("connected to db!"))


//middleware
app.use(express.json())

//route middlewares
app.use("/api/user", authRoute)
app.use("/api/posts", postRoute)

app.listen(3000, () => console.log("server up and running"))