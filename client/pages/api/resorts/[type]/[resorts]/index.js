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
                timetable_schedule: { $first: '$timetable_departure' },
                //
                locality: { $first: { $objectToArray: '$id_locality' } }
            }},
            { $match: { days: operator }},
            //Get locality info
            { $unwind: '$locality' },
            { $match: { 'locality.k': { $eq: '$id'} } },
            { $set: { locality: { $toObjectId: '$locality.v' } } },
            { $lookup:
            {
                from: 'localities',
                localField: 'locality',
                foreignField: '_id',
                as: 'locality'
            }},
            { $unwind: '$locality' },
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
                timetable_schedule: { $push: '$timetable_schedule' },
                //
                locality: { $first: '$locality'}
            }},
        ];
    }
    else if(type === 'relax')
    {
        pipeline = 
        [
            { $match: { type: Global.GetConvert(type)[resorts] } },
            { $unwind: '$images'},
            { $group: 
            {
                _id: '$_id',
                title: { $first: '$name' },
                image: { $first: '$images.src' },
                adress: { $first: '$adress' },
                services: { $first: '$services.available' },
                rooms: { $first: '$rooms'},
                timetable_schedule: { $first: '$timetable_departure' },
                stars: { $first: '$stars' },
                //
                locality: { $first: { $objectToArray: '$id_locality' } }
            }},
            //Get locality info
            { $unwind: '$locality' },
            { $match: { 'locality.k': { $eq: '$id'} } },
            { $set: { locality: { $toObjectId: '$locality.v' } } },
            { $lookup:
            {
                from: 'localities',
                localField: 'locality',
                foreignField: '_id',
                as: 'locality'
            }},
            { $unwind: '$locality' },
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
                rooms: { $push: '$rooms'},
                stars: { $first: '$stars' },
                //
                locality: { $first: '$locality' }
            }},
        ];
    }
    else
    {
        pipeline = [
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
                rooms: { $first: '$rooms'},
                timetable_schedule: { $first: '$timetable_departure' },
                //
                locality: { $first: { $objectToArray: '$id_locality' } }
            }},
            //Get locality info
            { $unwind: '$locality' },
            { $match: { 'locality.k': { $eq: '$id'} } },
            { $set: { locality: { $toObjectId: '$locality.v' } } },
            { $lookup:
            {
                from: 'localities',
                localField: 'locality',
                foreignField: '_id',
                as: 'locality'
            }},
            { $unwind: '$locality' },
            //Получение кол-ва незанятых комнат 
            { $unwind: '$rooms' },
            { $match: { 'rooms.number_of.rooms.available': { $gte: 1 } } },
            //Получение круизов которые еще не начились
            { $unwind: '$timetable_schedule' },
            { $set: { 'date_compare': { $cmp: [ { $toDate: '$timetable_schedule.date' }, { $toDate: Date.now() } ] } } },
            { $match: { 'date_compare': { $gte: 0 } } },
            //Где есть свободные места
            { $set: { 'id_compare': { $cmp: [ { $toInt: '$rooms.id_timetable_departure' } , '$timetable_schedule.id' ] } } },
            { $match: { 'id_compare': { $eq: 0 } } },
            //
            { $group: 
            {
                _id: '$_id',
                title: { $first: '$title' },
                image: { $first: '$image' },
                adress: { $first: '$adress' },
                min_price: { $min: '$rooms.prices.usual' },
                services: { $first: '$services' },
                rooms: { $push: '$rooms'},
                timetable_schedule: { $addToSet: '$timetable_schedule' },
                //
                locality: { $first: '$locality' }
            }},
        ]
    }
    req.db.collection(type).aggregate(pipeline).toArray((err, collection) => {
        if(err)
            res.json(err);
        else
            res.json(collection);
    });
});

export default handler;