import nextConnect from 'next-connect';
//
import middleware from '../../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    // const collections = await req.db.listCollections();
    req.db.collection('structure').find({}).toArray((err, result) => {
        if(err)
            res.json(err);
        else
        {
            const structure = result[0];
            delete structure._id;
            res.json(Object.keys(structure));
        }
    });
});

export default handler;