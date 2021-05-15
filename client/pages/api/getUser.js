import { ObjectId } from 'bson';
import nextConnect from 'next-connect';
//
import middleware from '../../middleware/database.js';
import Global from '../../pages/global.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const id_user = req.query.id_user;
    const getRelaxes = req.query.get_relaxes;
    //
    if(getRelaxes)
    {

        req.db.collection('users').aggregate(
            [{ $match: { _id: ObjectId(id_user) } }].concat(
            //Get tours_orders info
            Global.GetLookupPipeline('tours_orders', 'id_tour', 'tours', 'tour'), 
            //Get cruises_orders info
            Global.GetLookupPipeline('cruises_orders', 'id_cruise', 'cruises', 'cruise'),
            //Get relax_orders info
            Global.GetLookupPipeline('relax_orders', 'id_relax', 'relax', 'relax'),
            //
            //Get history_tours_orders info
            Global.GetLookupPipeline('history_tours_orders', 'id_tour', 'tours', 'tour'), 
            //Get history_cruises_orders info
            Global.GetLookupPipeline('history_cruises_orders', 'id_cruise', 'cruises', 'cruise'),
            //Get history_relax_orders info
            Global.GetLookupPipeline('history_relax_orders', 'id_relax', 'relax', 'relax'),
            //
            //Get history_tours_orders manager info
            Global.GetLookupPipeline('history_tours_orders', 'id_manager', 'managers', 'manager'), 
            //Get history_cruises_orders manager info
            Global.GetLookupPipeline('history_cruises_orders', 'id_manager', 'managers', 'manager'),
            //Get history_relax_orders manager info
            Global.GetLookupPipeline('history_relax_orders', 'id_manager', 'managers', 'manager'),
            [
                //PROJECTION
                { $group:
                {
                    _id: '$_id',
                    login: { $first: '$login' },
                    password: { $first: '$password' },
                    name: { $first: '$name' },
                    surname: { $first: '$surname' },
                    middle_name: { $first: '$middle_name' },
                    email: { $first: '$email' },
                    telephone: { $first: '$telephone' },
                    gender: { $first: '$gender' },
                    image: { $first: '$image'},
                    tours_orders: { $push: '$tours_orders' },
                    relax_orders: { $push: '$relax_orders' },
                    cruises_orders: { $push: '$cruises_orders' },
                    history_tours_orders: { $push: '$history_tours_orders' },
                    history_relax_orders: { $push: '$history_relax_orders' },
                    history_cruises_orders: { $push: '$history_cruises_orders' }
                }}
                //
            ])).toArray((err, result) => {
                if(err)
                    res.json(err);
                else
                    res.json(result[0]);
            }
        );
    }
    else
    {
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
    }

});

export default handler;