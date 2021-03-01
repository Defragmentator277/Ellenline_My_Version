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
    const prop = JSON.parse(req.query.prop);
    //
    const collection = req.db.collection(type);
    //Update сложного объекта
    if(prop.path)
    {
        //prop: { key: ..., new_value: ..., path: ..., id: ... }
        collection.updateOne(
        { 
            _id: ObjectId(id), 
            [prop.path + '.id']: prop.id
        },
        { $set: 
        {
            [prop.path + '.$.' + prop.key]: prop.new_value
        }},
        (err, result) => 
        {
            if(err)
                return console.log(err);
            res.status(200);
        });
    }
    //Update простого свойства
    else
    {
        //prop: { key: ..., new_value: ..., [...operator] = '$set' }
        const operator = req.query.operator || '$set';
        switch(operator)
        {
            case '$push':
                //Здесь нужно узнать новый айди
                collection.aggregate(
                [ 
                    { $unwind: '$rooms' }, // "развязываем" по массиву
                    { $sort: { 'rooms.id': -1 } }, //сортируем по полю id
                    { $limit: 1 }
                ]).toArray((err, result) =>
                {
                    if(err)
                        return console.log(err);
                    let new_id;
                    if(result[0] == undefined)
                        new_id = 0;
                    else
                        new_id = result[0].rooms.id;
                    prop.new_value = Object.assign(prop.new_value, { id: ++new_id });
                    Update(id, prop, '$push');
                    res.json(result);
                });
                // Update(id, prop, operator);
                break;
            case '$set':
                Update(id, prop, '$set');
            case '$pull':
                prop.new_value = { id: prop.new_value };
                Update(id, prop, '$pull');
                break;
            default:
                return console.log('THIS OPERATOR GROPU DON`T EXISTS');
        }
    }

    function Update(id, prop, operator) {
        collection.updateOne(
            { _id: ObjectId(id) }, 
            { [operator]: 
            {
                [prop.key]: prop.new_value
            }}, 
            (err, result) => 
            {
                if(err)
                    return console.log(err);
                // console.log(result);
                res.status(200);
            });
    }
});

export default handler;