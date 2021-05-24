import React, {useEffect, useState} from 'react'; 
import Head from 'next/head';
//
import Header from '../components/Common/Header/Header';
import Footer from '../components/Common/Footer/Footer';
import Footer_v2 from '../components/Common/Footer_v2/Footer';
import AsideHeader from '../components/Common/Header/AsideHeader';
import ModalWindow from '../components/Common/ModalWindow/ModalWindow.jsx';
import Notification from '../components/Common/Notification/Notification.jsx';
//
import Global from '../pages/global.js';
import classes from './ClientLayout.module.scss';

const ClientLayout = ({ children, title = 'Эллинлайн' }) => {
    const [notification, setNotification] = useState();
    // notification: { preset: ..., text }
    const account_user = Global.getCookie('account_user');

    console.log(account_user);

    function CheckAccount() {
        //
        const authorization = { preset: 'ClientAuthorization', text: 'Добро пожаловать! Вы здесь впервые? Создайте аккаунт и войдите, под вашими учетными данными Это необходимо для заказа!' };


        if(!account_user)
            setNotification(authorization);
        else
        {
            //Запрос во избежании несоотвествия данных
            //...
            fetch(`${Global.url}/api/authentication?login=${account_user.login}&password=${account_user.password}&type_of_users=${'users'}`, { method: 'POST' })
            .then((res) => {
                console.log('Успех!');
                return res.json();
            })
            .then((res) => {
                res = res[0];
                if(res)
                {
                    Global.setCookie('account_user', { _id: res._id, login: res.login, password: res.password });
                    // setCookie(null, 'account_user', JSON.stringify({ _id: res.id, login: res.login, password: res.password }), { path: '/' });
                    // setAccountContext({...res});
                    //
                    setNotification({ preset: 'ClientPersonalAccount', text: `Добро пожаловать! ${res.name + ' ' + res.surname + ' ' + res.middle_name}`});
                }
            })
            .catch((err) => {
                console.log('Ошибка!');
                return err.json();
            })
            .catch((err) => {
                console.log(err);
                Global.setCookie('account_user', 'undefined');
                // setCookie(null, 'account_user', 'undefined', { path: '/' });
                // setAccountContext();
                //
                setNotification(authorization);
            })
        }
    }

    useEffect(() => 
    {
        CheckAccount()
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
        </>;
    }

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