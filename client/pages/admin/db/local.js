export default class Local {
    static _submenu = 
    [
        {
            title: 'Внести',
            href: 'insert'
        },
        {
            title: 'Изменить',
            href: 'update'
        },
        {
            title: 'Удалить',
            href: 'delete'
        }
    ];

    static items = 
    [ 
        {
            title: 'Страны',
            href: 'countries',
            items: this._submenu
        },
        {
            title: 'Города',
            href: 'cities',
            items: this._submenu
        },
        {
            title: 'Круизы',
            href: 'cruises',
            items: this._submenu
        },
        {
            title: 'Туры',
            href: 'tours',
            items: this._submenu
        },
        {
            title: 'Отдых',
            href: 'resorts',
            items: this._submenu
        },
        {
            title: 'Группы',
            href: 'bands',
            items: this._submenu
        }
    ];
    
    get items() {
        return this.items;
    }

    //Здесь указываються колонки которые будут выводиться в таблицу
    static GetColumns(table)
    {
        switch(table)
        {
            case 'cities':
                return [ 
                    '_id', 
                    'name', 
                    'description'
                ];
            case 'countries':
                return [ 
                    '_id', 
                    'name', 
                    'description'
                ];
            case 'resorts':
                return [ 
                    '_id', 
                    'name', 
                    //_
                    'services', 
                    //^
                    'stars',
                    'description', 
                    //_
                    'images',
                    //^
                    'id_countries', 
                    //_
                    'rooms',
                    //^
                    'prices_of_food', 
                    'adress', 
                    'id_cities', 
                    'points' 
                ];
        }
    }

    //Только для сложных структур
    static GetFields(table, array)
    {
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

        //Эта информация будет в БД
        switch(table)
        {
            case 'cities':
                return [
                    GetField('ObjectId', '_id'),
                    GetField('string', 'name'),
                    GetField('string', 'description')
                ];
            case 'countries':
                return [
                    GetField('ObjectId', '_id'),
                    GetField('string', 'name'),
                    GetField('string', 'description')
                ];
            case 'bands':
                switch(array)
                {
                    case undefined:
                        return [
                            GetField('ObjectId', '_id'),
                            GetField('string', 'name'),
                            GetField('number', 'rating'),
                            GetField('object', 
                            [
                                GetField('object', 
                                [
                                    GetField('number', 'avg_rating'),
                                    //
                                    GetField('massive', 
                                    this.GetFields(table, 'albums.new.names'),
                                    'names'),
                                    //
                                    GetField('massive', 
                                    this.GetFields(table, 'albums.new.members'), 
                                    'members'),
                                    //
                                ],'new'),
                                GetField('object', 
                                [
                                    GetField('number', 'avg_rating'),
                                    //
                                    GetField('massive', 
                                    this.GetFields(table, 'albums.old.names'), 
                                    'names'),
                                    //
                                ], 'old')
                            ], 'albums'),
                            //
                            GetField('massive', 
                            this.GetFields(table, 'comments'), 
                            'comments')
                        ];
                    //
                    case "albums.new.names":
                    case "albums.old.names":
                        return [
                            GetField('string', 'name')
                        ];
                    case "albums.new.members":
                        return [
                            GetField('string', 'name')
                        ]
                    case "comments":
                        return [
                            GetField('string', 'user_name'),
                            GetField('string', 'text')
                        ]
                }
            case 'resorts':
                switch(array)
                {
                    case undefined:
                        return [
                            GetField('ObjectId', '_id'),
                            GetField('string', 'name'),
                            GetField('object',
                            [
                                GetField('massive', 
                                this.GetFields(table, 'services.available'), 
                                'available'),
                                //
                                GetField('massive', 
                                this.GetFields(table, 'services.common'), 
                                'common'),
                                //
                                GetField('massive', 
                                this.GetFields(table, 'services.rooms'), 
                                'rooms'),
                            ],
                            'services'),
                            GetField('number', 'stars'),
                            GetField('string', 'description'),
                            GetField('massive', this.GetFields(table, 'images'), 'images'),
                            GetField('string', 'id_countries'),
                            GetField('massive', this.GetFields(table, 'rooms'), 'rooms'),
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
                        ];
                    case 'rooms':
                        return [
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
                        ];
                    case 'images':
                        return [
                            GetField('string', 'src')
                        ];
                    case 'services.available':
                    case 'services.common':
                    case 'services.rooms':
                        return [ 
                            GetField('string', 'icon'),
                            GetField('string', 'text')
                        ];
                }
                break;
            default:
                console.log('ERROR THIS TABLE DON`T SUPPORT');
                return;
        }
    }
}