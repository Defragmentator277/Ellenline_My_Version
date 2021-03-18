import { ObjectId } from 'bson';
import nextConnect from 'next-connect';
//
// import middleware from '../../../../../middleware/database.js';
import Global from '../../../../global.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const type = req.query.type;
    const resorts = req.query.resorts;
    // const 
    if(type === 'tours')
    {
        let operator = resorts === 'oneday' ? { $eq: 1 } : { $gt: 1 };
        req.db.collection(type).aggregate(
            [
                { $unwind: '$images'},
                {
                    $addFields: 
                    { days: { $size: '$timetable' } }
                },
                { $group: 
                {
                    _id: '$_id',
                    title: { $first: '$name' },
                    image: { $first: '$images.src'},
                    adress: { $first: '$adress' },
                    min_price: { $first: '$price' },
                    services: { $first: '$services.included'},
                    days: { $first: '$days' }
                }},
                { $match: { days: operator }}
            ]).toArray((err, collection) => {
            console.log('ON SERVER');
            console.log(collection);
            if(err)
                res.json(err);
            else
                res.json(collection);
        });
    }
    else
        req.db.collection(type).aggregate(
            [
                { $match: { type: Global.GetConvert(type)[resorts] } },
                { $unwind: '$rooms' },
                // { $unwind: '$services.rooms'},
                { $unwind: '$images'},
                { $group: 
                {
                    _id: '$_id',
                    title: { $first: '$name' },
                    image: { $first: '$images.src' },
                    adress: { $first: '$adress' },
                    min_price: { $min: '$rooms.prices.usual' },
                    services: { $first: '$services.available' }
                    // services: '$services.rooms'
                }}
            ]).toArray((err, collection) => {
            if(err)
                res.json(err);
            else
                res.json(collection);
        });
});

export default handler;