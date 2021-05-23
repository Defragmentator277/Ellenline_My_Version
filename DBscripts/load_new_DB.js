

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
            translate: 'Айди города',
            hint: 'Айди ближаего от отдыха города'
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
                    translate: 'Палуба'
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
        {
            type: 'OtherId',
            prop: 'id_locality',
            ref: 'localities',
            translate: 'Айди города'
        },
        {
            type: 'object',
            prop: 
            [
                {
                    type: 'number',
                    prop: 'x',
                    translate: 'Координата Х'
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
                            translate: 'Начала'
                        },
                        {
                            type: 'time',
                            prop: 'start',
                            translate: 'Конца'
                        }
                    ],
                    title: 'time',
                    translate: 'Время'
                },
                {
                    type: 'string',
                    prop: 'description',
                    translate: 'Описание'
                }
            ],
            title: 'timetable',
            translate: 'Расписание по дням',
            min: 1
        },
        {
            type: 'object',
            prop: 
            [
                //
                {
                    type: 'massive',
                    prop: 
                    [
                        {
                            type: 'string',
                            prop: 'language',
                            translate: 'Язык'
                        }
                    ],
                    title: 'languages',
                    translate: 'Языках',
                    min: 1
                },
                //
                {
                    type: 'massive',
                    prop: 
                    [
                        {
                            type: 'OtherId',
                            prop: 'id_country',
                            ref: 'countries',
                            translate: 'Страна'
                        }
                    ],
                    title: 'countries',
                    translate: 'Странах',
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
                    translate: 'Машрутах',
                    min: 1
                }
            ],
            title: 'info',
            translate: 'Информаци о'

        },
        {
            type: 'object',
            prop: 
            [
                //
                {
                    type: 'massive',
                    prop: 
                    [ 
                        {
                            type: 'string',
                            prop: 'icon',
                            translate: 'Иконка'
                        },
                        {
                            type: 'string',
                            prop: 'text',
                            translate: 'Текст иконки'
                        }
                    ],
                    title: 'included',
                    translate: 'Включенные в стоимость',
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
                            translate: 'Иконка'
                        },
                        {
                            type: 'string',
                            prop: 'text',
                            translate: 'Текст иконки'
                        }
                    ],
                    title: 'payable',
                    translate: 'Платные',
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
                    prop: 'src',
                    translate: 'Ссылка на изображение',
                    hint: 'Вставте ссылку на картинку из интеренета'
                }
            ],
            title: 'images',
            translate: 'Изображения',
            min:1
        },
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
    'localities': [
        {
            type: 'ObjectId',
            prop: '_id',
            translate: 'Айди',
            hint: 'Идентификатор объекта'
        },
        {
            type: 'string',
            prop: 'name',
            translate: 'Имя'
        },
        {
            type: 'string',
            prop: 'description',
            translate: 'Описание'
        },
        {
            type: 'OtherId',
            prop: 'id_country',
            ref: 'countries',
            translate: 'Айди страны'
        }
    ],
    'countries': [
        {
            type: 'ObjectId',
            prop: '_id',
            translate: 'Айди',
            hint: 'Идентификатор объекта'
        },
        {
            type: 'string',
            prop: 'name',
            translate: 'Имя'
        },
        {
            type: 'string',
            prop: 'description',
            translate: 'Описание'
        }
    ],
    //
    'admins': [
        {
            type: 'ObjectId',
            prop: '_id',
            translate: 'Айди',
            hint: 'Идентификатор объекта'
        },
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
        {
            type: 'string',
            prop: 'name',
            translate: 'Имя'
        },
        {
            type: 'string',
            prop: 'surname',
            translate: 'Фамилия'
        },
        {
            type: 'string',
            prop: 'middle_name',
            translate: 'Отчество'
        },
        {
            type: 'string',
            prop: 'email',
            translate: 'Электронная почта'
        },
        {
            type: 'string',
            prop: 'telephone',
            translate: 'Телефон'
        },
        {
            type: 'combobox',
            prop: 'gender',
            translate: 'Пол',
            items: [ 'Мужской', 'Женский' ]
        }
    ],
    'users': [
        {
            type: 'ObjectId',
            prop: '_id',
            translate: 'Айди',
            hint: 'Идентификатор объекта'
        },
        //Authorization
        {
            type: 'string',
            prop: 'login',
            translate: 'Логин',
            secret: true
        },
        {
            type: 'string',
            prop: 'password',
            translate: 'Пароль',
            secret: true
        },
        {
            type: 'string',
            prop: 'name',
            translate: 'Имя'
        },
        {
            type: 'string',
            prop: 'surname',
            translate: 'Фамилия'
        },
        {
            type: 'string',
            prop: 'middle_name',
            translate: 'Отчество'
        },
        {
            type: 'string',
            prop: 'email',
            translate: 'Электронная почта'
        },
        {
            type: 'string',
            prop: 'telephone',
            translate: 'Телефон'
        },
        {
            type: 'string',
            prop: 'image',
            translate: 'Аватарка'
        },
        {
            type: 'combobox',
            prop: 'gender',
            translate: 'Пол',
            items: [ 'Мужской', 'Женский' ]
        },
        {
            type: 'massive',
            prop:
            [
                {
                    type: 'OtherId',
                    prop: 'id_tour',
                    ref: 'tours',
                    translate: 'Айди тура'
                },
                {
                    type: 'object',
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
                    translate: 'Начало тура'
                },
                {
                    type: 'number',
                    prop: 'tickets',
                    translate: 'Кол-во билетов'
                },
                {
                    type: 'number',
                    prop: 'price',
                    translate: 'Цена'
                },
                {
                    type: 'combobox',
                    prop: 'status',
                    translate: 'Статус заказа',
                    items: [ 'Не оплаченно', 'Оплаченно половины суммы', 'Заказ оплачен' ]
                }
            ],
            title: 'tours_orders',
            translate: 'Заказы туров'
        },
        {
            type: 'massive',
            prop:
            [
                {
                    type: 'OtherId',
                    prop: 'id_tour',
                    ref: 'tours',
                    translate: 'Айди тура'
                },
                {
                    type: 'OtherId',
                    prop: 'id_manager',
                    ref: 'managers',
                    translate: 'Айди менеджера'
                },
                {
                    type: 'object',
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
                    translate: 'Начало тура'
                },
                {
                    type: 'number',
                    prop: 'tickets',
                    translate: 'Кол-во билетов'
                },
                {
                    type: 'number',
                    prop: 'price',
                    translate: 'Цена'
                }
            ],
            title: 'history_tours_orders',
            translate: 'История заказов туров'
        },
        {
            type: 'massive',
            prop:
            [
                {
                    type: 'OtherId',
                    prop: 'id_relax',
                    ref: 'relax',
                    translate: 'Айди отдыха'
                },
                {
                    type: 'object',
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
                    title: 'room',
                    translate: 'Номер'
                },
                {
                    type: 'object',
                    prop: 
                    [
                        {
                            type: 'number',
                            prop: 'adult',
                            translate: 'Взрослых'
                        },
                        {
                            type: 'number',
                            prop: 'child',
                            translate: 'Детей'
                        },
                        {
                            type: 'object',
                            prop: 
                            [
                                {
                                    type: 'boolean',
                                    prop: 'adult',
                                    translate: 'Для взрослого'
                                },
                                {
                                    type: 'boolean',
                                    prop: 'child',
                                    translate: 'Для ребенка'
                                }
                            ],
                            title: 'extra',
                            translate: 'Дополнительное место'
                        },
                    ],
                    title: 'number_of',
                    translate: 'Кол-во'
                },
                {
                    type: 'combobox',
                    prop: 'type_of_food',
                    translate: 'Тип питания',
                    items: [ 'bb', 'hb', 'fb']
                },
                {
                    type: 'date',
                    prop: 'date_arrival',
                    translate: 'Дата заезда'
                },
                {
                    type: 'date',
                    prop: 'date_leave',
                    translate: 'Дата выезда'
                },
                {
                    type: 'number',
                    prop: 'price',
                    translate: 'Цена'
                },
                {
                    type: 'combobox',
                    prop: 'status',
                    translate: 'Статус заказа',
                    items: [ 'Не оплаченно', 'Оплаченно половины суммы', 'Заказ оплачен' ]
                }
            ],
            title: 'relax_orders',
            translate: 'Заказы санаториев и пансионатов'
        },
        {
            type: 'massive',
            prop:
            [
                ////////////////////////
                {
                    type: 'OtherId',
                    prop: 'id_relax',
                    ref: 'relax',
                    translate: 'Айди отдыха'
                },
                {
                    type: 'OtherId',
                    prop: 'id_manager',
                    ref: 'relax',
                    translate: 'Айди менеджера'
                },
                {
                    type: 'object',
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
                    title: 'room',
                    translate: 'Номер'
                },
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
                        },
                        {
                            type: 'object',
                            prop: 
                            [
                                {
                                    type: 'boolean',
                                    prop: 'adult',
                                    translate: 'Для взрослого'
                                },
                                {
                                    type: 'boolean',
                                    prop: 'child',
                                    translate: 'Для ребенка'
                                }
                            ],
                            title: 'extra',
                            translate: 'Есть ли дополнительные'
                        },
                    ],
                    title: 'number_of',
                    translate: 'Кол-во мест'
                },
                {
                    type: 'combobox',
                    prop: 'type_of_food',
                    translate: 'Тип питания',
                    items: [ 'bb', 'hb', 'fb']
                },
                {
                    type: 'date',
                    prop: 'date_arrival',
                    translate: 'Дата заезда'
                },
                {
                    type: 'date',
                    prop: 'date_leave',
                    translate: 'Дата выезда'
                },
                {
                    type: 'number',
                    prop: 'price',
                    translate: 'Цена'
                }
            ],
            title: 'history_relax_orders',
            translate: 'История заказов санаторие и пансионатов'
        },
        {
            type: 'massive',
            prop:
            [
                //Copy object instead of create reference, this method increase speed, but add unnecesseary data
                //////////////////////////
                {
                    type: 'OtherId',
                    prop: 'id_cruise',
                    ref: 'cruises',
                    translate: 'Айди круиза'
                },
                {
                    type: 'object',
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
                                }
                            ],
                            title: 'number_of',
                            translate: 'Кол-во'
                        },
                        {
                            type: 'string',
                            prop: 'corpus',
                            translate: 'Палуба'
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
                        {
                            type: 'object',
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
                            translate: 'Начало круиза'
                        }
                    ],
                    title: 'room',
                    translate: 'Каюта'
                },
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
                        },
                        {
                            type: 'object',
                            prop: 
                            [
                                {
                                    type: 'boolean',
                                    prop: 'adult',
                                    translate: 'Для взрослого'
                                },
                                {
                                    type: 'boolean',
                                    prop: 'child',
                                    translate: 'Для ребенка'
                                }
                            ],
                            title: 'extra',
                            translate: 'Есть ли дополнительные'
                        },
                    ],
                    title: 'number_of',
                    translate: 'Кол-во мест'
                },
                {
                    type: 'combobox',
                    prop: 'type_of_food',
                    translate: 'Тип питания',
                    items: [ 'bb', 'hb', 'fb']
                },
                {
                    type: 'number',
                    prop: 'price',
                    translate: 'Цена'
                },
                {
                    type: 'combobox',
                    prop: 'status',
                    translate: 'Статус заказа',
                    items: [ 'Не оплаченно', 'Оплаченно половины суммы', 'Заказ оплачен' ]
                }
            ],
            title: 'cruises_orders',
            translate: 'Заказ круизов'
        },
        {
            type: 'massive',
            prop:
            [
                //Copy object instead of create reference, this method increase speed, but add unnecesseary data
                //////////////////////////
                {
                    type: 'OtherId',
                    prop: 'id_cruise',
                    ref: 'cruises',
                    translate: 'Айди круиза'
                },
                {
                    type: 'OtherId',
                    prop: 'id_manager',
                    ref: 'managers',
                    translate: 'Айди менеджера'
                },
                {
                    type: 'object',
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
                                }
                            ],
                            title: 'number_of',
                            translate: 'Кол-во'
                        },
                        {
                            type: 'string',
                            prop: 'corpus',
                            translate: 'Палуба'
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
                        {
                            type: 'object',
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
                            translate: 'Начало круиза'
                        }
                    ],
                    title: 'room',
                    translate: 'Каюта'
                },
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
                        },
                        {
                            type: 'object',
                            prop: 
                            [
                                {
                                    type: 'boolean',
                                    prop: 'adult',
                                    translate: 'Для взрослого'
                                },
                                {
                                    type: 'boolean',
                                    prop: 'child',
                                    translate: 'Для ребенка'
                                }
                            ],
                            title: 'extra',
                            translate: 'Есть ли дополнительные'
                        },
                    ],
                    title: 'number_of',
                    translate: 'Кол-во мест'
                },
                {
                    type: 'combobox',
                    prop: 'type_of_food',
                    translate: 'Тип питания',
                    items: [ 'bb', 'hb', 'fb']
                },
                {
                    type: 'number',
                    prop: 'price',
                    translate: 'Цена'
                }
            ],
            title: 'history_cruises_orders',
            translate: 'История заказов круизов'
        },
    ],
    'managers': [
        {
            type: 'ObjectId',
            prop: '_id',
            translate: 'Айди',
            hint: 'Идентификатор объекта'
        },
        //Authorization
        {
            type: 'string',
            prop: 'login',
            translate: 'Логин',
            secret: true
        },
        {
            type: 'string',
            prop: 'password',
            translate: 'Пароль',
            secret: true
        },
        //
        {
            type: 'string',
            prop: 'name',
            translate: 'Имя'
        },
        {
            type: 'string',
            prop: 'surname',
            translate: 'Фамилия'
        },
        {
            type: 'string',
            prop: 'middle_name',
            translate: 'Отчество'
        },
        {
            type: 'string',
            prop: 'email',
            translate: 'Электронная почта'
        },
        {
            type: 'string',
            prop: 'telephone',
            translate: 'Телефон'
        },
        {
            type: 'combobox',
            prop: 'gender',
            translate: 'Пол',
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
// db.countries.insertOne({ name: 'Россия', description: 'Описание великой и ужасной' });
// //
// const country = db.countries.findOne();
// db.localities.insertOne(
// {
//     name: 'Санкт-Петербург',
//     description: 'Наш замечательный город',
//     id_country: new DBRef('countries', ObjectId(country._id))
// });
// const locality = db.localities.findOne();
// const user = db.user.findOne();
// const manager = db.user.findOne();
// //
// db.relax.insertOne(
// {
//     name: 'Белые ночи',
//     description: 'Санаторий предлагает своим пациентам не только комплексную медицинскую помощь, комфортное размещение, индивидуальный подход и качественное обслуживание, но и разнообразное, вкусное и полезное питание, разработанное специалистами отделения диетологии санатория.',
//     id_locality: new DBRef('localities', ObjectId(locality._id)),
//     type: 'Санаторий',
//     services:
//     {
//         available: [
//             {
//                 id: 0,
//                 icon: 'glass',
//                 text: 'Алкоголь'
//             }
//         ],
//         common: [
//             {
//                 id: 0,
//                 icon: 'glass',
//                 text: 'Алкоголь'
//             }
//         ],
//         rooms: [
//             {
//                 id: 0,
//                 icon: 'glass',
//                 text: 'Алкоголь'
//             }
//         ]
//     },
//     stars: 4,
//     images: [
//         {
//             src: 'http://rusnka.ru/wp-content/uploads/2018/06/22.jpg',
//             id: 0
//         }
//     ],
//     rooms: [
//         {
//             id: 0,
//             category: 'Комфорт',
//             number_of: 
//             {
//                 seats:
//                 {
//                     adult: 2,
//                     child: 1
//                 },
//                 rooms: 
//                 {
//                     available: 50,
//                     occupied: 0
//                 }
//             },
//             corpus: 'Главный',
//             prices: 
//             {
//                 usual: 15000,
//                 on_weekends: 17500,
//                 extra: 
//                 {
//                     adult: 1000,
//                     child: 1500
//                 }
//             },
//             pets: false,
//             prices_of_food:
//             {
//                 bb: 0,
//                 hb: 100,
//                 fb: 150
//             },
//             image: 'https://www.spa-kluchi.ru/upload/iblock/945/9459b379fa4860d2dfeeabc4c57a3c4d.jpg'
//         }
//     ],
//     adress: 'Народная 46',
//     points: 
//     {
//         x: 59,
//         y: 49
//     },
//     comments: []
// });


