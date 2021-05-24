import nextConnect from 'next-connect';
//
import middleware from '../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
    const login = req.query.login;
    const password = req.query.password;
    const type_of_users = req.query.type_of_users;
    //
    req.db.collection(type_of_users).find(
        { login: login, password: password }, 
        //
        ).toArray((err, result) => {
        if(err)
            res.json(err);
        else
            res.json(result);
    });

});

export default handler;