import {connectDb} from '@/dbConnection/dbConfig'
import User from '@/models/user.model'
import {NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"


export async function POST(request:NextRequest) 
{
    await connectDb() 
   const body = await request.json() 
  const {username,password}=body
  if(!(username && password)) throw new Error("usernme and password is required...");
  
  try {
      const user = await User.findOne({username:username})

      if(!user) return NextResponse.json({msg:"user doesnt exits",status:400})

      const isPasswordCorrect = await bcryptjs.compare(password,user.password)

      if(!isPasswordCorrect) return NextResponse.json({msg:"password is incorrect",status:401},{status:401})
      const TokenPayload ={

        id:user._id,
        username:user.username
      }
     
      const token = await jwt.sign(TokenPayload,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
      const response = NextResponse.json({msg:"user logged in sucessfully",status:"200"})
      response.cookies.set("token",token,{httpOnly:true})
      return response

  } catch (error :unknown) {
    if(error instanceof Error)
    {
        throw new Error("something went wrong while loging in user")
    }else{
        throw new Error("eror unknown")
    }
  }

}

