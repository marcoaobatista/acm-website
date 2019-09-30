import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export default async(event, permission, userCollection, errors) => {
    const token = event.headers['x-auth-token'];
    
    if (token === undefined) {
        errors.request = 'No token, authorization denied.';
        return;
    }

    let decoded;
    try {
        console.log('token', token)
        
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        errors.request = 'Invalid token';
        return;
    }
    
    const query = { _id: ObjectId(decoded._id) };
    const search = await userCollection.findOne(query);

    if (search === null) {
        errors.request = 'Unable to perform operation';
        return;
    }

    // -1 means the user sending the request matches the search
    if (permission === -1) {        
        if (search._id.toString() !== decoded._id) {
            errors.request = 'You are not authorizedd';
            return;
        }
    } else {
        if (search.permission !== permission) {
            errors.request = 'You are not authorized';
            return;
        }
    }

    return decoded;
}