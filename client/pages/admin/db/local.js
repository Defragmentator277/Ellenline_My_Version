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
        }
    ];
    
    get items() {
        return this.items;
    }

    //Здесь указываються колонки которые будут выводиться в таблицу
    static GetColumns(type)
    {
        switch(type)
        {
            case 'cities':
                return [ '_id', 'name', 'description'];
            case 'countries':
                return [ '_id', 'name', 'description'];
            case 'resorts':
                return [ '_id', 'name', 'services', 'stars',
                         'description', 'images', 'id_countries', 'rooms',
                         'prices_of_food', 'adress', 'id_cities', 'points' ];
        }
    }
}