import React from 'react';
import Link from 'next/link';
//
import AdminLayout from '../../layouts/AdminLayout.jsx';
//
import classes from './index.module.scss';

const Admin = () => {

    return (
        <AdminLayout title='Панель администратора'>
            <div className={classes.title}>
                <h1>CMS сайта Ellenline</h1>
                <span>Здесь вы можете изменить, добавить или удалить контент на странице</span>
            </div>
        </AdminLayout>
    )
}

export default Admin;
