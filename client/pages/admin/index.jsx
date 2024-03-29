import React from 'react';
//
import AdminLayout from '../../layouts/AdminLayout.jsx';
//
import classes from './index.module.scss';

//Начальная страница админ-панели
const Admin = () => {

    return (
        <AdminLayout title='Панель администратора'>
            <div className={classes.title}>
                <h1>Админ-панель сайта Ellenline</h1>
                <span>Здесь вы можете изменить, добавить или удалить контент на странице</span>
            </div>
        </AdminLayout>
    )
}

export default Admin;
