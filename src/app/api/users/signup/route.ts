import {connectDb} from '@/dbConnection/dbConfig'
import User from '@/models/user.model'
import {NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailler'

connectDb()
export async function POST(request :NextRequest)
{
    try {
      const reqbody =await request.json()
      const {username,email,password}= reqbody
        console.log("req body :",reqbody)
       const user =  await User.find({email})
        console.log("user :",user)
       if(user.length>0) return NextResponse.json({res:"user alreadyexists"})
        const salt = await bcryptjs.genSalt(10)
       const hashedPass = await bcryptjs.hash(password,salt)

       const newUser = new  User({
        username,
        email,
        password:hashedPass
       })

       const savedUser= await newUser.save()

       if(savedUser) console.log("saved user :",savedUser)

    // send email
    await sendEmail({email,emailType:"verify",userId:savedUser._id})

    return NextResponse.json({message:"user registered sucessfully "})

    } catch (error :unknown) {
        if(error instanceof Error)return NextResponse.json({error:error.message,status:401})
    }
}

