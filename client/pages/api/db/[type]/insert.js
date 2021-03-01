import nextConnect from 'next-connect';
//
import middleware from '../../../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const type = req.query.type;
    const object = JSON.parse(req.query.object);
    console.log(object);
    req.db.collection(type).insertOne(object, (err, result) => {
        if(err)
            return console.log(err);
        res.status(200);
    });
    res.status(200);

});

export default handler;