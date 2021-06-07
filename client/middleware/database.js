import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';
import { getSession } from 'next-auth/client';

const client = new MongoClient('mongodb://localhost:27017/', 
{ 
    useUnifiedTopology: true, 
    useNewUrlParser: true
});

async function database(req, res, next) {
    // const session = await getSession({ req });

    // if(session)
    //     console.log('Has session');
    // else
    // {
    //     res.json({ message: 'You don`t have permission' });
    //     return;
    // }

    if(!client.isConnected())
        await client.connect();

    req.dbClient = client;
    req.db = client.db('ellenline');

    return next();
}

const middleware = nextConnect();

middleware.use(database);
    
export default middleware;
