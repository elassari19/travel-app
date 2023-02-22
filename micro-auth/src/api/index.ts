import express from 'express';
import insertUser from './signup';
import { Signup } from './signup/_.type';
import { validator } from '../middlewares';
import verifyUser from './verify';

const router = express.Router();

router.post('/signup', validator(Signup), insertUser)
router.get('/verify', verifyUser)

export default router;
