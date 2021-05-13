import { ObjectId } from 'bson';
import nextConnect from 'next-connect';
//
import middleware from '../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const id_user = req.query.id_user;
    //
    req.db.collection('users').findOne(
        { _id: ObjectId(id_user) }, 
        //
        (err, result) => {
            if(err)
                res.json(err);
            else
                res.json(result);
        }
    );

});

export default handler;