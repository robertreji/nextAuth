import mongoose from 'mongoose'

const userSchema= new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            require:true,
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        forgotPasswordToken:String,
        forgotPasswordTokenExpirt:Date,
        verifyToken:String,
        verifyTokenExpiry:Date

    }
    ,{timestamps:true}) 

const User =mongoose.models.users ||  mongoose.model("users",userSchema)

export default User