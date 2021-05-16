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
db.createCollection('managers');

//Создание струткутры БД
db.structure.insertOne(
{
    'relax': [
        {
            type: 'ObjectId',
            prop: '_id',
            translate: 'Айди',
            hint: 'Идентификатор объекта'
        },
        {
            type: 'string',
            prop: 'name',
            translate: 'Название',
            hint: 'Название'
        },
        {
            type: 'string',
            prop: 'description',
            translate: 'Описание',
            hint: 'Описание'
        },
        {
            type: 'OtherId',
            prop: 'id_locality',
            ref: 'localities',
            translate: 'Айди населенного пункта',
            hint: 'Айди ближаего от отдха населенного пункта'
        },
        {
            type: 'combobox',
            prop: 'type',
            translate: 'Тип отдыха',
            items: [ 'Санаторий', "Пансионат"]
        },  
        {
            type: 'object',
            prop:
            [
                {
                    type: 'massive',
                    prop: 
                    [ 
                        {
                            type: 'string',
                            prop: 'icon',
                            translate: 'Иконка',
                            hint: 'Иконка должна быть классом FontAwesom'
                        },
                        {
                            type: 'string',
                            prop: 'text',
                            translate: 'Текст',
                            hint: 'Текст иконки'
                        }
                    ],
                    title: 'available',
                    translate: 'Доступные',
                    min: 1
                },
                {
                    type: 'massive',
                    prop: 
                    [ 
                        {
                            type: 'string',
                            prop: 'icon',
                            translate: 'Иконка',
                            hint: 'Иконка должна быть классом FontAwesom'
                        },
                        {
                            type: 'string',
                            prop: 'text',
                            translate: 'Текст',
                            hint: 'Текст иконки'
                        }
                    ],
                    title: 'common',
                    translate: 'Обычные',
                    min: 1
                },
                {
                    type: 'massive',
                    prop: 
                    [ 
                        {
                            type: 'string',
                            prop: 'icon',
                            translate: 'Иконка',
                            hint: 'Иконка должна быть классом FontAwesom'
                        },
                        {
                            type: 'string',
                            prop: 'text',
                            translate: 'Текст',
                            hint: 'Текст иконки'
                        }
                    ],
                    title: 'rooms',
                    translate: 'В комнатах',
                    min: 1
                }
            ],
            title: 'services',
            translate: 'Сервисы'
        },
        {
            type: 'number',
            prop: 'stars',
            translate: 'Кол-во звезд',
            min: 0,
            max: 5
        },
        //
        {
            type: 'massive',
            prop: 
            [
                {
                    type: 'string',
                    prop: 'src',
                    translate: 'Ссылка на изображение',
                    hint: 'Вставте ссылку на картинку из интеренета'
                }
            ],
            title: 'images',
            translate: 'Изображения',
            min: 1
        },
        {
            type: 'massive',
            prop: 
            [
                {
                    type: 'string',
                    prop: 'category',
                    translate: 'Тип комнаты'
                },
                {
                    type: 'object',
                    prop: 
                    [
                        {
                            type: 'object',
                            prop: 
                            [
                                {
                                    type: 'number',
                                    prop: 'adult',
                                    translate: 'Для взрослых'
                                },
                                {
                                    type: 'number',
                                    prop: 'child',
                                    translate: 'Для детей'
                                }
                            ],
                            title: 'seats',
                            translate: 'Мест в комнате'
                        },
                        {
                            type: 'object',
                            prop: 
                            [
                                {
                                    type: 'number',
                                    prop: 'available',
                                    title: 'Доступных'
                                },
                                {
                                    type: 'number',
                                    prop: 'occupied',
                                    title: 'Занятых'
                                }
                            ],
                            title: 'rooms',
                            translate: 'Комнат'
                        }
                    ],
                    title: 'number_of',
                    translate: 'Кол-во'
                },
                {
                    type: 'string',
                    prop: 'corpus',
                    translate: 'Корпус'
                },
                {
                    type: 'object',
                    prop: 
                    [
                        {
                            type: 'number',
                            prop: 'usual',
                            translate: 'По будням'
                        },
                        {
                            type: 'number',
                            prop: 'on_weekends',
                            translate: 'По выходным'
                        },
                        {
                            type: 'object',
                            prop: 
                            [
                                {
                                    type: 'number',
                                    prop: 'adult',
                                    translate: 'Взрослому'
                                },
                                {
                                    type: 'number',
                                    prop: 'child',
                                    translate: 'Ребенку'
                                }
                            ],
                            title: 'extra',
                            translate: 'За дополнительное место'
                        },
                    ],
                    title: 'prices',
                    translate: 'Цены'
                },
                {
                    type: 'boolean',
                    prop: 'pets',
                    translate: 'Разрешены домашние питомцы'
                },
                {
                    type: 'object',
                    prop: 
                    [
                        GetField('number', 'bb'),
                        GetField('number', 'hb'),
                        GetField('number', 'fb'),
                    ],
                    title: 'prices_of_food',
                    translate: 'Цена за питание'
                },
                {
                    type: 'string',
                    prop: 'image',
                    translate: 'Изображение'
                }
            ],
            title: 'rooms',
            translate: 'Комнаты',
            min: 1
        },
        {
            type: 'string',
            prop: 'adress',
            translate: 'Адресс'
        },
        {
            type: 'object',
            prop: 
            [
                {
                    type: 'number',
                    prop: 'x',
                    translate: 'Координата X'
                },
                {
                    type: 'number',
                    prop: 'y',
                    translate: 'Координата Y'
                }
            ],
            title: 'points',
            translate: 'Точки на карте'
        },
        //
        {
            type: 'massive',
            prop: 
            [
                {
                    type: 'OtherId',
                    prop: 'id_user',
                    ref: 'users',
                    translate: 'Айди пользователя'
                },
                {
                    type: 'string',
                    prop: 'text',
                    translate: 'Текст комментария'
                },
                {
                    type: 'date',
                    prop: 'date',
                    translate: 'Дата'
                },
                {
                    type: 'number',
                    prop: 'rating',
                    translate: 'Оценка от 0 до 5',
                    min: 0,
                    max: 5
                }
            ],
            title: 'comments',
            translate: 'Комментарии'
        }
    ],
    //
    'cruises': [
        {
            type: 'ObjectId',
            prop: '_id',
            translate: 'Айди',
            hint: 'Идентификатор'
        },
        {
            type: 'string',
            prop: 'name',
            translate: 'Название',
            hint: 'Название'
        },
        {
            type: 'string',
            prop: 'description',
            translate: 'Описание',
            hint: 'Описание'
        },
        {
            type: 'combobox',
            prop: 'type',
            items: [ 'Речной', "Морской"],
            translate: 'Тип круиза'
        },  
        {
            type: 'string',
            prop: 'adress',
            translate: 'Адресс'
        },
        {
            type: 'OtherId',
            prop: 'id_locality',
            ref: 'localities',
            translate: 'Айди населенного пункта',
            hint: 'Айди ближаего от отдха населенного пункта'
        },
        {
            type: 'OtherId',
            prop: 'id_motorship',
            ref: 'motorships',
            translate: 'Айди лайнера'
        },
        {
            type: 'object',
            prop: 
            [
                {
                    type: 'number',
                    prop: 'x',
                    translate: 'Координата X'
                },
                {
                    type: 'number',
                    prop: 'y',
                    translate: 'Координата Y'
                }
            ],
            title: 'points',
            translate: 'Точки на карте'
        },
        //
        {
            type: 'object',
            prop: 
            [
                {
                    type: 'massive',
                    prop: 
                    [ 
                        {
                            type: 'string',
                            prop: 'icon',
                            translate: 'Иконка',
                            hint: 'Иконка должна быть классом FontAwesom'
                        },
                        {
                            type: 'string',
                            prop: 'text',
                            translate: 'Текст',
                            hint: 'Текст иконки'
                        }
                    ],
                    title: 'available',
                    min:1
                },
                //
                {
                    type: 'massive',
                    prop: 
                    [ 
                        {
                            type: 'string',
                            prop: 'icon',
                            translate: 'Иконка',
                            hint: 'Иконка должна быть классом FontAwesom'
                        },
                        {
                            type: 'string',
                            prop: 'text',
                            translate: 'Текст',
                            hint: 'Текст иконки'
                        }
                    ],
                    title: 'cabin',
                    min:1
                }
            ],
            title: 'services',
            translate: 'Сервисы'
        },
        //
        {
            type: 'massive',
            prop: 
            [
                {
                    type: 'string',
                    prop: 'category',
                    translate: 'Тип каюты'
                },
                {
                    type: 'object',
                    prop: 
                    [
                        {
                            type: 'object',
                            prop: 
                            [
                                {
                                    type: 'number',
                                    prop: 'adult',
                                    translate: 'Для взрослых'
                                },
                                {
                                    type: 'number',
                                    prop: 'child',
                                    translate: 'Для детей'
                                }
                            ],
                            title: 'seats',
                            translate: 'Мест в каюте'
                        },
                        {
                            type: 'object',
                            prop: 
                            [
                                {
                                    type: 'number',
                                    prop: 'available',
                                    title: 'Доступных'
                                },
                                {
                                    type: 'number',
                                    prop: 'occupied',
                                    title: 'Занятых'
                                }
                            ],
                            title: 'rooms',
                            translate: 'Комнат'
                        }
                    ],
                    title: 'number_of',
                    translate: 'Кол-во'
                },
                {
                    type: 'string',
                    prop: 'corpus',
                    translate: 'Корпус'
                },
                {
                    type: 'object',
                    prop: 
                    [
                        {
                            type: 'number',
                            prop: 'usual',
                            translate: 'Стандартная'
                        },
                        {
                            type: 'object',
                            prop: 
                            [
                                {
                                    type: 'number',
                                    prop: 'adult',
                                    translate: 'Взрослому'
                                },
                                {
                                    type: 'number',
                                    prop: 'child',
                                    translate: 'Ребенку'
                                }
                            ],
                            title: 'extra',
                            translate: 'За дополнительное место'
                        },
                    ],
                    title: 'prices',
                    translate: 'Цены'
                },
                {
                    type: 'boolean',
                    prop: 'pets',
                    translate: 'Разрешены домашние питомцы'
                },
                {
                    type: 'object',
                    prop: 
                    [
                        GetField('number', 'bb'),
                        GetField('number', 'hb'),
                        GetField('number', 'fb'),
                    ],
                    title: 'prices_of_food',
                    translate: 'Цена за питание'
                },
                {
                    type: 'string',
                    prop: 'image',
                    translate: 'Изображение'
                },
                //
                {
                    type: 'InnerId',
                    prop: 'id_timetable_departure',
                    ref: 'timetable_departure',
                    translate: 'Айди расписания'
                }
            ],
            title: 'rooms',
            translate: 'Каюты',
            min: 1
        },
        //
        {
            type: 'massive',
            prop: 
            [
                {
                    type: 'date',
                    prop: 'date',
                    translate: 'Дата'
                },
                {
                    type: 'time',
                    prop: 'time',
                    translate: 'Время'
                }
            ],
            title: 'timetable_departure',
            translate: 'Расписание круизов',
            min: 1
        },
        //
        {
            type: 'massive',
            prop: 
            [
                {
                    type: 'number',
                    prop: 'day',
                    translate: 'Номер дня'
                },
                {
                    type: 'object',
                    prop: 
                    [
                        {
                            type: 'time',
                            prop: 'start',
                            translate: 'Начало'
                        },
                        {
                            type: 'time',
                            prop: 'end',
                            translate: 'Конец'
                        }
                    ],
                    title: 'time',
                    translate: 'Время'
                },
                {
                    type: 'string',
                    prop: 'description',
                    translate: 'Описание дня'
                }
            ],
            title: 'timetable',
            translate: 'Расписание круиза по дням',
            min: 1
        },
        //
        {
            type: 'massive',
            prop: 
            [
                {
                    type: 'string',
                    prop: 'src',
                    translate: 'Ссылка на изображение',
                    hint: 'Вставте ссылку на картинку из интеренета'
                }
            ],
            title: 'images',
            translate: 'Изображения',
            min: 1
        },
        //
        {
            type: 'massive',
            prop: 
            [
                {
                    type: 'OtherId',
                    prop: 'id_user',
                    ref: 'users',
                    translate: 'Айди пользователя'
                },
                {
                    type: 'string',
                    prop: 'text',
                    translate: 'Текст комментария'
                },
                {
                    type: 'date',
                    prop: 'date',
                    translate: 'Дата'
                },
                {
                    type: 'number',
                    prop: 'rating',
                    translate: 'Оценка от 0 до 5',
                    min: 0,
                    max: 5
                }
            ],
            title: 'comments',
            translate: 'Комментарии'
        }

    ],
    'motorships': [
        {
            type: 'ObjectId',
            prop: '_id',
            translate: 'Айди',
            hint: 'Идентификатор объекта'
        },
        {
            type: 'string',
            prop: 'name',
            translate: 'Название',
            hint: 'Название'
        },
        {
            type: 'string',
            prop: 'description',
            translate: 'Описание',
            hint: 'Описание'
        },
        //info object
        {
            type: 'number',
            prop: 'year',
            translate: 'Год'
        },
        {
            type: 'number',
            prop: 'capacity',
            translate: 'Вместимость (чел.)'
        },
        {
            type: 'number',
            prop: 'length',
            translate: 'Длина (метр)'
        },
        {
            type: 'number',
            prop: 'width',
            translate: 'Ширина (метр)'
        },
        {
            type: 'number',
            prop: 'heigth',
            translate: 'Высота (метр)'
        },
        {
            type: 'number',
            prop: 'speed',
            translate: 'Скорость (метр/час)'
        },
        {
            type: 'string',
            prop: 'class',
            translate: 'Класс лайнера'
        },
        //
        {
            type: 'massive',
            prop: 
            [
                {
                    type: 'string',
                    prop: 'src',
                    translate: 'Ссылка на изображение',
                    hint: 'Вставте ссылку на картинку из интеренета'
                }
            ],
            title: 'images',
            translate: 'Изображения',
            min: 1
        },
    ],
    //
    'tours': [
        {
            type: 'ObjectId',
            prop: '_id',
            translate: 'Айди',
            hint: 'Идентификатор объекта'
        },
        {
            type: 'string',
            prop: 'name',
            translate: 'Название',
            hint: 'Название'
        },
        {
            type: 'string',
            prop: 'description',
            translate: 'Описание',
            hint: 'Описание'
        },
        {
            type: 'number',
            prop: 'price',
            translate: 'Цена'
        },
        {
            type: 'string',
            prop: 'adress',
            translate: 'Адресс'
        },
        //
        {
            type: 'massive',
            prop: 
            [
                {
                    type: 'date',
                    prop: 'date',
                    translate: 'Дата'
                },
                {
                    type: 'time',
                    prop: 'time',
                    translate: 'Время'
                },
                {
                    type: 'object',
                    prop: 
                    [
                        {
                            type: 'number',
                            prop: 'available',
                            translate: 'Доступных'
                        },
                        {
                            type: 'number',
                            prop: 'occupied',
                            translate: 'Занятых'
                        }
                    ],
                    title: 'number_of_seats',
                    translate: 'Кол-во мест'
                }
            ],
            title: 'timetable_departure',
            translate: 'Расписание туров',
            min: 1
        },
        ////WHERE I END
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
            {
                type: 'massive',
                prop: 
                [
                    GetField('string', 'language')
                ],
                title: 'languages',
                min: 1
            },
            //
            {
                type: 'massive',
                prop: 
                [
                    GetField('OtherId', 'id_country', undefined, 'countries')
                ],
                title: 'countries',
                min: 1
            },
            //
            {
                type: 'massive',
                prop: 
                [
                    GetField('string', 'route')
                ],
                title: 'routes',
                min: 1
            }
        ], 'info'),
        GetField('object',
        [
            //
            {
                type: 'massive',
                prop: 
                [ 
                    GetField('string', 'icon'),
                    GetField('string', 'text')
                ],
                title: 'included',
                min:1
            },
            //
            {
                type: 'massive',
                prop: 
                [ 
                    GetField('string', 'icon'),
                    GetField('string', 'text')
                ],
                title: 'payable',
                min:1
            }
        ], 'services'),
        //
        {
            type: 'massive',
            prop: 
            [ 
                GetField('string', 'src')
            ],
            title: 'images',
            min:1
        },
        {
            type: 'massive',
            prop: 
            [
                GetField('OtherId', 'id_user', undefined, 'users'),
                GetField('string', 'text'),
                GetField('date', 'date'),
                {
                    type: 'number',
                    prop: 'rating',
                    min: 0,
                    max: 5
                }
            ],
            title: 'comments'
        }
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
        //Authorization
        {
            type: 'string',
            prop: 'login',
            secret: true
        },
        {
            type: 'string',
            prop: 'password',
            secret: true
        },
        //
        GetField('string', 'name'),
        GetField('string', 'surname'),
        GetField('string', 'middle_name'),
        GetField('string', 'email'),
        GetField('string', 'telephone'),
        {
            type: 'combobox',
            prop: 'gender',
            items: [ 'Мужской', 'Женский' ]
        }
    ],
    'users': [
        GetField('ObjectId', '_id'),
        //Authorization
        {
            type: 'string',
            prop: 'login',
            secret: true
        },
        {
            type: 'string',
            prop: 'password',
            secret: true
        },
        //
        GetField('string', 'name'),
        GetField('string', 'surname'),
        GetField('string', 'middle_name'),
        GetField('string', 'email'),
        GetField('string', 'telephone'),
        GetField('string', 'image'),
        {
            type: 'combobox',
            prop: 'gender',
            items: [ 'Мужской', 'Женский' ]
        },
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
                ], 'timetable_departure'),
                //
                GetField('number', 'tickets'),
                GetField('number', 'price'),
                {
                    type: 'combobox',
                    prop: 'status',
                    items: [ 'Не оплаченно', 'Оплаченно половины суммы', 'Заказ оплачен' ]
                }
            ],
            title: 'tours_orders'
        },
        {
            type: 'massive',
            prop:
            [
                GetField('OtherId', 'id_tour', undefined, 'tours'),
                GetField('OtherId', 'id_manager', undefined, 'managers'),
                GetField('object',
                [
                    GetField('date', 'date'),
                    GetField('time', 'time'),
                ], 'timetable_departure'),
                //
                GetField('number', 'tickets'),
                GetField('number', 'price')
            ],
            title: 'history_tours_orders'
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
                {
                    type: 'combobox',
                    prop: 'status',
                    items: [ 'Не оплаченно', 'Оплаченно половины суммы', 'Заказ оплачен' ]
                }
            ],
            title: 'relax_orders'
        },
        {
            type: 'massive',
            prop:
            [
                GetField('OtherId', 'id_relax', undefined, 'relax'),
                GetField('OtherId', 'id_manager', undefined, 'managers'),
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
                GetField('number', 'price')
            ],
            title: 'history_relax_orders'
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
                        ], 'seats')
                    ], 'number_of'),
                    GetField('string', 'corpus'),
                    GetField('object', 
                    [
                        GetField('number', 'usual'),
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
                {
                    type: 'combobox',
                    prop: 'status',
                    items: [ 'Полная оплата по карте', 'Оплата половины суммы', 'Оплата по прибытию' ]
                }
            ],
            title: 'cruises_orders'
        },
        {
            type: 'massive',
            prop:
            [
                GetField('OtherId', 'id_cruise', undefined, 'cruises'),
                GetField('OtherId', 'id_manager', undefined, 'managers'),
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
                        ], 'seats')
                    ], 'number_of'),
                    GetField('string', 'corpus'),
                    GetField('object', 
                    [
                        GetField('number', 'usual'),
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
                GetField('number', 'price')
            ],
            title: 'history_cruises_orders'
        },
    ],
    'managers': [
        GetField('ObjectId', '_id'),
        //Authorization
        {
            type: 'string',
            prop: 'login',
            secret: true
        },
        {
            type: 'string',
            prop: 'password',
            secret: true
        },
        //
        GetField('string', 'name'),
        GetField('string', 'surname'),
        GetField('string', 'middle_name'),
        GetField('string', 'email'),
        GetField('string', 'telephone'),
        {
            type: 'combobox',
            prop: 'gender',
            items: [ 'Мужской', 'Женский' ]
        }
    ]
});

