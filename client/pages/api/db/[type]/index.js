import nextConnect from 'next-connect';
//
import middleware from '../../../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const type = req.query.type;
    const condition = req.query.condition || {};

    req.db.collection(type).find(condition).toArray((err, collection) => {
        if(err)
            return console.log(err);
        res.json(collection);
    });
});

export default handler;