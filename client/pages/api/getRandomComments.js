import nextConnect from 'next-connect';

import middleware from '../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    req.collection('relax').aggregate(
    [
        
    ]).toArray((err, result) => 
    {
        console.log(err);
        console.log(result);
        if(err)
            res.json(err);
        else
            res.json(result);
    });
})

export default handler;