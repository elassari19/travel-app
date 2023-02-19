import { db } from 'db';
import { NextFunction, Request, Response } from 'express';
import { WithId } from 'mongodb';
import { ISignup } from 'api/signup/_.type';
import { Users } from '../';

// solve problem of underscore (_) of id
export type withid = WithId<ISignup> 

const insertUser = async (req: Request<ISignup>, res: Response, next: NextFunction) => {
  try {
    // find user by email
    const result = await Users.findOne({ email: req.body.email })

    // the user/email already exist
    if ( result?._id ) return res.status(302).send(req.body)

    // insert user/data in db
    if ( !result?._id ) {
      // @ts-ignore
      Users.insertOne(req.body, { returnDocument: 'after' })
        .then(resp => res.status(201).send(req.body))
    }

  } catch (error) {
    console.log(error)
    next(error)
  }
}

export default insertUser;
