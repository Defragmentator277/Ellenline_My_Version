import React from 'react';
import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';
//
import AdminLayout from '../../../layouts/AdminLayout.jsx';
import AsideMenu from '../../../components/CommonAdmin/AsideMenu/AsideMenu.jsx';
import ModalWindow from '../../../components/Common/ModalWindow/ModalWindow.jsx';
//
import Global from '../../global.js';
import classes from './DatabaseLayout.module.scss';
import { Router } from 'next/router';

const DatabaseLayout = (props) => {
    const router = useRouter();
    const cookies = parseCookies();
    //
    const children = props.children;
    const title = props.title || 'База данных';
    const items = props.items;
    //
    const account_worker = Global.getCookie(cookies, 'account_worker');

    function GenerateContent() {    
        if(account_worker && account_worker.role == 'admins')
            return <div className={classes.main}>
                <AsideMenu items={items} root='db' className={classes.aside}/>
                <div className={classes.article}>
                    {children}
                </div>
            </div>
        else
            return <ModalWindow title='Ошибка!' onClose={() => { router.push('/admin') }}>
                <div className={classes.text}>
                    У вас нет прав на просмотр или изменения БД!
                </div>
            </ModalWindow>
    }

    return(
        <AdminLayout title={title}>
            {GenerateContent()}
        </AdminLayout>
    )
}

export default DatabaseLayout;