import { ObjectId } from 'bson';
import nextConnect from 'next-connect';
//
import middleware from '../../../../../../middleware/database.js';
import Global from '../../../../../global.js';

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
        pipeline = [
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
                timetable_schedule: { $first: '$timetable_departure'},
                comments: { $first: '$comments' }
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
                timetable_schedule: { $first: '$timetable_schedule'},
                comments: { $first: '$comments' }
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
                timetable_schedule: { $push: '$timetable_schedule' },
                comments: { $first: '$comments' }
            }},
            //
        ].concat(
        Global.GetLookupPipeline('comments', 'id_user', 'users', 'user'),
        
            [{ $group: 
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
                timetable_schedule: { $first: '$timetable_schedule' },
                comments: { $push: '$comments' }
            }}]
        );
    }
    else if(type === 'relax')
    {
        pipeline = [
            { $match: { _id: ObjectId(id) } },
            { $unwind: '$rooms'},
            //Где есть свободные места
            { $match: { 'rooms.number_of.rooms.available': { $gte: 1 } } },
            //
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
                locality: { $first: { $objectToArray: '$id_locality' } },
                comments: { $first: '$comments' }
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
        ].concat(
        Global.GetLookupPipeline('comments', 'id_user', 'users', 'user'),
        [{ $group: 
        {
            _id: '$_id',
            name: { $first: '$name' },
            adress: { $first: '$adress' },
            description: { $first: '$description' },
            stars: { $first: '$stars'},
            images: { $first: '$images' },
            services: { $first: '$services' },
            //
            price: { $first: '$price' },
            points: { $first: '$points' },
            rooms: { $first: '$rooms' },
            locality: { $first: '$locality' },
            //
            comments: { $push: '$comments' }
        }}]);
    }
    else
    {
        pipeline = [
            { $match: { _id: ObjectId(id) } }, 
            { $unwind: '$rooms'},
            //Где есть свободные места
            { $match: { 'rooms.number_of.rooms.available': { $gte: 1 } } },
            // //Получение круизов которые еще не начились
            { $unwind: '$timetable_departure' },
            { $set: { 'date_compare': { $cmp: [ { $toDate: '$timetable_departure.date' }, { $toDate: Date.now() } ] } } },
            { $match: { 'date_compare': { $gte: 0 } } },
            //Где есть свободные места
            { $set: { 'id_compare': { $cmp: [ { $toInt: '$rooms.id_timetable_departure' } , '$timetable_departure.id' ] } } },
            { $match: { 'id_compare': { $eq: 0 } } },
            //
            { $group: 
            {
                _id: '$_id',
                name: { $first: '$name' },
                adress: { $first: '$adress' },
                description: { $first: '$description' },
                images: { $first: '$images.src' },
                services: { $first: '$services' },
                //
                price: { $min: '$rooms.prices.usual' },
                points: { $first: '$points' },
                rooms: { $push: '$rooms' },
                timetable: { $first: '$timetable' },
                timetable_schedule: { $addToSet: '$timetable_departure'},
                motorship: { $first: { $objectToArray: '$id_motorship' } },
                locality: { $first: { $objectToArray: '$id_locality' } },
                comments: { $first: '$comments' }
            }},
            //Get locality info
            { $unwind: '$locality' },
            { $match: { 'locality.k': { $eq: '$id'} } },
            { $set: { 'locality': { $toObjectId: '$locality.v' } } },
            { $lookup:
            {
                from: 'localities',
                localField: 'locality',
                foreignField: '_id',
                as: 'locality'
            }},
            { $unwind: '$locality' },
            //Get motorship info
            { $unwind: '$motorship' },
            { $match: { 'motorship.k': { $eq: '$id'} } },
            { $set: { 'motorship': { $toObjectId: '$motorship.v' } } },
            { $lookup:
            {
                from: 'motorships',
                localField: 'motorship',
                foreignField: '_id',
                as: 'info'
            }},
            { $unwind: '$info' },
        ]
        .concat(
        Global.GetLookupPipeline('comments', 'id_user', 'users', 'user'),
        [{ $group: 
        {
            _id: '$_id',
            name: { $first: '$name' },
            adress: { $first: '$adress' },
            description: { $first: '$description' },
            images: { $first: '$images' },
            services: { $first: '$services' },
            //
            price: { $first: '$price' },
            points: { $first: '$points' },
            rooms: { $first: '$rooms' },
            timetable: { $first: '$timetable' },
            timetable_schedule: { $first: '$timetable_schedule'},
            motorship: { $first: '$motorship' },
            locality: { $first: '$locality' },
            info: { $first: '$info' },
            //
            comments: { $push: '$comments' }
        }}]);
    }
    req.db.collection(type).aggregate(pipeline).toArray(
    (err, result) => {
        result.forEach((element) => {
            if(Object.keys(element.comments[0]).length == 0)  
                element.comments = [];
        });
        //
        console.log("ON SERVER");
        console.log(err);
        console.log(result);
        //
        if(err)
            res.json(err);
        else
            res.json(result);
    });
})

export default handler;