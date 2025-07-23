import mongoose from "mongoose";

export async function connectDb(){
    try {
         await mongoose.connect(process.env.MONGO_URL!)
         const connection = mongoose.connection
         connection.on("connected",()=>{
            console.log("mongoose connection was sucess !")
         })
         connection.on("error",(err)=>{
            console.log("unable to connect to db ..")
            console.log(err)
            process.exit()
         })
        
    } catch (error) {
        console.log("something went wrong while tring to connect with database")
        console.log(error)
    }
}