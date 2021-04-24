import React, { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import Head from 'next/head';
//
import AdminHeader from '../components/CommonAdmin/Header/AdminHeader.jsx';
import ModalWindow from '../components/Common/ModalWindow/ModalWindow.jsx';
//
import Global from '../pages/global.js';
import classes from './AdminLayout.module.scss';
//Контекст
import Context from './AdminLayoutContext.js';

const AdminLayout = (props) => {
    const title = props.title || 'Эллинлайн';
    const [cookies, setCookie, removeCookie] = useCookies('admin_account');

    function GenerateContent() {
        return <>
           <Head>
               <title>{title}</title>
           </Head>
           <AdminHeader/>
           <main className={classes.main}>
               {props.children}
           </main>
       </>;
    }

    function GenerateAuthentication() {

        function OnCloseModalWindow(e, value) {
            const login = value.login;
            const password = value.password;
            fetch(`${Global.url}/api/authentication?login=${login}&password=${password}&type_of_users=${'admins'}`,
            { method: 'POST' })
            .then((res) => 
            {
                console.log('Успех');
                return res.json();
            })
            .then((res) => 
            {
                if(res[0])
                {
                    alert('Вы успешно авторизовались!');
                    setCookie('admin_account', value);
                    location.reload();
                }
                else
                    alert('Сотрудника с таким логином и паролем не существует!');
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

        if(cookies.admin_account)
            return;
        else
            return <ModalWindow 
            title='Авторизируйтесь'
            preset='AdminAuthorization' 
            buttons={{ close: false }}
            onClose={OnCloseModalWindow}/>;
    }

    return (
        <>
            {GenerateContent()}
            {GenerateAuthentication()}
        </>
    )
}

export default AdminLayout;