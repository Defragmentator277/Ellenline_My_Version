import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
//
import AdminHeader from '../components/CommonAdmin/Header/AdminHeader.jsx';
import Notification from '../components/Common/Notification/Notification.jsx';
import ModalWindow from '../components/Common/ModalWindow/ModalWindow.jsx';
//
import Global from '../pages/global.js';
import classes from './AdminLayout.module.scss';

//Обертка для страницы сотрудников
const AdminLayout = (props) => {
    //По умолчанию название фирмы
    const title = props.title || 'Эллинлайн';
    //Модульное окно
    const [window, setWindow] = useState();
    //Окно уведомлений
    const [notification, setNotification] = useState();
    //Получение данных о аккаунте сотрудника из Cookie
    const account_worker = Global.getCookie('account_worker');

    //Проверка пользователя на авторизацию
    function CheckAccount() {
        function OnChaingeModalWindow(e, value) {
            const login = value.login;
            const password = value.password;
            //Правильное конвертирование роли сотрудника
            if(value.role == 'Менеджер')
                value.role = 'managers';
            else if(value.role == 'Администратор')
                value.role = 'admins';
            const role = value.role;
            //Запрос на авторизацию
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
                    //В случаи успеха установка значения Cookie аккаунта работника, и изменение состояния уведомления
                    alert('Вы успешно авторизовались!');
                    res = res[0];
                    Global.setCookie('account_worker', { _id: res._id, login: res.login, password: res.password, role: role });
                    setNotification({ preset: 'AdminPersonalAccount', text: `Добро пожаловать! ${res.name + ' ' + res.surname + ' ' + res.middle_name}` });
                }
                else
                {
                    //Если авторизация не прошла успешно, вызов окна с предупреждением, затем перезагрузка страницы
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
        //Проверка существует ли акканут сотрудника
        if(!account_worker)
            //Изменение состояния модульного окна
            setWindow(
            {
                title: 'Авторизируйтесь',
                preset: 'AdminAuthorization',
                buttons: { close: false },
                modal_overlay: classes.modal_overlay,
                //Функция вызывается перед закрытием окна
                onChainge: OnChaingeModalWindow
            });
        else
        {
            //Запрос во избежании несоотвествия данных Cookie и БД
            fetch(`${Global.url}/api/authentication?login=${account_worker.login}&password=${account_worker.password}&type_of_users=${account_worker.role}`, { method: 'POST' })
            .then((res) => {
                console.log('Успех!');
                return res.json();
            })
            .then((res) => {
                res = res[0];
                if(res)
                {
                    //Занесение обновленных данных в Cookie
                    Global.setCookie('account_worker', { _id: res._id, login: res.login, password: res.password, role: account_worker.role });
                    //Изменение состояния уведомления
                    setNotification({ preset: 'AdminPersonalAccount', text: `Добро пожаловать! ${res.name + ' ' + res.surname + ' ' + res.middle_name}` });
                }
                else
                //Если такого аккаунта с логином и паролем нету, удалить Cookie
                    Global.setCookie('account_worker', 'undefined');
            })
            .catch((err) => {
                console.log('Ошибка!');
                return err.json();
            })
            .catch((err) => {
                console.log(err);
                //В случаи ошибка удалить Cookie
                Global.setCookie('account_worker', 'undefined');
            })
            // .finally(() => {
            //     location.reload();
            // })
        }
    }

    //CheckAccount вызывается здесь только в первый рендер компонента
    useEffect(() => 
    {
        CheckAccount();
    }, [])
    
    //Генерация основной страницы
    function GenerateContent() {
        //Создание окна уведомления для этого компонента
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

    //Создание модульного аккаунта для этого компонента
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