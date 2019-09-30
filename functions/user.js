import client from '../dbConnection';
import handleCrud from '../handleCrud';
import handleAuth from '../handleAuth';
import userModel from '../models/userModel';
const databaseName = 'main';

exports.handler = async(event, context) => {
    try {
        await client.connect();
    } catch(err) {
        console.log('Error: Unable to connect to database:', err);
    }

    const database = client.db(databaseName);
    const collection = database.collection('users');

    return await handleAuth(event, userModel, collection);
}