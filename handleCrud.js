import client from './dbConnection';

import { ObjectId } from 'mongodb';

import isJsonStr from './utility/isJsonStr';
import resJson from './utility/resJson';
import validate from './validation/validate';
import authorize from './utility/authorize';
import len from './utility/objectLength';

export default async(event, model, collection, userCollection) => {
    let errors = {};

    switch (event.httpMethod) {
        case 'GET':
            if (isJsonStr(event.body)) {
                // Fetch a specific item
                try {
                    const items = await collection.find(JSON.parse(event.body)).toArray();

                    await client.close();
                    return resJson(200, items);
                } catch(err) {
                    console.log(err);
                    
                    errors.request = `Invalid query: ${err}`;
                    return resJson(400, {errors});
                }
            } else {
                // Fetch all items
                try {
                    const items = await collection.find({}).toArray();
                    await client.close();
                    return resJson(200, items);
                } catch(err) {
                    errors.request = `Invalid query: ${err}`;
                    return resJson(400, {errors});
                }
            }
        case 'POST':
            if (!isJsonStr(event.body)) {
                errors.request = 'Unable to post data. The JSON is likely unformatted';
                return resJson(400, {errors});
            }

            validate(JSON.parse(event.body), model, errors);

            if (len(errors) > 0)
                return resJson(400, {errors});
                
            try {
                await authorize(event, 0, userCollection, errors);
                if (len(errors) > 0)
                    return resJson(400, {errors});
                
                const query = { _id: ObjectId(JSON.parse(event.body)._id) };
                const update = { $set: JSON.parse(event.body) };
                delete update.$set._id;
                
                let test = await collection.findOneAndUpdate(query, update, { upsert: true });
                await client.close();

                if (test.value) {
                    return resJson(200, test.value);
                } else {
                    return resJson(200, { _id: test.lastErrorObject.upserted });
                }
            } catch(err) {
                errors.request = `Couldn't add/update item: ${err}`;
                return resJson(400, {errors});
            }

        case 'DELETE':
            if (!isJsonStr(event.body)) {
                errors.request = 'Unable to post data. The JSON is likely unformatted.';
                return resJson(400, {errors});
            }
            
            if (JSON.parse(event.body)._id === undefined) {
                errors.request = '_id isn\'t included in the request.';
                return resJson(400, {errors});
            }
            
            try {
                await authorize(event, 0, userCollection, errors);
                if (len(errors) > 0)
                    return resJson(400, {errors});
                
                let query;
                try {
                    query = { '_id': ObjectId(JSON.parse(event.body)._id) };
                } catch(err) {
                    errors.request = 'ID given is invalid';
                    return resJson(400, {errors});
                }
                
                
                const search = await collection.findOneAndDelete(query);
                await client.close();

                if (search.value === null) {
                    errors.request = 'event _id not found';
                    return resJson(400, {errors});
                }

                return resJson(200, { successful: true });
            } catch(err) {
                errors.request = `Couldn't delete item: ${err}`;
                return resJson(400, {errors});
            }
        default:
            errors.method = `Method ${event.httpMethod} not allowed.`;
            return resJson(405, {errors});
    }
}