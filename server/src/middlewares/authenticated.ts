import { NextFunction, Request, Response } from "express"
import { Users } from "../modules"
import { jwt } from "../utilities"

const authenticated = (state: Boolean) => async (req: Request, res: Response, next: NextFunction) => {
  // destruct the Bearer Token
  const { token } = req.headers

  // @ts-ignore
  const { user_id } = jwt.verify(token);

  if (user_id) {

    try {
      req.body.user = await Users.findById(user_id, { _id: 1, email: 1 });

      // case: we need to be not authenticated
      if (state === false) {
        // already signed
        if (req.body.user?._id) return res.status(322).send('already signed in')

        // not signed
        if (!req.body.user?._id) return next()
      }

      // case: we need to be authenticated
      if (state !== false) {
        // already signed
        if (req.body.user?._id) return next()

        // not signed
        if (!req.body.user?._id) return res.status(322).send('already signed in')
      }

    } catch (error) {
      res.status(500).send(error);
    }
  } else {
      // case: we need to be authenticated
      if (state === true) {
      return res.status(401).send('unauthenticate')
    }

    // case: we need to be not authenticated
    if (state !== true) {
      return next()
    }
  }
}

export default authenticated