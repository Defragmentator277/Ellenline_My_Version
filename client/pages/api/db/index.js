import nextConnect from 'next-connect'
import middleware from '../../../middleware/database.js'

const handler = nextConnect();

handler.use(middleware);

handler.get((req, res) => {
    // console.log(req.db.getCollectionNames());
});

export default handler;