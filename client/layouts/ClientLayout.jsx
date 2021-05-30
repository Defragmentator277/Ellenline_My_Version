import React, {useEffect, useState} from 'react'; 
import Head from 'next/head';
//
import Header from '../components/Common/Header/Header';
import Footer from '../components/Common/Footer/Footer';
import AsideHeader from '../components/Common/Header/AsideHeader';
import Notification from '../components/Common/Notification/Notification.jsx';
//
import Global from '../pages/global.js';
import classes from './ClientLayout.module.scss';

//Обертка для страницы пользователей
const ClientLayout = ({ children, title = 'Эллинлайн' }) => {
    
    //Окно уведомлений
    const [notification, setNotification] = useState();
    // notification: { preset: ..., text }
    //Получение данных о аккаунте пользователя из Cookie
    const account_user = Global.getCookie('account_user');

    //Проверка пользователя на авторизацию
    function CheckAccount() {
        //
        const authorization = { preset: 'ClientAuthorization', text: 'Добро пожаловать! Вы здесь впервые? Создайте аккаунт и войдите, под вашими учетными данными Это необходимо для заказа!' };

        //Проверка существует ли акканут пользователя
        if(!account_user)
            //Изменение состояния окна уведомлений
            setNotification(authorization);
        else
        {
            //Запрос во избежании несоотвествия данныхы
            fetch(`${Global.url}/api/authentication?login=${account_user.login}&password=${account_user.password}&type_of_users=${'users'}`, { method: 'POST' })
            .then((res) => {
                console.log('Успех!');
                return res.json();
            })
            .then((res) => {
                res = res[0];
                if(res)
                {
                    //Занесение обновленных данных в Cookie
                    Global.setCookie('account_user', { _id: res._id, login: res.login, password: res.password });
                    //Изменение состояния уведомления
                    setNotification({ preset: 'ClientPersonalAccount', text: `Добро пожаловать! ${res.name + ' ' + res.surname + ' ' + res.middle_name}`});
                }
                else
                //Если такого аккаунта с логином и паролем нету, удалить Cookie
                    Global.setCookie('account_user', 'undefined');
            })
            .catch((err) => {
                console.log('Ошибка!');
                return err.json();
            })
            .catch((err) => {
                console.log(err);
                //В случаи ошибка удалить Cookie
                Global.setCookie('account_user', 'undefined');
                //Изменение состояния окна уведомлений
                setNotification(authorization);
            })
        }
    }

    //CheckAccount вызывается здесь только в первый рендер компонента
    useEffect(() => 
    {
        CheckAccount()
    }, []);

    //Генерация основной страницы
    function GenerateContent() {
        return <> 
            <Head>
                <title>{title}</title>
            </Head>
            <Header/>
            <AsideHeader className={classes.header}/>
            <main className={classes.main}>
                {children}
                {/*  */}
                <Footer/>
            </main>
        </>;
    }

    //Генерация окна уведомлений
    function GenerateNotification() {
        return notification ? <Notification {...notification}>{notification.text}</Notification>: '';
    }

    return(<>
        {GenerateContent()}
        {GenerateNotification()}
    </>
    )
}

export default ClientLayout;