import { MongoClient } from "mongodb";
require('dotenv').config();

export const client = new MongoClient(process.env.MONGO_URI!)

export const db = client.db()