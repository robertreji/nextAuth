import nodemailer from 'nodemailer'
import {Types} from 'mongoose'
import User from '@/models/user.model'
import bcryptjs from 'bcryptjs'

type emailType={
    email :string, emailType:string, userId:Types.ObjectId
}

export const sendEmail = async({email, emailType, userId}:emailType)=>{

    try {
        const token= await bcryptjs.hash(userId.toString(),10)
        if(emailType === "verify")
        {
            await User.findByIdAndUpdate(userId,{
            verifyToken:token,
            verifyTokenExpiry:Date.now()+3600000
           })

        }else{
             
            await User.findByIdAndUpdate(userId,{
            forgotPasswordToken:token,
            forgotPasswordTokenExpirt:Date.now()+3600000
           })
        }

     // Looking to send emails in production? Check out our Email API/SMTP product!
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure:false,
            auth: {
                user: "bafdc2b4f2e8ce",
                pass: "d5e39b157f5a16"
            }
        });
        const mailOptions = {
            from: '"My App" <noreply@example.com>',
            to: email,
            subject:emailType === "forgotPassword"?" Reset your password":"verify your email",
            html: `
                    <p>
                        Click 
                        <a href="${process.env.DOMAIN}/verify?token=${token}">
                        here
                        </a> 
                        to ${emailType === "verify" ? "verify your email" : "reset your password"}.
                        <br>
                        Or copy and paste the link below in your browser:
                        <br><br>
                        ${process.env.DOMAIN}/verify?token=${token}
                    </p>
                    `
        }

        const mailresponse = await transporter.sendMail(mailOptions)
        return mailresponse
    } catch (error :unknown) {
        if(error instanceof Error)throw new Error(error.message)
        else throw new Error("unknwn error occured")  
    }

}

