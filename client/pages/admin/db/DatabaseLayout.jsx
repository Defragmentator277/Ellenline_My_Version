import React from 'react';
import { GetStaticProps } from 'next';
//
import AdminLayout from '../../../layouts/AdminLayout.jsx';
import AsideMenu from '../../../components/CommonAdmin/AsideMenu/AsideMenu.jsx';
//
import Global from '../../global.js';
import Local from './local.js';
import classes from './DatabaseLayout.module.scss';

const DatabaseLayout = (props) => {
    const children = props.children;
    const title = props.title || 'База данных';
    const items = props.items;

    return(
        <AdminLayout title={title}>
            <div className={classes.main}>
                <AsideMenu items={items} root='db' className={classes.aside}/>
                <div className={classes.article}>
                    {children}
                </div>
            </div>
        </AdminLayout>
    )
}

export default DatabaseLayout;