import { NextFunction, Request, Response } from "express"
import { WithId } from "mongodb"
import { Users } from "../../modules"
import { IReSend } from "./_.type"
import crypto from 'crypto'

export type withid = WithId<IReSend> 

const verifyUser = async (req: Request<IReSend>, res: Response, next: NextFunction) => {
  try {

    // get query
    const { email } = req.body;

    // find user by id
    const result = await Users.findOne({ email }, { _id: 1, email: 1 })
    console.log('result', result)

    // email not found
    if (!result?._id) return res.status(404).send('this email not found')

    // email founded
    req.body = await Users.updateOne(
      { email },
      {
        $set: { verified: true, verification: crypto.randomBytes(64).toString('hex'), $currentDate: { lastUpdated: true } }, 
      }
    )
    console.log('succeeded', req.body)
    res.status(200).send(req.body)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export default verifyUser
