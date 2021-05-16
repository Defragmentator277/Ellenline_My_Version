import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Head from 'next/head';
//
import AdminHeader from '../components/CommonAdmin/Header/AdminHeader.jsx';
import ModalWindow from '../components/Common/ModalWindow/ModalWindow.jsx';
//
import Global from '../pages/global.js';
import classes from './AdminLayout.module.scss';
//Контекст
import { AccountContextComponent } from './AdminLayoutContext.js';

const AdminLayout = (props) => {
    const title = props.title || 'Эллинлайн';
    const [window, setWindow] = useState();
    const [AccountContext, setAccountContext] = useState();
    // const [cookies, setCookie, removeCookie] = useCookies(['account']);

    function CheckAccount() {
        function OnCloseModalWindow(e, value) {
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
                    res[0].role = role;
                    setAccountContext(res[0]);
                    setWindow();
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
        //
        if(!AccountContext || 
            (AccountContext.role != 'admins' && AccountContext.role != 'managers'))
            setWindow(
            {
                title: 'Авторизируйтесь',
                preset: 'AdminAuthorization',
                buttons: { close: false },
                modal_overlay: classes.modal_overlay,
                onClose: OnCloseModalWindow
            });
        else
        {
            //Запрос во избежании несоотвествия данных
            //...
            fetch(`${Global.url}/api/authentication?login=${AccountContext.login}&password=${AccountContext.password}&type_of_users=${AccountContext.role}`, { method: 'POST' })
            .then((res) => {
                console.log('Успех!');
                return res.json();
            })
            .then((res) => {
                res = res[0];
                if(!res)
                    throw new Error();
                //
                setAccountContext({ ...res, role: AccountContext.role });
            })
            .catch((err) => {
                console.log('Ошибка!');
                return err.json();
            })
            .catch((err) => {
                console.log(err);
                setAccountContext(undefined);
            })
        }
    }

    useEffect(() => 
    {
        CheckAccount();
    }, [])
    
    function GenerateContent() {
        return AccountContext ? <AccountContextComponent.Provider value={[AccountContext, setAccountContext]}>
            <Head>
                <title>{title}</title>
            </Head>
            <AdminHeader/>
            <main className={classes.main}>
                {props.children}
            </main>
        </AccountContextComponent.Provider> : '';
    }

    function GenerateModalWindow() {
        return window ? <ModalWindow {...window}/> : '';
    }

    return (
        <>
            {GenerateContent()}
            {GenerateModalWindow()}
        </>
    )
}

export default AdminLayout;