import express from 'express';
import insertUser from './signup';
import { Signup } from './signup/_.type';
import { validator } from '../middlewares';
import verifyUser from './verify';
import { ReSendEamil } from './reSendEmail/_.type';
import sendEmail from './reSendEmail';

const router = express.Router();

router.post('/signup', validator(Signup), insertUser)
router.post('/sendemail', validator(ReSendEamil), sendEmail)
router.get('/verify', verifyUser)

export default router;
