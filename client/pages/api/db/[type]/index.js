import nextConnect from 'next-connect';
//
import middleware from '../../../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const type = req.query.type;
    const condition = req.query.condition ? JSON.parse(req.query.condition) : {};
    console.log(condition);  

    req.db.collection(type).find(condition).toArray((err, collection) => {
        console.log(err);
        console.log(collection);
        if(err)
            res.json(err);
        else
            res.json(collection);
    });
});

export default handler;