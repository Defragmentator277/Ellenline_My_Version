import nextConnect from 'next-connect';
//
import middleware from '../../../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const type = req.query.type;
    const object = JSON.parse(req.query.object);
    req.db.collection(type).insertOne(object, (err, result) => {
        if(err)
            res.json(err);
        else
            res.json(result);
    });
});

export default handler;