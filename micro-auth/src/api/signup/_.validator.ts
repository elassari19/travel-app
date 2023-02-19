import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ISignup, Signup } from "./_.type";

const validator = () => async (req: Request<ISignup>, res: Response, next: NextFunction) => {
  try {
    // process validation of signup data ?
    req.body = await Signup.parseAsync(req.body)

    // signup data is valid
    next()
  } catch (error) {
    // something happen
    if (error instanceof ZodError) res.status(422)
    next(error)
  }
}

export default validator