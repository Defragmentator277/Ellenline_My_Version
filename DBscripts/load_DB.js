db.createCollection('resorts');
db.createCollection('cities');
db.createCollection('countries');

//For example of flexibility
db.createCollection('bands');
//Add bands documents
db.bands.insertMany(
[
    {
        
    },
    {

    }
]);
//

//Add countries documents
db.cities.insertMany(
[
    {
        '_id': 0,
        'name': 'Германия',
        'description': 'Машину тут просто класс',
        
    },
    {
        '_id': 1,
        'name': 'Италия',
        'description': 'Спагетти',   
    },
    {
        '_id': 2,
        'name': 'Новый',
        'description': 'Новый Русский',   
    }
]);
//Add cities documents
db.cities.insertMany(
[
    {
        '_id': 0,
        'name': 'Санкт-Петербург',
        'description': 'Сокращенно СПБ',
        
    },
    {
        '_id': 1,
        'name': 'Москва',
        'description': 'Moskov City',   
    },
    {
        '_id': 2,
        'name': 'Новосибирск',
        'description': 'Новый сибиряки',   
    }
]);
//Add resorts documents
db.resorts.insertMany(
[
    {
        '_id': 0,
        'name': "Отель из Кухни",
        'services':
        {
            'available': 
            [
                {
                    'id': 0,
                    'icon': 'services',
                    'text': 'no service',
                },
                {
                    'id': 1,
                    'icon': 'another service',
                    'text': 'but not for you, ahahha',
                }
            ],
            'common':
            [
                {
                    'id': 0,
                    'icon': 'our common service',
                    'text': 'Your mother is in flame?',
                },
                {
                    'id': 1,
                    'icon': 'OUR',
                    'text': 'no OUR',
                }
            ],
            'rooms':
            [
                {
                    'id': 0,
                    'icon': 'our rooms',
                    'text': 'roooooooooms',
                }
            ]
        },
        'stars': 4,
        'description': "Описание нашего замечательного отеля",
        'id_countries': '6030e8f510a02ae715baead7',
        'prices_of_food':
        {
            'bb': 0,
            'hb': 500,
            'fb': 1000
        },
        'adress': 'Народная 46',
        'points':
        {
            'x': 59.2525,
            'y': 30.252710
        },
        'rooms':
        [
            {
                'id': 0,
                'category': "Люкс",
                'number':
                {
                    'of_seats': 2,
                    'of_rooms': 50
                },
                'corpus': 'Главный',
                'prices':
                {
                    'usual': 10000,
                    'on_weekends': 25000,
                    'extra':
                    {
                        'adult': 1500,
                        'child': 500
                    },
                    'pets': false
                }
            },
            {
                'id': 1,
                'category': "King Size",
                'number':
                {
                    'of_seats': 1,
                    'of_rooms':25
                },
                'corpus': 'Дачный',
                'prices':
                {
                    'usual': 15000,
                    'on_weekends': 5000,
                    'extra':
                    {
                        'adult': 1000,
                        'child': 750
                    },
                    'pets': true
                }
            },
            {
                'id': 2,
                'category': "King Diamond",
                'number':
                {
                    'of_seats': 5,
                    'of_rooms':35
                },
                'corpus': 'Abigail',
                'prices':
                {
                    'usual': 7500,
                    'on_weekends': 8575,
                    'extra':
                    {
                        'adult': 2300,
                        'child': 1500
                    },
                    'pets': true
                }
            }
        ],
        'images': 
        [
            {
                'id': 0,
                'src': "https://avatars.yandex.net/get-music-content/97284/a2020179.a.298667-2/m1000x1000?webp=false"
            },
            {
                'id': 1,
                'src': 'http://github.com/....'
            },
            {
                'id': 2,
                'src': 'http://learn.shool/....'
            }
        ]
    },
    {
        '_id': 1,
        'name': "La Rush",
        'services':
        {
            'available': 
            [
                {
                    'id': 0,
                    'icon': 'cutlery',
                    'text': 'Ресторан',
                },
                {
                    'id': 1,
                    'icon': 'wifi',
                    'text': 'Wi-Fi',
                }
            ],
            'common':
            [
                {
                    'id': 0,
                    'icon': 'bar',
                    'text': 'Бар',
                }
            ],
            'rooms':
            [
                {
                    'id': 0,
                    'icon': 'wifi',
                    'text': 'Wi-Fi в комнате',
                }
            ]
        },
        'stars': 3.5,
        'description': "Здесь можно будет играть в доту 2 24/7",
        'id_countries': '6030e8f510a02ae715baead9',
        'prices_of_food':
        {
            'bb': 1235,
            'hb': 1555,
            'fb': 2205
        },
        'adress': 'Максима Галкина 14',
        'points':
        {
            'x': 59.27234234,
            'y': 30.2801290
        },
        'rooms':
        [
            {
                'id': 0,
                'category': "Люкс",
                'number':
                {
                    'of_seats': 2,
                    'of_rooms': 50
                },
                'corpus': 'Главный',
                'prices':
                {
                    'usual': 10000,
                    'on_weekends': 25000,
                    'extra':
                    {
                        'adult': 1500,
                        'child': 500
                    },
                    'pets': false
                }
            },
            {
                'id': 1,
                'category': "King Size",
                'number':
                {
                    'of_seats': 1,
                    'of_rooms':25
                },
                'corpus': 'Дачный',
                'prices':
                {
                    'usual': 15000,
                    'on_weekends': 5000,
                    'extra':
                    {
                        'adult': 1000,
                        'child': 750
                    },
                    'pets': true
                }
            }
        ],
        'images': 
        [
            {
                'id': 0,
                'src': 'http://miki.com/....'
            },
            {
                'id': 1,
                'src': 'http://github.com/....'
            },
            {
                'id': 2,
                'src': 'http://learn.shool/....'
            }
        ]
    },
]);