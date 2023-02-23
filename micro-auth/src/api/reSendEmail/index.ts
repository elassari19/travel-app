import { NextFunction, Request, Response } from "express"
import { WithId } from "mongodb"
import { Users } from "../../modules"
import { IReSend } from "./_.type"
import crypto from 'crypto'
import { emailSender } from "../../utilities"

export type withid = WithId<IReSend> 

const sendEmail = async (req: Request<IReSend>, res: Response, next: NextFunction) => {
  try {

    // get query
    const { email } = req.body;

    // find user by id
    const result = await Users.findOne({ email }, { _id: 1, email: 1, verified: 1 })
    console.log('result', result)

    // email not found
    if (!result?._id) return res.status(404).send('this email not found')

    // email not found
    if (result.verified) return res.status(302).send('this email verified')

    // create random verification code
    const verificationCode = crypto.randomBytes(64).toString('hex')

    // email founded
    req.body = await Users.updateOne(
      { email },
      {
        $set: { verification: verificationCode, $currentDate: { lastUpdated: true } }, 
      }
    ).then(async () => {
      await emailSender({
        to: 'hicham@omicmd.com',
        subject: 'resend verification email',
        text: "please don't replay this email ",
        html: `<h1>Email Confirmation</h1>
        <div>
        <h2>Hello ${req.body.email.split('@')[0]}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href="http://${process.env.BASE_URL}/confirm?id=${result?._id}&confirm=${verificationCode}" >CLICK TO VIREFY EAMIL </a>
        </div>`
      })
      return res.status(200).send(result)  
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export default sendEmail
