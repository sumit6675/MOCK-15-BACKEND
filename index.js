require("dotenv").config()
const express=require("express")
const app=express()
const cors=require("cors")
const { connection } = require("./Config/db")
const { userRoutes } = require("./Routes/user.Route")

app.use(
  cors({
    origin:"*"
  })
)

app.use(express.json())

app.get("/",(req,res)=>{
  res.send("Welcome to Mock15")
})

app.use("/user",userRoutes)

app.listen(process.env.port,async()=>{
  try{
    await connection
    console.log("Connected to Mock15 DB ")
  }catch(err){
    console.log('err', err)
  }
  console.log(`server is live at : ${process.env.port}`)
})
