import { DBRef, ObjectID } from 'bson';

export default class Global {
    static url = 'http://localhost:3000';

    static resorts = {
        'relax': [ 'pensionats', 'sanatoriums' ],
        'cruises': [ 'river', 'marine' ],
        'tours': [ 'oneday', 'multiday' ]
    }

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

    static FirstLetter(word) {
        return word[0].toUpperCase() + word.slice(1, word.length);
    }

    static ConvertToDBRef(ref, id) {
        return new DBRef(ref, ObjectID(id));
    }
    
    //Вызывает setValues, функцию заполняющую значения айди из другой коллекции или из внутреннего массива в select
    static GetIds(setValues, url, field = '_id') {
        fetch(`${Global.url}/api/db/${url}`)
        .then((res) => 
        {
            console.log('Успех');
            return res.json();
        })
        .then((res) => 
        {
            const new_res = res.map((element) => {
                return element[field];
            });
            setValues(new_res);
        })
        .catch((err) => 
        {
            console.log('Ошибка');
            return err.json();
        })
        .catch((err) => 
        {
            console.log(err);
        });
    }
}