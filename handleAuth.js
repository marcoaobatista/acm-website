import client from './dbConnection';

import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import isJsonStr from './utility/isJsonStr';
import resJson from './utility/resJson';
import len from './utility/objectLength';
import validate from './validation/validate';
import authorize from './utility/authorize';

export default async(event, model, collection) => {
    let errors = {};

    switch (event.httpMethod) {
        case 'GET':
            if (isJsonStr(event.body)) {
                // Fetch a specific item
                const { email } = JSON.parse(event.body);
                
                try {
                    await authorize(event, 0, collection, errors);
                    
                    if (email === undefined) {
                        errors.email = 'Email is required';
                    } else {
                        if (!model.fields.email.regex.test(email)) {
                            errors.email = 'Email is invalid';
                        }
                    }
        
                    if (len(errors) > 0)
                        return resJson(400, {errors});
                    
                    const user = await collection.findOne({ email });
                    await client.close();
                    delete user.password;
                    
                    return resJson(200, user);
                } catch(err) {
                    errors.request = `Invalid query: ${err}`;
                    return resJson(400, {errors});
                }
            } else {
                // Fetch all items
                
                try {
                    await authorize(event, 0, collection, errors);

                    if (len(errors) > 0)
                        return resJson(400, {errors});
                    
                    const users = await collection.find({}).toArray();
                    await client.close();

                    for (let user of users) {
                        delete user.password;
                    }

                    return resJson(200, users);
                } catch(err) {
                    errors.request = `Invalid query: ${err}`;
                    return resJson(400, {errors});
                }
            }
        case 'POST':
            if (event.path === '/.netlify/functions/user/login') {
                if (!isJsonStr(event.body)) {
                    errors.request = 'Unable to process data. The JSON is likely unformatted.';
                    return resJson(400, {errors});
                }

                validate(JSON.parse(event.body), model, errors);
                if (errors.length > 0)
                    return resJson(400, {errors});

                try {
                    let { email, password } = JSON.parse(event.body);
    
                    let user = await collection.findOne({ email });
                    
                    // user doesn't exit
                    if (user === null) {
                        errors.login = 'No user found for this email/password';
                        return resJson(400, {errors});
                    }

                    const isMatch = await bcrypt.compare(password, user.password);

                    if (!isMatch) {
                        errors.login = 'No user found for this email/password';
                        return resJson(400, {errors});
                    }
    
                    const token = await jwt.sign(
                        { _id: user._id },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 }
                    );
    
                    return resJson(200, { token });
                } catch(err) {
                    errors.request = `Couldn't login: ${err}`;
                    return resJson(400, {errors});
                }
            } else if (event.path === '/.netlify/functions/user/register') {
                if (!isJsonStr(event.body)) {
                    errors.request = 'Unable to process data. The JSON is likely unformatted';
                    return resJson(400, {errors});
                }
                
                validate(JSON.parse(event.body), model, errors);
    
                const { secret } = JSON.parse(event.body);
                if (secret === undefined) {
                    errors.secret = 'Secret is required';
                } else {
                    if (secret !== process.env.REGISTER_SECRET) {
                        errors.secret = 'Secret is not correct';
                    }
                }
    
                if (len(errors) > 0)
                    return resJson(400, {errors});
    
                try {
                    let { email, password } = JSON.parse(event.body);
    
                    let user = await collection.findOne({ email });
    
                    if (user !== null) {
                        errors.register = 'Unable to register';
                        return resJson(400, {errors});
                    }
    
                    const salt = await bcrypt.genSalt(10);
                    password = await bcrypt.hash(password, salt);
                    user = await collection.insertOne({ email, password, permission: 0 });
    
                    const token = await jwt.sign(
                        { _id: user.ops[0]._id },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 }
                    );
    
                    return resJson(200, { token });
                } catch(err) {
                    errors.request = `Couldn't register: ${err}`;
                    return resJson(400, {errors});
                }
            }
        case 'DELETE':     
            try {
                const decoded = await authorize(event, -1, collection, errors);
                
                if (len(errors) > 0)
                    return resJson(400, errors);

                const query = { _id: ObjectId(decoded._id) };
                
                const search = await collection.findOneAndDelete(query);
                await client.close();

                if (search.value === null) {
                    errors.request = 'User not found';
                    return resJson(400, {errors});
                }

                return resJson(200, { successful: true });
            } catch(err) {
                errors.request = `Couldn't delete user: ${err}`;
                return resJson(400, {errors});
            }
        default:
            errors.method = `Method ${event.httpMethod} not allowed.`;
            return resJson(405, {errors});
    }
}