import { NextFunction, Request, Response } from 'express';
import { WithId } from 'mongodb';
import { ISignup } from 'api/signup/_.type';
import { Users } from '../';
import crypto from 'crypto'
import { emailSender } from '../../utilities';

// solve problem of underscore (_) of id
export type withid = WithId<ISignup> 

const insertUser = async (req: Request<ISignup>, res: Response, next: NextFunction) => {
  try {
    // find user by email
    const result = await Users.findOne({ email: req.body.email })

    // the user/email already exist
    if ( result?._id ) return res.status(302).send(req.body)

    // hashing password
    req.body = { 
      email: req.body.email,
      password: crypto.pbkdf2Sync(req.body.password, process.env.SALT!, 42, 64, `sha512`).toString(`hex`),
      verification: crypto.randomBytes(64),
      verified: false
    }

    // insert user/data in db
    if ( !result?._id ) {
      // @ts-ignore
      Users.insertOne(req.body, { returnDocument: 'after' })
        .then(async () => {
          await emailSender({
            to: 'hicham@omicmd.com',
            subject: 'verify your email',
            text: "please don't replay this email ",
            html: `<h1>Email Confirmation</h1>
            <div>
            <h2>Hello ${req.body.email.split('@')[0]}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href="http://${process.env.BASE_URL}/confirm?id=${req.body._id}&confirm=${req.body.verification}" >CLICK TO VIREFY EAMIL </a>
            </div>`
          })
          return res.status(201).send(req.body)
        })
    }

  } catch (error) {
    console.log(error)
    next(error)
  }
}

export default insertUser;
