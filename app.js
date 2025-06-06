require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const app=express()
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("successfully connected to mongodb")})
.catch((error)=>{console.log(error)})
const userRoute=require("./routes/userRoute")
app.use(express.json())
app.use(userRoute)
const port=8000
app.listen(8000,()=>{
    console.log(`Server Listen on port ${port}`)
})