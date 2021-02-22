import { ObjectId, ObjectID } from 'mongodb';
import nextConnect from 'next-connect';
//
import middleware from '../../../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const type = req.query.type;
    const id = req.query.id;
    const prop = JSON.parse(req.query.prop);
    req.db.collection(type).updateOne(
        { _id: ObjectId(id) }, 
        { $set: prop }, 
        (err, result) => {
        if(err)
            return console.log(err);
        res.status(200);
    });
});

export default handler;