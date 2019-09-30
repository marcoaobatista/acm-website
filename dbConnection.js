import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.DB_URL;

import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true });

export default client;