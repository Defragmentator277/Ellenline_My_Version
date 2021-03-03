//Функция для создания поля
function GetField(type_of, prop, title) {
    //field: { type: ..., prop: ..., title: ... }
    const field = 
    { 
        type: type_of, 
        prop: prop,
        title: title
    };
    return field;
}

//Создаем коллекцию
db.createCollection('structure');

db.structure.insertOne(
{
    'resorts': [
        GetField('ObjectId', '_id'),
        GetField('string', 'name'),
        GetField('object',
        [
            GetField('massive', [ 
                GetField('string', 'icon'),
                GetField('string', 'text')
            ], 
            'available'),
            //
            GetField('massive', [ 
                GetField('string', 'icon'),
                GetField('string', 'text')
            ], 
            'common'),
            //
            GetField('massive', [ 
                GetField('string', 'icon'),
                GetField('string', 'text')
            ], 
            'rooms'),
        ],
        'services'),
        GetField('number', 'stars'),
        GetField('string', 'description'),
        GetField('massive', [
            GetField('string', 'src')
        ], 'images'),
        GetField('string', 'id_countries'),
        GetField('massive', [
            GetField('string', 'category'),
            //number
            GetField('object', 
            [
                GetField('number', 'of_seats'),
                GetField('number', 'of_rooms')
            ], 'number'),
            GetField('string', 'corpus'),
            //prices
            GetField('object', 
            [
                GetField('number', 'usual'),
                GetField('number', 'on_weekends'),
                GetField('object', 
                [
                    GetField('number', 'adult'),
                    GetField('number', 'child')
                ], 'extra')
            ], 'prices'),
            GetField('boolean', 'pets')
        ], 'rooms'),
        GetField('object', 
        [
            GetField('number', 'bb'),
            GetField('number', 'hb'),
            GetField('number', 'fb'),
        ],
        'prices_of_food'),
        GetField('string', 'adress'),
        GetField('string', 'id_cities'),
        GetField('object', 
        [
            GetField('number', 'x'),
            GetField('number', 'y')
        ],
        'points')
    ],
    'cities': [
        GetField('ObjectId', '_id'),
        GetField('string', 'name'),
        GetField('string', 'description')
    ],
    'countries': [
        GetField('ObjectId', '_id'),
        GetField('string', 'name'),
        GetField('string', 'description')
    ],
    'bands': [
        GetField('ObjectId', '_id'),
        GetField('string', 'name'),
        GetField('number', 'rating'),
        GetField('object', 
        [
            GetField('object', 
            [
                GetField('number', 'avg_rating'),
                //
                GetField('massive', [
                    GetField('string', 'name')
                ],
                'names'),
                //
                GetField('massive', [
                    GetField('string', 'name')
                ], 
                'members'),
                //
            ],'new'),
            GetField('object', 
            [
                GetField('number', 'avg_rating'),
                //
                GetField('massive', [
                    GetField('string', 'name')
                ], 
                'names'),
                //
            ], 'old')
        ], 'albums'),
        //
        GetField('massive', [
            GetField('string', 'user_name'),
            GetField('string', 'text')
        ], 
        'comments')
    ]
});