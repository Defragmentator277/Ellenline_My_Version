import nextConnect from 'next-connect';
//
import middleware from '../../middleware/database.js';
import Global from '../../pages/global.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    //
    req.db.collection('tours').aggregate(
    Global.GetLookupPipeline('comments', 'id_user', 'users', 'user').concat(
    [
        { $unwind: '$comments' },
        { $replaceRoot: { newRoot: '$comments' } }
    ])).toArray((err, result) => 
    {
        console.log(result);
        // if(result)
        //     Global.CorrectArray(result);
        let comments = result;
        //
        req.db.collection('relax').aggregate(
        Global.GetLookupPipeline('comments', 'id_user', 'users', 'user').concat(
        [
            { $unwind: '$comments' },
            { $replaceRoot: { newRoot: '$comments' } }
        ])).toArray((err, result) => 
        {
            console.log(result);
            // if(result)
            //     Global.CorrectArray(result);
            //
            comments = comments.concat(result);
            req.db.collection('cruises').aggregate(
            Global.GetLookupPipeline('comments', 'id_user', 'users', 'user').concat(
            [
                { $unwind: '$comments' },
                { $replaceRoot: { newRoot: '$comments' } }
            ])).toArray((err, result) => 
            {
                console.log(result);
                comments = comments.concat(result).filter((element) => Object.keys(element).length != 0);
                // if(result)
                //     Global.CorrectArray(result);
                if(err)
                    res.json(err);
                else
                    res.json(comments.slice(0, 2));
            })
        });
    });
});

export default handler;