//Создание инедксов 
//Новый пользователь определяется по почте, если пользователя с такой почтой нету в системе, он создаст нового пользователя
db.users.createIndex({ 'email': 1 }, { 'unique': true });
// After complete personal account page 
// db.users.createIndex({ 'login': 1 }, { 'unique': true });
//
db.admins.createIndex({ 'login': 1 }, { 'unique': true });
db.users.createIndex({ 'login': 1 }, { 'unique': true });
db.managers.createIndex({ 'login': 1 }, { 'unique': true });




//Заполнение изначальными данными
db.admins.insertOne(
{ 
    login: 'login', 
    password: 'password', 
    name: 'Паша', 
    surname: 'Совельевич', 
    middle_name: 'Морозов',
    email: 'denzimin1@gmail.com',
    telephone: '89516636513',
    gender: 'Мужской'
});
//
db.users.insertOne(
{ 
    login: 'user_login', 
    password: 'user_password', 
    name: 'Даниил', 
    surname: 'Зимин', 
    middle_name: 'Вячеславович', 
    email: 'denzimin1@gmail.com', 
    telephone: '89516636513', 
    gender: 'Мужской',
    image: 'ff',
    tours_orders: [], 
    relax_orders: [],
    cruises_orders: [], 
    history_tours_orders: [], 
    history_relax_orders: [],
    history_cruises_orders: []
});
//
db.managers.insertOne(
{
    login: 'manager_login', 
    password: 'manager_password', 
    name: 'Лунев', 
    surname: 'Алексей', 
    middle_name: 'Викторович', 
    email: 'denzimin1@gmail.com', 
    telephone: '89516636513',
    gender: 'Мужской'
});
//
db.countries.insertOne({ name: 'Россия', description: 'Описание великой и ужасной' });
// db.localities.insertOne({ name: 'Санкт-Петебург', description: 'Самый красивый город нашей страный' });
