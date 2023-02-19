import express from 'express';
import { ISignup } from './signup/_.type';

const router = express.Router();


router.post<ISignup, ISignup, ISignup>('/signup', (req, res) => {
})

export default router;
