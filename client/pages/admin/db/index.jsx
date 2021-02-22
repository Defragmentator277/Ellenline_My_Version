import React from 'react';
//
import DatabaseLayout from './DatabaseLayout.jsx';
//
import classes from './index.module.scss';

const Db = () => {

    return(
        <DatabaseLayout>
            <div className={classes.title}>
                <h1>База данных</h1>
                <span>Здесь вы можете изменить, добавить или удалить данные из БД</span>
            </div>
        </DatabaseLayout>
    )
}

export default Db;