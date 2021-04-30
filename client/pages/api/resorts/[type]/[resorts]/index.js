import { ObjectId } from 'bson';
import nextConnect from 'next-connect';
import { cloneElement } from 'react';
//
import middleware from '../../../../../middleware/database.js';
import Global from '../../../../global.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const type = req.query.type;
    const resorts = req.query.resorts;

    let pipeline;
    // const 
    if(type === 'tours')
    {
        let operator = resorts === 'oneday' ? { $eq: 1 } : { $gt: 1 };
        pipeline = 
        [
            // { $match: { } },
            { $unwind: '$images'},
            {
                $set: { days: { $size: '$timetable' } }
            },
            { $group: 
            {
                _id: '$_id',
                title: { $first: '$name' },
                image: { $first: '$images.src'},
                adress: { $first: '$adress' },
                min_price: { $first: '$price' },
                services: { $first: '$services.included'},
                days: { $first: '$days' },
                timetable_schedule: { $first: '$timetable_departure' }
            }},
            { $match: { days: operator }},
            //Получение туров которые еще не начились
            { $unwind: '$timetable_schedule' },
            { $set: { 'date_compare': { $cmp: [ { $toDate: '$timetable_schedule.date' }, { $toDate: Date.now() } ] } } },
            { $match: { 'date_compare': { $gte: 0 } } },
            //Где есть свободные места
            { $match: { 'timetable_schedule.number_of_seats.available': { $gte: 1 } } },
            //
            { $group: 
            {
                _id: '$_id',
                title: { $first: '$title' },
                image: { $first: '$image'},
                adress: { $first: '$adress' },
                min_price: { $first: '$min_price' },
                services: { $first: '$services'},
                timetable_schedule: { $push: '$timetable_schedule' }
            }},
        ];
    }
    else
    {
        pipeline = 
        [
            { $match: { type: Global.GetConvert(type)[resorts] } },
            // { $unwind: '$services.rooms'},
            { $unwind: '$images'},
            { $group: 
            {
                _id: '$_id',
                title: { $first: '$name' },
                image: { $first: '$images.src' },
                adress: { $first: '$adress' },
                // min_price: { $min: '$rooms.prices.usual' },
                services: { $first: '$services.available' },
                rooms: { $first: '$rooms'}
            }},
            { $unwind: '$rooms' },
            //Где есть свободные места
            { $match: { 'rooms.number_of.rooms.available': { $gte: 1 } } },
            { $group: 
            {
                _id: '$_id',
                title: { $first: '$title' },
                image: { $first: '$image' },
                adress: { $first: '$adress' },
                min_price: { $min: '$rooms.prices.usual' },
                services: { $first: '$services' },
                rooms: { $push: '$rooms'}
            }},
        ];
    }
    req.db.collection(type).aggregate(pipeline).toArray((err, collection) => {
        if(err)
            res.json(err);
        else
            res.json(collection);
    });
});

export default handler;