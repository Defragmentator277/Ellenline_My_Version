import React, {useEffect, useState} from 'react'; 
import Head from 'next/head';
import { useCookies } from 'react-cookie';
//
import Header from '../components/Common/Header/Header';
import Footer from '../components/Common/Footer/Footer';
import AsideHeader from '../components/Common/Header/AsideHeader';
import ModalWindow from '../components/Common/ModalWindow/ModalWindow.jsx';
import Notification from '../components/Common/Notification/Notification.jsx';
//
import Global from '../pages/global.js';
import classes from './ClientLayout.module.scss';
//Контекст
import Context from './ClientLayoutContext.js';

const ClientLayout = ({ children, title = 'Эллинлайн' }) => {
    const [notification, setNotification] = useState();
    // notification: { preset: ..., text }
    const [cookies, setCookie, removeCookie] = useCookies('account');

    function SetStateNotification() {
        const account = cookies.account;
        //
        const authorization = { preset: 'ClientAuthorization', text: 'Добро пожаловать! Вы здесь впервые? Создайте аккаунт и войдите, под вашими учетными данными Это необходимо для заказа!' };

        if(!account)
            setNotification(authorization);
        else if(account.role == 'users')
        {
            //Запрос во избежании несоотвествия данных
            //...
            fetch(`${Global.url}/api/authentication?login=${account.login}&password=${account.password}&type_of_users=${'users'}`, { method: 'POST' })
            .then((res) => {
                console.log('Успех!');
                return res.json();
            })
            .then((res) => {
                res = res[0];
                if(!res)
                    throw new Error();
                setCookie('account', { ...res, role: 'users'});
                //
                setNotification({ preset: 'ClientPersonalAccount', text: `Добро пожаловать! ${res.name + ' ' + res.surname + ' ' + res.middle_name}`});
            })
            .catch((err) => {
                console.log('Ошибка!');
                return err.json();
            })
            .catch((err) => {
                console.log(err);
                removeCookie('account');
                //
                setNotification(authorization);
            })
        }
    }

    useEffect(() => {
        SetStateNotification();
    }, []);

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
        </>
    }

    function GenerateNotification() {
        return notification ? <Notification {...notification}>{notification.text}</Notification>: '';
    }

    return(
        <>
            {GenerateContent()}
            {GenerateNotification()}
        </>
    )

}

export default ClientLayout;