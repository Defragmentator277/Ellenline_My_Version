import React, {Component, useEffect, useState} from 'react';
import { useRouter } from 'next/router'; 
//Jsx
import ClientLayout from '../../../../layouts/ClientLayout.jsx';
import ListItem from './ListItem.jsx';
//Js, scss
import Global from '../../../global.js';
import classes from './index.module.scss';

const Resorts = (props) => {
    //Нужен для маршрутизации по страницам
    const router = useRouter();
    //Критерии поиска
    const [condition, setCondition] = useState();
    //Название коллекции
    const type = props.type;
    //Тип отдыха
    const resort = props.resort; 
    //Карточик туров, санаторие, пансионатов или круизов
    const items = props.items;

    //Установка критериев поиска при изменении состояни router`a
    useEffect(() => {
        setCondition(router.query.condition && JSON.parse(router.query.condition));
    }, [router]);

    //Генерация карточек в зависимости от критериев поиска
    function GenerateItems() {
        const elements = [];
        //В случаи если есть карточки
        if(items && items.length != 0)
        {
            for(let i = 0; i < items.length; i++)
            {
                let element = items[i];
                element.id = element._id;
                //Проверка на соотвествия условию
                if(condition)
                {
                    //Имени
                    if(condition.name && !new RegExp(condition.name, 'i').test(element.title))
                        continue;
                    //Кол-ва звезд
                    if(condition.stars && condition.stars == element.stars)
                        continue;
                    //Города
                    if(condition.locality && condition.locality._id != element.locality._id)
                        continue;
                    //Или страны
                    else if(condition.country && condition.country._id.$id != element.locality.id_country.$id)
                        continue;
                    //Диапазона цены
                    const price = condition.price;
                    if((price.min && element.min_price < price.min) || 
                       (price.max && element.min_price > price.max))
                        continue;
                }
                //Конвертирование в ListItem
                elements.push(<ListItem category={resort}
                                        path={type}
                                        {...element}/>);
            }
        }
        return elements;
    }

    return (
        <ClientLayout title={Global.GetConvert(type)[resort]}>
            <div className={classes.list}>
                {GenerateItems()}           
            </div>
        </ClientLayout>
    )
}

//Здесь заранее задаются пути т.к. их всего три: (вот они слева направо) в файле Global
//Функция NextJS запускающаяся при сборке сайта, 
//возвращает все пути для данного динамического маршрута
export async function getStaticPaths() {
    //В этом случаи я получаю все типы отдыха и генерирую соотвествующие страницы
    const paths = [];
    //Конвертирование в пути
    Object.keys(Global.resorts).forEach((prop) => {
        Global.resorts[prop].forEach((element) => {
            paths.push({ params: { type: prop, resort: element } });
        })
    });
    //
    return {
        paths: paths,
        fallback: true
    };
}

//Функция NextJS запускающаяся при сборке сайта, 
//на основе путей из getStatisPaths делает запросы к серверу, 
//и передает ответы главному компоненту через props
export async function getStaticProps(router) {
    //Здесь я получаю информацию о коллекции и ее типе
    const type = router.params.type;
    const resort = router.params.resort;
    //А затем происходит запрос на сервер для получение информации 
    const res = await fetch(Global.url + '/api/resorts/'+ type + '/' + resort);
    const items = await res.json();
    //
    return {
        props: {
            type: type,
            resort: resort,
            items: items
        }
    };
}

export default Resorts;
