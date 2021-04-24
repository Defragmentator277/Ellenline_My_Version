import React from 'react';
//
import DatabaseLayout from './DatabaseLayout.jsx';
//
import Global from '../../global.js';
import classes from './index.module.scss';

const Db = (props) => {
    const items = props.items ?
        props.items.map((element) => { return { title: element, href: element } }) 
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

export async function getStaticProps(router) {
    //Запрос к бд для получения коллекции из mongoDB
    const collections = await (await fetch(Global.url + '/api/db/')).json();
    console.log(collections);

    return {
        props: {
            items: collections
        }
    }
}

export default Db;