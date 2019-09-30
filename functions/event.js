import client from '../dbConnection';
import handleCrud from '../handleCrud';
import eventModel from '../models/eventModel';
const databaseName = 'main';

exports.handler = async(event, context) => {
    try {
        await client.connect();
    } catch(err) {
        console.log('Error: Unable to connect to database:', err);
    }

    const database = client.db(databaseName);
    const collection = database.collection('events');

    const userCollection = database.collection('users');

    return await handleCrud(event, eventModel, collection, userCollection);
}