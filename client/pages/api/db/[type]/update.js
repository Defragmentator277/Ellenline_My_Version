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
    const operator = req.query.operator || '$set';
    const prop = JSON.parse(req.query.prop);
    console.log(prop);
    console.log(id);
    console.log(operator);
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
        { [operator]: 
        {
            [prop.path + '.$.' + prop.key]: prop.new_value
        }},
        (err, result) => 
        {
            if(err)
                res.json(err);
            else 
                res.json(result);
        });
    }
    //Update простого свойства
    else
    {
        //prop: { key: ..., new_value: ..., } [...operator] = '$set' 
        switch(operator)
        {
            case '$push':
                collection.aggregate(
                [ 
                    { $match: { '_id': ObjectId(id) } },
                    { $unwind: '$' + prop.key }, // "развязываем" по массиву
                    { $sort: { [prop.key + '.id']: -1 } }, //сортируем по полю id
                    { $limit: 1 }
                ]).toArray((err, result) =>
                {
                    if(err)
                        return console.log(err);
                    const path = prop.key.split('.');
                    let new_id = -1;
                    if(result[0])
                    {
                        let document = result[0];
                        for(let i = 0; i < path.length; i++)
                            document = document[path[i]];
                        new_id = document.id;
                    }
                    prop.new_value = Object.assign(prop.new_value, { id: ++new_id });
                    Update(id, prop, '$push');
                });
                break;
            case '$set':
                Update(id, prop, '$set');
                break;
            case '$pull':
                prop.new_value = { id: prop.new_value };
                console.log(prop);
                Update(id, prop, '$pull');
                break;
            case '$replace':
                collection.updateOne(
                    { _id: ObjectId(id) }, 
                    prop, 
                    (err, result) => 
                    {
                        if(err)
                            res.json(err);
                        else
                            res.json(result);
                    }
                );
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
                    res.json(err);
                else
                    res.json(result);
            }
        );
    }
});

export default handler;