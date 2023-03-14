import { NextFunction, Request, Response } from "express"
import { WithId } from "mongodb"
import { hash, jwt } from "../../utilities"
import { Users } from "../../modules"
import { ISignIn } from "./_.type"
import cookie from "cookie";

export type withid = WithId<ISignIn> 

const signInUser = async (req: Request<ISignIn>, res: Response, next: NextFunction) => {
  try {

    // get query
    const { email, password } = req.body;

    // find user by id
    const result = await Users.findOne({ email }, { _id: 1, email: 1, password: 1, verified: 1 })

    // id not valid
    if (!result?._id) return res.status(404).send('email not found')

    // id not valid
    if (result.verified !== true) return res.status(406).send('account not verified')

    // password not valid
    if (result.password !== hash(password as string)) return res.status(406).send('password not valid')

    // sign in succeeded
    // @ts-ignore
    const token = jwt.sign({ user_id: result._id, email: result.email })
    await Users.updateOne(
      { email },
      { $set: { token }, },
      { new: true }
    ).then((response) => {
      console.log('req', response)
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      )
      .status(200)
      .send(token);
    })

  } catch (error) {
    console.log(error)
    next(error)
  }
}

export default signInUser
