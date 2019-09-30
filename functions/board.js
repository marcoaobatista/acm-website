import client from '../dbConnection';
import handleCrud from '../handleCrud';
import boardModel from '../models/boardModel';
const databaseName = 'main';

exports.handler = async(event, context) => {
    try {
        await client.connect();
    } catch(err) {
        console.log('Error: Unable to connect to database:', err);
    }

    const database = client.db(databaseName);
    const collection = database.collection('board');

    const userCollection = database.collection('users');

    return await handleCrud(event, boardModel, collection, userCollection);
}