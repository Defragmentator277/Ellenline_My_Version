//Функция для создания поля
function GetField(type_of, prop, title, ref, items) {
    //field: { type: ..., prop: ..., title: ..., ref: ..., items: ..., min: ... }
    const field = 
    { 
        type: type_of, 
        prop: prop
    };
    if(title)
        field.title = title;
    if(ref)
        field.ref = ref;
    if(items)
        field.items = items;
    return field;
}
//Создаем коллекции
db.createCollection('structure');
//
db.createCollection('relax');
//
db.createCollection('cruises');
db.createCollection('motorships');
//
db.createCollection('tours');
//
db.createCollection('localities');
db.createCollection('countries');
//
db.createCollection('admins');
db.createCollection('users');

//Создание струткутры БД
db.structure.insertOne(
{
    'relax': [
        GetField('ObjectId', '_id'),
        GetField('string', 'name'),
        GetField('string', 'description'),
        GetField('OtherId', 'id_locality', undefined, 'localities'),
        {
            type: 'combobox',
            prop: 'type',
            items: [ 'Санатории', "Пансионаты"]
        },  
        GetField('object',
        [
            //
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
        //
        GetField('massive', [
            GetField('string', 'src')
        ], 'images'),
        //
        // {
        //     type: 'massive',
        //     prop: 
        //     [
        //         GetField('InnerId', 'id_room', undefined, 'rooms'),
        //         GetField('OtherId', 'id_user', undefined, 'users'),
        //         GetField('object',
        //         [
        //             GetField('number', 'adult'),
        //             GetField('number', 'child'),
        //             GetField('object', 
        //             [
        //                 GetField('boolean', 'adult'),
        //                 GetField('boolean', 'child')
        //             ], 'extra')
        //         ], 'number_of'),
        //         {
        //             type: 'combobox',
        //             prop: 'type_of_food',
        //             items: [ 'bb', 'hb', 'fb']
        //         },
        //         GetField('date', 'date_arrival'),
        //         GetField('date', 'date_leave'),
        //         GetField('number', 'price')
        //     ],
        //     title: 'clients'
        // },
        //
        GetField('massive', [
            GetField('string', 'category'),
            GetField('object', 
            [
                GetField('object',
                [
                    GetField('number', 'adult'),
                    GetField('number', 'child')
                ], 'seats'),
                GetField('object',
                [
                    GetField('number', 'available'),
                    GetField('number', 'occupied')
                ], 'rooms')
            ], 'number_of'),
            GetField('string', 'corpus'),
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
            GetField('boolean', 'pets'),
            GetField('object', 
            [
                GetField('number', 'bb'),
                GetField('number', 'hb'),
                GetField('number', 'fb'),
            ],
            'prices_of_food'),
            GetField('string', 'image')
        ], 'rooms'),
        GetField('string', 'adress'),
        GetField('object', 
        [
            GetField('number', 'x'),
            GetField('number', 'y')
        ],
        'points')
    ],
    //
    'cruises': [
        GetField('ObjectId', '_id'),
        GetField('string', 'name'),
        GetField('string', 'description'),
        {
            type: 'combobox',
            prop: 'type',
            items: [ 'Речные', "Морские"]
        },  
        GetField('string', 'adress'),
        GetField('OtherId', 'id_locality', undefined, 'localities'),
        GetField('OtherId', 'id_motorship', undefined, 'motorships'),
        ,
        GetField('object', 
        [
            GetField('number', 'x'),
            GetField('number', 'y')
        ], 'points'),
        //
        GetField('object',
        [
            //
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
        ], 'services'),
        //
        GetField('massive', [
            GetField('string', 'category'),
            GetField('object', 
            [
                GetField('object',
                [
                    GetField('number', 'adult'),
                    GetField('number', 'child')
                ], 'seats'),
                GetField('object',
                [
                    GetField('number', 'available'),
                    GetField('number', 'occupied')
                ], 'rooms')
            ], 'number_of'),
            GetField('string', 'corpus'),
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
            GetField('boolean', 'pets'),
            GetField('object', 
            [
                GetField('number', 'bb'),
                GetField('number', 'hb'),
                GetField('number', 'fb'),
            ],
            'prices_of_food'),
            GetField('string', 'image'),
            //
            GetField('InnerId', 'id_timetable_departure', undefined, 'timetable_departure')
        ], 'rooms'),
        //
        GetField('massive', 
        [
            GetField('date', 'date'),
            GetField('time', 'time')
        ], 'timetable_departure'),
        //
        GetField('massive',
        [
            GetField('number', 'day'),
            GetField('object',
            [
                GetField('time', 'start'),
                GetField('time', 'end')
            ], 'time'),
            GetField('string', 'description')
        ], 'timetable'),
        //
        GetField('massive', [
            GetField('string', 'src')
        ], 'images')

    ],
    'motorships': [
        GetField('ObjectId', '_id'),
        GetField('string', 'name'),
        GetField('string', 'description'),
        GetField('string', 'type'),
        //
        GetField('massive', [
            GetField('string', 'src')
        ], 'images')
    ],
    //
    'tours': [
        GetField('ObjectId', '_id'),
        GetField('string', 'name'),
        GetField('string', 'description'),
        GetField('number', 'price'),
        GetField('string', 'adress'),
        //
        {
            type: 'massive',
            prop: 
            [
                GetField('date', 'date'),
                GetField('time', 'time'),
                GetField('object',
                [   
                    GetField('number', 'available'),
                    GetField('number', 'occupied')
                ], 'number_of_seats'),
            ],
            title: 'timetable_departure',
            min: 1
        },
        GetField('OtherId', 'id_locality', undefined, 'localities'),
        GetField('object', 
        [
            GetField('number', 'x'),
            GetField('number', 'y')
        ], 'points'),
        //
        {
            type: 'massive',
            prop: 
            [
                GetField('number', 'day'),
                GetField('object',
                [
                    GetField('time', 'start'),
                    GetField('time', 'end')
                ], 'time'),
                GetField('string', 'description')
            ],
            title: 'timetable',
            min: 1
        },
        GetField('object',
        [
            //
            GetField('massive',
            [
                GetField('string', 'language')
            ], 'languages'),
            //
            GetField('massive',
            [
                GetField('OtherId', 'id_country', undefined, 'countries')
            ], 'countries'),
            //
            GetField('massive',
            [
                GetField('string', 'route')
            ], 'routes')
        ], 'info'),
        GetField('object',
        [
            //
            GetField('massive',
            [
                GetField('string', 'icon'),
                GetField('string', 'text')
            ], 'included'),
            //
            GetField('massive',
            [
                GetField('string', 'icon'),
                GetField('string', 'text')
            ], 'payable')
        ], 'services'),
        //
        GetField('massive', [
            GetField('string', 'src')
        ], 'images')
    ],
    //
    'localities': [
        GetField('ObjectId', '_id'),
        GetField('string', 'name'),
        GetField('string', 'description'),
        GetField('OtherId', 'id_country', undefined, 'countries')
    ],
    'countries': [
        GetField('ObjectId', '_id'),
        GetField('string', 'name'),
        GetField('string', 'description')
    ],
    //
    'admins': [
        GetField('ObjectId', '_id'),
        GetField('string', 'login'),
        GetField('string', 'password'),
        //
        GetField('string', 'name'),
        GetField('string', 'surname'),
        GetField('string', 'middle_name')
    ],
    'users': [
        GetField('ObjectId', '_id'),
        //Authorization
        GetField('string', 'login'),
        GetField('string', 'password'),
        //
        GetField('string', 'name'),
        GetField('string', 'surname'),
        GetField('string', 'middle_name'),
        GetField('string', 'email'),
        GetField('string', 'telephone'),
        {
            type: 'massive',
            prop:
            [
                GetField('OtherId', 'id_tour', undefined, 'tours'),
                //Copy object instead of create reference, this method increase speed, but add unnecesseary data
                //object timetable_departure
                GetField('object',
                [
                    GetField('date', 'date'),
                    GetField('time', 'time'),
                    // GetField('object',
                    // [   
                    //     GetField('number', 'available'),
                    //     GetField('number', 'occupied')
                    // ], 'number_of_seats'),
                ], 'timetable_departure'),
                //
                GetField('number', 'tickets'),
                GetField('number', 'price'),
                //INSERT COMBOBOX INSTEAD OF NUMBER
                GetField('number', 'status')
            ],
            title: 'tours_orders'
        },
        {
            type: 'massive',
            prop:
            [
                GetField('OtherId', 'id_relax', undefined, 'relax'),
                //Copy object instead of create reference, this method increase speed, but add unnecesseary data
                //object rooms
                GetField('object',
                [
                    GetField('string', 'category'),
                    GetField('object', 
                    [
                        GetField('object',
                        [
                            GetField('number', 'adult'),
                            GetField('number', 'child')
                        ], 'seats'),
                        // GetField('object',
                        // [
                        //     GetField('number', 'available'),
                        //     GetField('number', 'occupied')
                        // ], 'rooms')
                    ], 'number_of'),
                    GetField('string', 'corpus'),
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
                    GetField('boolean', 'pets'),
                    GetField('object', 
                    [
                        GetField('number', 'bb'),
                        GetField('number', 'hb'),
                        GetField('number', 'fb'),
                    ],
                    'prices_of_food'),
                    GetField('string', 'image'),
                ], 'room'),
                //
                GetField('object',
                [
                    GetField('number', 'adult'),
                    GetField('number', 'child'),
                    GetField('object', 
                    [
                        GetField('boolean', 'adult'),
                        GetField('boolean', 'child')
                    ], 'extra')
                ], 'number_of'),
                {
                    type: 'combobox',
                    prop: 'type_of_food',
                    items: [ 'bb', 'hb', 'fb']
                },
                GetField('date', 'date_arrival'),
                GetField('date', 'date_leave'),
                GetField('number', 'price'),
                //INSERT COMBOBOX INSTEAD OF NUMBER
                GetField('number', 'status')
            ],
            title: 'relax_orders'
        },
        {
            type: 'massive',
            prop:
            [
                GetField('OtherId', 'id_cruise', undefined, 'cruises'),
                //Copy object instead of create reference, this method increase speed, but add unnecesseary data
                //object room
                GetField('object',
                [
                    GetField('string', 'category'),
                    GetField('object', 
                    [
                        GetField('object',
                        [
                            GetField('number', 'adult'),
                            GetField('number', 'child')
                        ], 'seats'),
                        // GetField('object',
                        // [
                        //     GetField('number', 'available'),
                        //     GetField('number', 'occupied')
                        // ], 'rooms')
                    ], 'number_of'),
                    GetField('string', 'corpus'),
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
                    GetField('boolean', 'pets'),
                    GetField('object', 
                    [
                        GetField('number', 'bb'),
                        GetField('number', 'hb'),
                        GetField('number', 'fb'),
                    ],
                    'prices_of_food'),
                    GetField('string', 'image'),
                    //Instead of InnerId copy object
                    // GetField('InnerId', 'id_timetable_departure', undefined, 'timetable_departure')
                    GetField('object',
                    [
                        GetField('date', 'date'),
                        GetField('time', 'time'),
                    ], 'timetable_departure'),
                ], 'room'),
                //
                GetField('object',
                [
                    GetField('number', 'adult'),
                    GetField('number', 'child'),
                    GetField('object', 
                    [
                        GetField('boolean', 'adult'),
                        GetField('boolean', 'child')
                    ], 'extra')
                ], 'number_of'),
                {
                    type: 'combobox',
                    prop: 'type_of_food',
                    items: [ 'bb', 'hb', 'fb']
                },
                GetField('number', 'price'),
                //INSERT COMBOBOX INSTEAD OF NUMBER
                GetField('number', 'status')
            ],
            title: 'cruises_orders'
        },
    ]
});
//status: 0 - booked without money, 1 - booked with half money, 2 - booked with all money

//Создание инедксов 
//Новый пользователь определяется по почте, если пользователя с такой почтой нету в системе, он создаст нового пользователя
db.users.createIndex({ 'email': 1 }, { 'unique': true });
// After complete personal account page 
// db.users.createIndex({ 'login': 1 }, { 'unique': true });
//
db.admins.createIndex({ 'login': 1 }, { 'unique': true });




//Заполнение изначальными данными
db.admins.insertOne({ login: 'login', password: 'password', name: 'Паша', surname: 'Совельевич', middle_name: 'Морозов' });
db.users.insertOne(
{ 
    login: 'user_login', 
    password: 'user_password', 
    name: 'Даниил', 
    surname: 'Зимин', 
    middle_name: 'Вячеславович', 
    email: 'denzimin1@gmail.com', 
    telephone: '89516636513', 
    tours_orders: [], 
    relax_orders: [],
    cruises_orders: []
});
db.countries.insertOne({ name: 'Россия', description: 'Описание великой и ужасной' });
// db.localities.insertOne({ name: 'Санкт-Петебург', description: 'Самый красивый город нашей страный' });
