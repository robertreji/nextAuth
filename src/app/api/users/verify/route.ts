import {connectDb} from '@/dbConnection/dbConfig'
import User from '@/models/user.model'
import {NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailler'

connectDb() 

export async function POST(request :NextRequest){
    try {

        const {token}= await request.json()

        if(!token)throw new Error("email is required")
        
        const user =await  User.findOne({verifyToken:token ,verifyTokenExpiry:{$gt:Date.now()}})

        if(user)
        {
            user.isVerified=true
            user.verifyToken=undefined
            user.verifyTokenExpiry=undefined
            await user.save()
            return NextResponse.json({msg:"email verified sucessfulyy"})
        }
        else return NextResponse.json({msg:"email verified unsucessfulyy"})

        
    } catch (error :unknown) {
        if(error instanceof Error) return NextResponse.json({msg:"unble to verify user ,something went wrong "})
            else {
        return NextResponse.json({msg:"something unknown happened while verifying..."})}
    } 
}