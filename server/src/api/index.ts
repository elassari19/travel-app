import express from 'express';
import insertUser from './signup';
import { Signup } from './signup/_.type';
import { authenticated, validator } from '../middlewares';
import verifyUser from './verify';
import { ReSendEamil } from './reSendEmail/_.type';
import sendEmail from './reSendEmail';
import { SignIn } from './signIn/_.type';
import signInUser from './signIn';

const router = express.Router();

router.post('/signup', validator(Signup), insertUser)
router.post('/sendemail', validator(ReSendEamil), sendEmail)
router.get('/verify', verifyUser)
router.post('/signin', validator(SignIn), authenticated(false), signInUser)

export default router;
