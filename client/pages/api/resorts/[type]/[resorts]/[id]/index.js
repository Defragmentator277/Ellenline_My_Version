import nextConnect from 'next-connect';
//
import middleware from '../../../../../../middleware.js';

const handler = nextConnect();

handler.get(async (req, res) => {
    const type = req.query.type;
    const resorts = req.query.resorts;
    const id = req.query.id;

    // if(type === 'tours')
    //     req.db.collection(type)
    res.json({ send: 'ok' });
})

export default handler;