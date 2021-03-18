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
}