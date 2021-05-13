import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
//
import ModalWindow from '../ModalWindow/ModalWindow.jsx';
//
import Global from '../../../pages/global.js';
import classes from './Notification.module.scss';

const Notification = (props) => {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies('account');
    //
    const children = props.children;
    const preset = props.preset;
    //
    const [active, setActive] = useState(true);
    const [window, setWindow] = useState();

    function GenerateContent() {
        if(preset)
        {
            function GeneratePresetButtons() {
                const presets = {
                    "ClientAuthorization": [
                        {
                            "text": 'Войти',
                            OnClick: (e) => {
                                setWindow(
                                {
                                    title: 'Авторизация',
                                    preset: 'ClientAuthorization',
                                    modal_overlay: classes.modal_overlay,
                                    onChainge: (e, value) => {
                                        const login = value.login;
                                        const password = value.password;
                                        //
                                        fetch(`${Global.url}/api/authentication?login=${login}&password=${password}&type_of_users=${'users'}`,
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
                                                res[0].role = 'users';
                                                setCookie('account', res[0]);
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
                                });
                            }
                        },
                        {
                            "text": 'Зарегистрироваться',
                            OnClick: (e) => {
                                setWindow(
                                {
                                    title: 'Регистрация',
                                    preset: 'ClientRegistration',
                                    modal_overlay: classes.modal_overlay,
                                    onChainge: (e, value) => {
                                        const user = { ...value, tours_orders: [], relax_orders: [], cruises_orders: [] };                                        
                                        //
                                        if(user.password != user.repeat_password)
                                        {
                                            alert('Пароли не совпадают!');
                                            return true;
                                        }
                                        delete user.repeat_password;
                                        //
                                        fetch(`${Global.url}/api/db/users/insert?object=${JSON.stringify(user)}`)
                                        .then((res) => {
                                            console.log('Успех!');
                                            return res.json();
                                        })
                                        .then((res) => {
                                            console.log(res);
                                            if(res.keyPattern)
                                            {
                                                if(res.keyPattern.email)
                                                {
                                                    alert('На эту почту уже зарегистрирован email!');
                                                    return;
                                                }
                                                else if(res.keyPattern.login)
                                                {
                                                    alert('Такой логин уже сущетсвует, придумайте другой');
                                                    return;
                                                }
                                            }
                                            else
                                            {
                                                alert('Вы успешно зарегистрировались');
                                                user.role = 'users';
                                                user._id =  res.insertedId; 
                                                delete user.tours_orders;
                                                delete user.relax_orders;
                                                delete user.cruises_orders;
                                                setCookie('account', user);
                                                location.reload();
                                            }
                                        })
                                        .catch((err) => {
                                            console.log('Ошибка!');
                                            console.log(err);
                                            return err.json();
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        })
                                    }
                                })
                            }
                        }
                    ],
                    "ClientPersonalAccount": [
                        {
                            "text": "Войти в личный кабинет",
                            OnClick: (e) => {
                                
                                // router.push({
                                //     pathname: '/post/[pid]',
                                //     query: { pid: post.id },
                                // })
                                router.push(`/account/${cookies.account._id}`);//{ login: cookies.account.login, password: cookies.account.password });
                            }
                        },
                        {
                            "text": "Выйти",
                            OnClick: (e) => {
                                removeCookie('account');
                                location.reload();
                            }
                        },
                    ]
                }
                const buttons = presets[preset];
                //
                const elements = [];
                for(let i = 0; i < buttons.length; i++)
                {
                    elements.push(<button onClick={buttons[i].OnClick}>{buttons[i].text}</button>);
                }
                //
                return <div className={classes.buttons}>
                    {elements}
                </div>
            }

            function OnClick(e) {
                setActive(!active);
            }

            return <>
                <div className={classes.info}>
                    {preset.title ? <h1>{preset.title}</h1>: ''}
                    <p>{children}</p>
                    {GeneratePresetButtons()}
                </div>
                <i class="fa fa-arrow-left" aria-hidden="true" onClick={OnClick}></i>
            </>
        }
        else
        {
            // GenerateButtons({ props: { children: { children } } });
            return children;
        }
    }

    function GenerateModalWindow() {
        return window ? <ModalWindow {...window} onClose={(e) => setWindow()}/>: '';
    }

    const class_active = active ? classes.active : '';

    return (
        <>
            <div className={classes.notification + ' ' + class_active}>
                {GenerateContent()}
                {/* {children} */}
            </div>
            {GenerateModalWindow()}
        </>
    )
}

export default Notification;