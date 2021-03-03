import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const type = req.query.type;
    // const struct = req.query.struct;
    req.db.collection('structure').find({}).toArray((err, result) => {
        if(err)
            return console.log(err);
        const structures = result[0];
        // console.log(structures[type]);
        res.json(structures[type]);
    });
})

export default handler;