import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
//
import middleware from '../../../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    //all incoming
    const type = req.query.type;
    const id = req.query.id;
    const arr_id = parseInt(req.query.arr_id);
    const inc = parseInt(req.query.inc);
    //
    const collection = req.db.collection(type);

    if(type == 'relax' 
    || type == 'cruises')
    {
        collection.updateOne(
        { 
            _id: ObjectId(id), 
            'rooms.id': arr_id,
            'rooms.number_of.rooms.available': { $gte: inc }
        },
        { $inc: 
        {
            'rooms.$.number_of.rooms.available': -inc,
            'rooms.$.number_of.rooms.occupied': inc
        }},
        (err, result) => 
        {
            console.log(err);
            console.log(result);
            if(err)
                res.json(err);
            else    
                res.json(result);
        });

    } 
    else if(type == 'tours')
    {
        collection.updateOne(
        { 
            _id: ObjectId(id), 
            'timetable_departure.id': arr_id,
            'timetable_departure.number_of_seats.available': { $gte: inc }
        },
        { $inc: 
        {
            'timetable_departure.$.number_of_seats.available': -inc,
            'timetable_departure.$.number_of_seats.occupied': inc
        }},
        (err, result) => 
        {
            console.log(err);
            console.log(result);
            if(err)
                res.json(err);
            else    
                res.json(result);
        });
    }
    else
    {
        res.json({ status: "Error!" });
    }
    console.log('out');
});

export default handler;