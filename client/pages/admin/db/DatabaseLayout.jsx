import React from 'react';
//
import AdminLayout from '../../../layouts/AdminLayout.jsx';
import AsideMenu from '../../../components/CommonAdmin/AsideMenu/AsideMenu.jsx';
//
import Local from './local.js';
import classes from './DatabaseLayout.module.scss';

const DatabaseLayout = ({ children, title = 'База данных'}) => {


    return(
        <AdminLayout title={title}>
            <div className={classes.main}>
                <AsideMenu items={Local.items} root='db' className={classes.aside}/>
                <div className={classes.article}>
                    {children}
                </div>
            </div>
        </AdminLayout>
    )
}

export default DatabaseLayout;