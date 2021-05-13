import React, {useState} from 'react'; 
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
    const [cookies, setCookie] = useCookies('account');

    function GenerateContent() {
        return <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header/>
            <AsideHeader className={classes.header}/>
            <main className={classes.main}>
                {children}
                <Footer/>
            </main>
        </>
    }

    function GenerateNotification() {
        const account = cookies.account;

        if(!account)
            return <Notification preset='ClientAuthorization'>
                Добро пожаловать! 
                Вы здесь впервые? 
                Создайте аккаунт и войдите, 
                под вашими учетными данными 
                Это необходимо для заказа!
            </Notification>
        else if(account.role == 'users')
        {
            //Запрос во избежании несоотвествия данных
            //...
            return <Notification preset='ClientPersonalAccount'>
                Добро пожаловать!
                {account.name + ' ' + account.surname + ' ' + account.middle_name}
            </Notification>;
        }
    }

    return(
        <>
            {GenerateContent()}
            {GenerateNotification()}
        </>
    )

}

export default ClientLayout;