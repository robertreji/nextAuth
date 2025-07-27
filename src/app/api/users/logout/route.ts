import {connectDb} from '@/dbConnection/dbConfig'
import {NextRequest,NextResponse } from 'next/server'



export async function POST(request:NextRequest) 
{
    await connectDb()

    const response = NextResponse.json({msg:"user logout sucessfully..."})

     response.cookies.set("token","",{httpOnly:true})
    return response
}