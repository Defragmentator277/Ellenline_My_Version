export default class Global {
    static url = 'http://192.168.1.36:3000';

    //Возможно стоит поместить этот массив в БД, а может нет :/
    static GetConvert(type) {
        switch(type)
        {
            case "relax":
                return {
                    'name': 'Отдых',
                    'pensionats': 'Пансионаты', 
                    'sanatoriums': 'Санатории',
                };
            case "cruises":
                return {
                    'name': 'Круизы',
                    'river': 'Речные',
                    'marine': 'Морские',
                };
            case "tours":
                return {
                    'name': 'Туры',
                    'oneday': 'Однодневные',
                    'multiday': 'Многодневные'
                };
            default:
                console.log(type + " don`t support")
                return 'ERROR';
        }
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

    static FirstLetter(word) {
        return word[0].toUpperCase() + word.slice(1, word.length);
    }
}