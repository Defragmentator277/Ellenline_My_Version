import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
//
import middleware from '../../../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const type = req.query.type;
    const id = req.query.id;
    req.db.collection(type).deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if(err)
            return console.log(err);
        res.status(200);
    });
});

export default handler;