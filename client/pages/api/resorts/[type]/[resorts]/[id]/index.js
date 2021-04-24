import { ObjectId } from 'bson';
import nextConnect from 'next-connect';
//
import middleware from '../../../../../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const type = req.query.type;
    const resorts = req.query.resorts;
    const id = req.query.id;
    //
    let pipeline;

    if(type === 'tours')
    {
        pipeline = 
        [
            { $match: { _id: ObjectId(id) } },
            //Timetable sort
            { $unwind: '$timetable' },
            { $sort: { 'timetable.day': 1 } },
            { $group: 
            {
                _id: '$_id',
                name: { $first: '$name' },
                adress: { $first: '$adress' },
                description: { $first: '$description' },
                price: { $first: '$price' },
                points: { $first: '$points'},
                info: { $first: '$info' },
                services: { $first: '$services' },
                images: { $first: '$images.src' },
                locality: { $first: { $objectToArray: '$id_locality' } },
                timetable: { $push: '$timetable' },
                timetable_schedule: { $first: '$timetable_departure'}
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
            //Get countries
            { $unwind: '$info.countries' },
            { $set: { 'info.countries': { $objectToArray: '$info.countries.id_country' } } },
            { $unwind: '$info.countries' },
            { $match: { 'info.countries.k': { $eq: '$id'} } },
            { $set: { 'info.countries': { $toObjectId: '$info.countries.v' } } },
            { $lookup:
            {
                from: 'countries',
                localField: 'info.countries',
                foreignField: '_id',
                as: 'info.countries'
            }},
            { $unwind: '$info.countries' },
            { $group: 
            {
                _id: '$_id',
                name: { $first: '$name' },
                adress: { $first: '$adress' },
                description: { $first: '$description' },
                price: { $first: '$price' },
                points: { $first: '$points'},
                //info object
                languages: { $first: '$info.languages' },
                countries: { $push: '$info.countries' },
                routes: { $first: '$info.routes' },
                //
                services: { $first: '$services' },
                images: { $first: '$images' },
                locality: { $first: '$locality' },
                timetable: { $first: '$timetable' },
                timetable_schedule: { $first: '$timetable_schedule'}
            }},
            { $set: 
            {
                'info.languages': '$languages',
                'info.countries': '$countries',
                'info.routes': '$routes'
            }},
            { $unset: [ 'languages', 'countries', 'routes' ]},
            //Получение туров которые еще не начились
            { $unwind: '$timetable_schedule' },
            { $set: { 'date_compare': { $cmp: [ { $toDate: '$timetable_schedule.date' }, { $toDate: Date.now() } ] } } },
            { $match: { $and: [ { 'date_compare': { $gte: 0 } }, { 'timetable_schedule.number_of_seats.available': { $gte: 1 } } ] } },
            { $group: 
            {
                _id: '$_id',
                name: { $first: '$name' },
                adress: { $first: '$adress' },
                description: { $first: '$description' },
                price: { $first: '$price' },
                points: { $first: '$points'},
                info: { $first: '$info' },
                services: { $first: '$services' },
                images: { $first: '$images' },
                locality: { $first: '$locality' },
                timetable: { $first: '$timetable' },
                timetable_schedule: { $push: '$timetable_schedule' }
            }},
        ];
    }
    else
    {
        pipeline = 
        [
            { $match: { _id: ObjectId(id) } },
            { $unwind: '$rooms'},
            { $group: 
            {
                _id: '$_id',
                name: { $first: '$name' },
                adress: { $first: '$adress' },
                description: { $first: '$description' },
                stars: { $first: '$stars'},
                images: { $first: '$images.src' },
                services: { $first: '$services' },
                //
                price: { $min: '$rooms.prices.usual' },
                points: { $first: '$points' },
                rooms: { $push: '$rooms' },
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
        ];
    }
    //For tours only
    req.db.collection(type).aggregate(pipeline).toArray(
    (err, result) => {
        console.log("ON SERVER");
        console.log(result);
        if(err)
            res.json(err);
        else
            res.json(result);
    });
})

export default handler;