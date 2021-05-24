import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
//
import AdminHeader from '../components/CommonAdmin/Header/AdminHeader.jsx';
import Notification from '../components/Common/Notification/Notification.jsx';
import ModalWindow from '../components/Common/ModalWindow/ModalWindow.jsx';
//
import Global from '../pages/global.js';
import classes from './AdminLayout.module.scss';

const AdminLayout = (props) => {
    const title = props.title || 'Эллинлайн';
    const [window, setWindow] = useState();
    const [notification, setNotification] = useState();
    //
    const account_worker = Global.getCookie('account_worker');
    console.log(account_worker);

    function CheckAccount() {
        function OnChaingeModalWindow(e, value) {
            const login = value.login;
            const password = value.password;
            if(value.role == 'Менеджер')
                value.role = 'managers';
            else if(value.role == 'Администратор')
                value.role = 'admins';
            const role = value.role;
            //
            fetch(`${Global.url}/api/authentication?login=${login}&password=${password}&type_of_users=${role}`,
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
                    // res[0].role = role;
                    res = res[0];
                    Global.setCookie('account_worker', { _id: res._id, login: res.login, password: res.password, role: role });
                    setNotification({ preset: 'AdminPersonalAccount', text: `Добро пожаловать! ${res.name + ' ' + res.surname + ' ' + res.middle_name}` });
                }
                else
                {
                    alert('Сотрудника с таким логином и паролем не существует!');
                    location.reload();
                }
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
        //
        if(!account_worker)
            setWindow(
            {
                title: 'Авторизируйтесь',
                preset: 'AdminAuthorization',
                buttons: { close: false },
                modal_overlay: classes.modal_overlay,
                onChainge: OnChaingeModalWindow
            });
        else
        {
            //Запрос во избежании несоотвествия данных
            //...
            fetch(`${Global.url}/api/authentication?login=${account_worker.login}&password=${account_worker.password}&type_of_users=${account_worker.role}`, { method: 'POST' })
            .then((res) => {
                console.log('Успех!');
                return res.json();
            })
            .then((res) => {
                res = res[0];
                if(res)
                {
                    Global.setCookie('account_worker', { _id: res._id, login: res.login, password: res.password, role: account_worker.role });
                    setNotification({ preset: 'AdminPersonalAccount', text: `Добро пожаловать! ${res.name + ' ' + res.surname + ' ' + res.middle_name}` });
                }
                    
                // setAccountContext({ ...res, role: AccountContext.role });
            })
            .catch((err) => {
                console.log('Ошибка!');
                return err.json();
            })
            .catch((err) => {
                console.log(err);
                // setAccountContext(undefined);
                Global.setCookie('account_worker', 'undefined');
            })
        }
    }

    useEffect(() => 
    {
        CheckAccount();
    }, [])
    
    function GenerateContent() {
        function GenerateNotification() {
            return notification ? <Notification {...notification}>{notification.text}</Notification> : '';
        }

        return account_worker ? <>
            <Head>
                <title>{title}</title>
            </Head>
            <AdminHeader/>
            <main className={classes.main}>
                {props.children}
            </main>
            {GenerateNotification()}
        </> : <Head>
            <title>Авторизация</title>
        </Head>;
    }

    function GenerateModalWindow() {
        return window ? <ModalWindow {...window} onClose={() => setWindow()}/> : '';
    }

    return (
        <>
            {GenerateContent()}
            {GenerateModalWindow()}
        </>
    )
}

export default AdminLayout;