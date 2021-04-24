import { ObjectId } from 'bson';
import nextConnect from 'next-connect';
//
import middleware from '../../../../../../middleware/database.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const type = req.query.type;
    const id = req.query.id;
    //
    const tickets = req.query.tickets;
    const innerId = req.query.innerId;
    // console.log('id');
    // console.log(id);
    // console.log('innerID');
    // console.log(innerId);
    // console.log('type');
    // console.log(type);
    // console.log('id');
    // console.log(id);

    if(type === 'tours')
    //For tours only
        req.db.collection(type).find(
            { 
                _id: ObjectId(id),
                'timetable_departure.id': innerId
            },
            // { $set: 
            // {
            //     // 'new_field': 12,
            //     'timetable_departure.$.new_field': 12,
            //     // 'timetable_departure.$.number_of_seats.occupied': 12
            // }},
            (err, result) => 
            { 
                console.log('DECREMENT');
                console.log(result);
                if(err)
                    res.json(err);
                else 
                    res.json(result);
            }
        );
    // else
    //     req.db.collection(type).updateOne()
});

export default handler;
