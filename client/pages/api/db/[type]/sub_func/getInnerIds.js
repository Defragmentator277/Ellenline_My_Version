import { ObjectId } from 'bson';
import nextConnect from 'next-connect';
//
import middleware from '../../../../../middleware/database.js'

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const type = req.query.type;
    const id = req.query.id;
    //
    const key = req.query.key;
    req.db.collection(type).aggregate(
    [
        { $match: { $and: [ { _id: ObjectId(id) }, { [key]: { $exists: true } }  ]} },
        { $replaceRoot: { newRoot: { [key]: '$' + key } } }
    ]).toArray((err, result) => {
        if(err)
            res.json(err);
        else
            res.json(result[0][key]);
    });
});

export default handler;