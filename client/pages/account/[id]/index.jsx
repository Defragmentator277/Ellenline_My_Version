import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
//
import InputText from '../../../components/CustomElements/InputText.jsx';
import InputNumber from '../../../components/CustomElements/InputNumber.jsx';
import SelectOption from '../../../components/CustomElements/SelectOption.jsx';
import ClientLayout from '../../../layouts/ClientLayout.jsx';
//
import Global from '../../global.js';
import classes from './index.module.scss';

const Account = (props) => {
    const router = useRouter();
    const [cookies, setCookie] = useCookies('account');
    //
    const [user, setUser] = useState(props.user);

    console.log('ON CLIENT');
    console.log(user);

    function OnChainge(e, value, prop) {
        user[prop] = value;
        setUser({...user});
    }

    function OnClick(e) {
        const id = user._id;
        delete user._id;
        //
        fetch(`${Global.url}/api/db/users/update?prop=${JSON.stringify(user)}&id=${id}&operator=${'$replace'}`)
        .then((res) => {
            console.log('Успех!');
            return res.json();
        })
        .then((res) => {
            alert('Вы успешно изменили информацию о себе');
            setCookie('account', {...user, role: 'users' });
        })
        .catch((err) => {
            console.log('Ошибка!');
            return err.json();
        })
        .catch((err) => {
            console.log(err);
            alert('Произошла непредвиденная ошибка');
        })
        .finally(() => {
            location.reload();
        });
    }   

    function GenerateContent() {
        const account = cookies.account;
        //
        if(account && account.role == 'users' && 
           account.login == user.login && 
           account.password == user.password)
        {
            function GenerateOrders() {
                // function Generate

                function GenerateToursOrders() {
                    const elements = [];
                    const tours_orders = user.tours_orders;
                    //tours
                    if(tours_orders && 
                       Object.keys(tours_orders[0]).length != 0)
                    {
                        for(let i = 0; i < tours_orders.length; i++)
                        {
                            const order = tours_orders[i];
                            const tour = order.tour;
                            //
                            elements.push(<div className={classes.tour_order}>
                                {/*  */}
                                <div className={classes.image}>
                                    <img src={tour.images[0].src}/>
                                </div>
                                {/*  */}
                                <div className={classes.tour_info}>
                                    <div className={classes.name}>
                                        <h1>Название автобусного тура:</h1>
                                        <p>{tour.name}</p>
                                    </div>
                                    <div className={classes.actual_price}>
                                        <h1>Актуальная цена за билет:</h1>
                                        <p>{tour.price}</p>
                                    </div>
                                    <div className={classes.adress}>
                                        <h1>Адрес: </h1>
                                        <p>{tour.adress}</p>
                                    </div>
                                </div>
                                {/*  */}
                                <div className={classes.order_info}>
                                    <div className={classes.departure}>
                                        <h1>Дата и время отправления:</h1>
                                        <p>{new Date(order.timetable_departure.date).toLocaleDateString()
                                            + " " + order.timetable_departure.time}</p>
                                    </div>
                                    <div className={classes.tickets}>
                                        <h1>Кол-во ваших билетов:</h1>
                                        <p>{order.tickets}</p>
                                    </div>
                                    <div className={classes.price}>
                                        <h1>Сумма заказа:</h1>
                                        <p>{order.price}</p>
                                    </div>
                                    <div className={classes.status}>
                                        <h1>Статус заказа:</h1>
                                        <p>{order.status}</p>
                                    </div>
                                </div>
                                {/*  */}
                            </div>);
                        }
                    }
                    return <div className={classes.tours_orders}>
                        {elements}
                    </div>;
                }
                function GenerateRelaxOrders() {
                    const elements = [];
                    const relax_orders = user.relax_orders;
                    //relax
                    if(relax_orders)
                    {
                        for(let i = 0; i < relax_orders.length; i++)
                        {
        
                        }
                    }
                    return <div className={classes.relax_orders}>

                    </div>;
                }
                function GenerateCruisesOrders() {
                    const elements = [];
                    const cruises_orders = user.cruises_orders;
                    //cruises
                    if(cruises_orders)
                    {
                        for(let i = 0; i < cruises_orders.length; i++)
                        {
        
                        }
                    }
                    return <div className={classes.cruises_orders}>

                    </div>;
                }

                return <div className={classes.orders}>
                    {GenerateToursOrders()}
                    {GenerateRelaxOrders()}
                    {GenerateCruisesOrders()}
                </div>
            }

            return <div className={classes.account}>
                <div className={classes.info}>
                    <div className={classes.greetings}>
                        <h1>Информация о вас</h1>
                    </div>
                    {/*  */}
                    <InputText title='Логин'
                    value={user.login}
                    className={classes.input + ' ' + classes.login}
                    onChainge={(e, value) => OnChainge(e, value, 'login')}/>
                    {/*  */}
                    <InputText title='Пароль'
                    value={user.password}
                    isPassword='true'
                    className={classes.input + ' ' + classes.password}
                    onChainge={(e, value) => OnChainge(e, value, 'password')}/>
                    {/*  */}
                    <InputText title='Имя'
                    value={user.name}
                    className={classes.input + ' ' + classes.name}
                    onChainge={(e, value) => OnChainge(e, value, 'name')}/>
                    {/*  */}
                    <InputText title='Фамилия'
                    value={user.surname}
                    className={classes.input + ' ' + classes.surname}
                    onChainge={(e, value) => OnChainge(e, value, 'surname')}/>
                    {/*  */}
                    <InputText title='Отчество'
                    value={user.middle_name}
                    className={classes.input + ' ' + classes.middle_name}
                    onChainge={(e, value) => OnChainge(e, value, 'middle_name')}/>
                    {/*  */}
                    <InputText title='Телефон'
                    value={user.telephone}
                    className={classes.input + ' ' + classes.telephone}
                    onChainge={(e, value) => OnChainge(e, value, 'telephone')}/>
                    {/*  */}
                    <SelectOption title='Пол'
                    values={[ 'Мужской', 'Женский' ]}
                    className={classes.input + ' ' + classes.gender}
                    onChainge={(e, value) => OnChainge(e, value, 'gender')}/>
                    {/*  */}
                    <button className={classes.button} onClick={OnClick}>
                        Принять изменения
                    </button>
                </div>
                <div className={classes.orders}>
                    {GenerateOrders()}
                </div>
            </div>;
        }
        else
            return;
    }

    return (
        <ClientLayout title='Личный кабинет'>
            <div className={classes.wrapper}>
                {GenerateContent()}
            </div>
        </ClientLayout>
    )
}

export async function getStaticPaths() {
    const paths = []
    //
    const res = await fetch(`${Global.url}/api/db/users`);
    const users = await res.json();
    //
    users.forEach((element) => paths.push({ params: { id: element._id } }));
    return {
        paths: paths,
        fallback: false
    };
}

export async function getStaticProps(router) {
    const id_user = router.params.id;
    //
    const res = await fetch(`${Global.url}/api/getUser?id_user=${id_user}&get_relaxes=${true}`);
    const user = await res.json();
    //
    return {
        props: {
            user: user
        }
    };
}

export default Account;