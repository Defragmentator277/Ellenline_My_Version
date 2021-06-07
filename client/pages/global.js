import { DBRef, ObjectID } from 'bson';

export default class Global {
    static url = 'http://185.251.91.231:4007';
    // static url = 'http://192.168.1.34:3000';

    static resorts = {
        'relax': [ 'pensionats', 'sanatoriums' ],
        'cruises': [ 'river', 'marine' ],
        'tours': [ 'oneday', 'multiday' ]
    }

    static GetTranslate(word) {
        switch(word)
        {
            case 'admins':
                return 'Администраторы';
            case 'countries':
                return 'Страны';
            case 'cruises':
                return 'Круизы';
            case 'localities':
                return 'Города';
            case 'managers':
                return 'Менеджеры';
            case 'motorships':
                return 'Суда';
            case 'relax':
                return 'Санатории, Пансионаты';
            case 'tours':
                return 'Туры';
            case 'users':
                return 'Пользователя';
        }
    }

    //Возможно стоит поместить этот массив в БД, а может нет :/
    static GetConvert(type) {
        switch(type)
        {
            case "relax":
                return {
                    'name': 'Отдых',
                    'pensionats': 'Пансионат', 
                    'sanatoriums': 'Санаторий',
                };
            case "cruises":
                return {
                    'name': 'Круизы',
                    'river': 'Речной',
                    'marine': 'Морской',
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

    static GetLookupPipeline(path_orders, id_field, from_collection, end_field)
    {
        return [
            //Get tours_orders info
            { $unwind: 
            { 
                path: '$' + path_orders,
                preserveNullAndEmptyArrays: true
            }},
            { $set: { [path_orders]: { $ifNull: [ '$' + path_orders, [] ] } } },
            { $set: { [path_orders + '.' + id_field]: { $arrayElemAt: [ { $objectToArray: '$' + path_orders + '.' + id_field }, 1 ] } } }, 
            { $set: { [path_orders + '.' + id_field]: { $toObjectId: '$' + path_orders + '.' + id_field + '.v' } } } ,
            //
            { $lookup:
            {
                from: from_collection,
                localField: path_orders + '.' + id_field,
                foreignField: '_id',
                as: path_orders + '.' + id_field
            }},
            { $set: { [path_orders + '.' + end_field]: { $arrayElemAt: [ '$' + path_orders + '.' + id_field, 0 ]} } },
            { $unset: path_orders + '.' + id_field }
        ]
    }

    //Конвертирование элемента для модального окна
    static ConvertToFieldsAddButtonMassive(element) {
        switch(element.type)
        {
            case 'massive':
                //В случаи если это массив значит нужно добавить кнопку
                //element.prop = [ ... ]
                // console.log(element.prop);
                return {
                    type: 'button',
                    prop: 
                    {
                        title: 'Добавить',
                        fields: element.prop.map((element) => Global.ConvertToFieldsAddButtonMassive(element))
                    },
                    title: element.title,
                    translate: element.translate,
                    min: element.min
                };
            //В случаи массива или объекта
            case 'object':
                let prop = element.prop;
                if(Array.isArray(prop))
                    return {
                        type: 'object',
                        prop: prop.map((element) => Global.ConvertToFieldsAddButtonMassive(element)),
                        title: element.title,
                        translate: element.translate,
                        min: element.min
                    };
                else
                    //В случаи если это объект рекурсивно добираемся до свойств
                    return ConvertToFieldsAddButtonMassive(prop);
            case 'OtherId':
                element.getValues = (setValues) => Global.GetIds(setValues, element.ref); 
                return element;
            case 'InnerId':
                // const str
                console.log(str);
                element.getValues = (setValues) => Global.GetIds(setValues, str + `&key=${element.ref}`, 'id');
                return element;
            default:
                return element;
        }
    }

    static getCookie(name, json = true) {
        let matches;
        if(process.browser)
            matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
        let res = matches ? decodeURIComponent(matches[1]) : undefined;
        try
        {
            if(json)
                return JSON.parse(res);
            return res;
        }
        catch
        {
            return undefined;
        }
    }
      
    static setCookie(name, value, options = {}) {
        console.log('setCookie');
        //
        if(typeof value === 'object')
            value = JSON.stringify(value);
        //
        options = {
            path: '/',
            // add other defaults here if necessary
            ...options
        };
        //
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
        //
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        //
        for (let optionKey in options) 
        {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) 
            {
                updatedCookie += "=" + optionValue;
            }
        }
        //
        if(process.browser)
            document.cookie = updatedCookie;
        console.log(updatedCookie);
    }
      
      
    static deleteCookie(name) {
        setCookie(name, "", {
            'max-age': -1
        })
    }

    static CorrectArray(element, order) {
        if(Object.keys(element[order][0]).length == 0)
            element[order] = [];
    }
    
    static CorrectArraysOfOrders(array)
    {
        //
        return array.map((element) => {
            Global.CorrectArray(element, 'tours_orders');
            Global.CorrectArray(element, 'relax_orders');
            Global.CorrectArray(element, 'cruises_orders');
            Global.CorrectArray(element, 'history_tours_orders');
            Global.CorrectArray(element, 'history_relax_orders');
            Global.CorrectArray(element, 'history_cruises_orders');
            //
            return element;
        });
    }
}
