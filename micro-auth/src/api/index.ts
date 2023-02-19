import { db } from '../db';
import express from 'express';
import insertUser from './signup';
import validator from './signup/_.validator';

export const Users = db.collection('Users')

const router = express.Router();

router.use('/signup', validator(), insertUser)

export default router;
