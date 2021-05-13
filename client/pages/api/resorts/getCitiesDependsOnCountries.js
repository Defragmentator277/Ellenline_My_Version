import { DBRef } from 'bson';
import nextConnect from 'next-connect';
//
import middleware from '../../../middleware/database.js';


const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

    req.db.collection('localities').aggregate([
        { $replaceRoot: { newRoot: 
        {
            _id: '$_id',
            id_country: '$id_country',
            localities: '$$ROOT'
        }}},
        { $group: 
        {
            '_id': '$id_country',
            // 'id': '$_id',
            localities: { $push: '$localities' }
            // id_country: { $first: '$id_country' },
            // name: { $push: '$name' },
            // description: { $push: '$description' },
            // object: '$$ROOT'
        }},
        //Get country info
        { $set: { 'country': { $objectToArray: '$_id' } } },
        { $unwind: '$country' },
        { $match: { 'country.k': { $eq: '$id'} } },
        { $set: { 'country': { $toObjectId: '$country.v' } } },
        //
        { $lookup: 
        {
            from: 'countries',
            localField: 'country',
            foreignField: '_id',
            as: 'country'
        }},
        { $unwind: '$country' },
        { $replaceRoot: { newRoot: { $mergeObjects: [ '$country', '$$ROOT' ] } } },
        { $unset: 'country' }
    ]).toArray((err, collection) => {
        if(err)
        {
            // console.log(err);
            res.json(err);
        }
        else
        {
            // console.log(res);
            res.json(collection);
        }
    });

    // req.db.collection('localities').find({
    //     // { $match: { name: 'Россия' } }
    //     // { $set: { 'new_id': {
    //     //     '$id': '$_id',
    //     //     '$ref': 'localities'
    //     // } } },
    //     // { $lookup: 
    //     // {
    //     //     from: 'localities',
    //     //     localField: 'new_id',
    //     //     foreignField: 'id_country',
    //     //     as: 'testField'
    //     // }}
    // }).toArray((err, collection) => {
    //     if(err)
    //     {
    //         console.log(err);
    //         res.json(err);
    //     }
    //     else
    //     {
    //     }
    // });

});

export default handler;