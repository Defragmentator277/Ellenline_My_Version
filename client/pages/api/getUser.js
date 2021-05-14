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
            [
                { $match: { _id: ObjectId(id_user) } },
                //Get tours_orders info
                { $unwind: 
                { 
                    path: '$tours_orders',
                    preserveNullAndEmptyArrays: true
                }},
                { $set: { tours_orders: { $ifNull: [ '$tours_orders', [] ] } } },
                { $set: { 'tours_orders.id_tour': { $arrayElemAt: [ { $objectToArray: '$tours_orders.id_tour' }, 1 ] } } }, 
                { $set: { 'tours_orders.id_tour': { $toObjectId: '$tours_orders.id_tour.v' } } } ,
                //
                { $lookup:
                {
                    from: 'tours',
                    localField: 'tours_orders.id_tour',
                    foreignField: '_id',
                    as: 'tours_orders.id_tour'
                }},
                { $set: { 'tours_orders.tour': { $arrayElemAt: [ '$tours_orders.id_tour', 0 ]} } },
                { $unset: 'tours_orders.id_tour' },
                //Get relax_orders info
                { $unwind: 
                { 
                    path: '$relax_orders',
                    preserveNullAndEmptyArrays: true
                }},
                { $set: { relax_orders: { $ifNull: [ '$relax_orders', [] ] } } },
                { $set: { 'relax_orders.id_relax': { $arrayElemAt: [ { $objectToArray: '$relax_orders.id_relax' }, 1 ] } } }, 
                { $set: { 'relax_orders.id_relax': { $toObjectId: '$relax_orders.id_relax.v' } } } ,
                //
                { $lookup:
                {
                    from: 'relax',
                    localField: 'relax_orders.id_relax',
                    foreignField: '_id',
                    as: 'relax_orders.id_relax'
                }},
                { $set: { 'relax_orders.relax': { $arrayElemAt: [ '$relax_orders.id_relax', 0 ]} } },
                { $unset: 'relax_orders.id_relax' },
                // //Get cruises_orders info
                { $unwind: 
                { 
                    path: '$cruises_orders',
                    preserveNullAndEmptyArrays: true
                }},
                { $set: { cruises_orders: { $ifNull: [ '$cruises_orders', [] ] } } },
                { $set: { 'cruises_orders.id_cruise': { $arrayElemAt: [ { $objectToArray: '$cruises_orders.id_cruise' }, 1 ] } } }, 
                { $set: { 'cruises_orders.id_cruise': { $toObjectId: '$cruises_orders.id_cruise.v' } } } ,
                //
                { $lookup:
                {
                    from: 'cruises',
                    localField: 'cruises_orders.id_cruise',
                    foreignField: '_id',
                    as: 'cruises_orders.id_cruise'
                }},
                { $set: { 'cruises_orders.cruise': { $arrayElemAt: [ '$cruises_orders.id_cruise', 0 ] } } },
                { $unset: 'cruises_orders.id_cruise' },
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
                    tours_orders: { $push: '$tours_orders' },
                    relax_orders: { $push: '$relax_orders' },
                    cruises_orders: { $push: '$cruises_orders' }
                }}
                //
            ]).toArray((err, result) => {
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