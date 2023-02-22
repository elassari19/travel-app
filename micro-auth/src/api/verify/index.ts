import { NextFunction, Request, Response } from "express"
import { WithId } from "mongodb"
import mongoose from "mongoose"
import { Users } from "../modules"
import { IVerify } from "./_.type"

export type withid = WithId<IVerify> 

const verifyUser = async (req: Request<IVerify>, res: Response, next: NextFunction) => {
  try {

    // get query
    const { confirm, id } = req.query;

    // find user by id
    const result = await Users.findById(id, { _id: 1, email: 1, verification: 1, verified: 1 })
    console.log('result', result)

    // id not valid
    if (!result?._id) return res.status(422).send('this url not valid')

    // already verfied
    if (result?.verified === true) return res.status(302).send('this account already verfied')

    // verfication code not valid
    if (result?.verification != confirm) return res.status(422).send('verification failied please reques new validation code')

    // verfication succeeded
    await Users.updateOne(
      { _id: id },
      {
        $set: { verified: true, verification: '', $currentDate: { lastUpdated: true } }, 
      }
    )
    res.status(201).send('verification succeeded')
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export default verifyUser
