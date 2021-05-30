import React from 'react';
//
import DatabaseLayout from './DatabaseLayout.jsx';
//
import Global from '../../global.js';
import classes from './index.module.scss';

const Db = (props) => {
    //Массив для создания списка слева меню, получение перевода названия коллекции
    const items = props.items ?
        props.items.map((element) => { return { title: Global.GetTranslate(element), href: element } }) 
        : [];

    return(
        <DatabaseLayout items={items}>
            <div className={classes.title}>
                <h1>База данных</h1>
                <span>Здесь вы можете изменить, добавить или удалить данные из БД</span>
            </div>
        </DatabaseLayout>
    )
}

//Функция NextJS запускающаяся при сборке сайта, 
//на основе путей из getStatisPaths делает запросы к серверу, 
//и передает ответы главному компоненту через props
export async function getStaticProps(router) {
    //Запрос к бд для получения названия коллекции
    const collections = await (await fetch(Global.url + '/api/db/')).json();

    return {
        props: {
            items: collections
        }
    }
}

export default Db;