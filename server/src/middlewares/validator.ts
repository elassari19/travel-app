import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const validator = (validators: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // process validation of signup data ?
    req.body = await validators.parseAsync(req.body)

    // signup data is valid
    next()
  } catch (error) {
    // something happen
    if (error instanceof ZodError) res.status(422).send(error.message)
    next(error)
  }
}

export default validator