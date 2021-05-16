import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
//
import ClientLayout from '../../../layouts/ClientLayout.jsx';
import ModalWindow from '../../../components/Common/ModalWindow/ModalWindow.jsx';
import Comment from '../../../components/Common/Comments/Comment.jsx';
//
import InputText from '../../../components/CustomElements/InputText.jsx';
import SelectOption from '../../../components/CustomElements/SelectOption.jsx';
//
import { AccountContextComponent, AccountContextHOF } from '../../../layouts/ClientLayoutContext.js';
//
import Global from '../../global.js';
import classes from './index.module.scss';

const Account = (props) => {
    const router = useRouter();
    // console.log(useContext(AccountContextComponent));
    const [AccountContext, setAccountContext] = useState(props.AccountContext);
    const [window, setWindow] = useState();

    // const AccountContext = {};
    console.log(AccountContext);
    //
    const [user, setUser] = useState(props.user);

    console.log(user);

    function OnChainge(e, value, prop) {
        user[prop] = value;
        setUser({...user});
    }

    function OnClick(e) {
        const copy_user = JSON.parse(JSON.stringify(user));
        delete copy_user._id;
        //
        fetch(`${Global.url}/api/db/users/update?prop=${JSON.stringify(copy_user)}&id=${user._id}&operator=${'$replace'}`)
        .then((res) => {
            console.log('Успех!');
            console.log(res);
            return res.json();
        })
        .then((res) => {
            console.log(res);
            alert('Вы успешно изменили информацию о себе');
            setAccountContext({...user});
            // setCookie('account', {...user, role: 'users' }, { path: '/' });
        })
        .catch((err) => {
            console.log('Ошибка!');
            console.log(err);
            return err.json();
        })
        .catch((err) => {
            console.log(err);
            alert('Произошла непредвиденная ошибка');
        })
        .finally(() => {
            // location.reload();
        });
    }   

    function GenerateContent() {
        //
        if(AccountContext && 
           AccountContext.login == user.login && 
           AccountContext.password == user.password)
        {
            function GenerateOrders() {
                // function Generate

                function GenerateOrders(type_order, isHistory = false) {

                    function ConvertOrder(order) {
                        function GenerateLeaveCommentButton(some_relax, out_collection) {
                            const comments = some_relax.comments;
                            //
                            for(let i = 0; i < comments.length; i++)
                            {
                                const comment = comments[i];
                                if(comment.id_user.$id == user._id)
                                {
                                    const new_comment = { comment: {
                                        user: user,
                                        text: comment.text,
                                        date: comment.date,
                                        rating: comment.rating
                                    }};
                                    //s
                                    return <div className={classes.comment}>
                                        <h1>Ваш комментарий</h1>
                                        <Comment {...new_comment}/>
                                    </div>;
                                }
                            }
                            //
                            function OnClickLeaveComment(e) {
                                setWindow(
                                {
                                    title: 'Комментарий',
                                    preset: 'LeaveComment',
                                    onChainge: (e, value) => {
                                        const prop = {
                                            key: 'comments',
                                            new_value: { ...value, id_user: Global.ConvertToDBRef('users', user._id), date: new Date() }
                                        };
                                        //
                                        fetch(`${Global.url}/api/db/${out_collection}/update?id=${some_relax._id}&prop=${JSON.stringify(prop)}&operator=${'$push'}`)
                                        .then((res) => {
                                            console.log('Успех!');
                                            return res.json();
                                        })
                                        .then((res) => {
                                            console.log(res);
                                        })
                                        .catch((err) => {
                                            console.log('Ошибка!');
                                            return err.json();
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        })
                                    }
                                });
                            }   
                            //
                            return <button className={classes.button} onClick={OnClickLeaveComment}>
                                Оставить комментарий
                            </button>;
                        }     
                        //
                        switch(type_order)
                        {
                            case 'tours_orders':
                            case 'history_tours_orders':
                                const tour = order.tour;
                                //
                                function OnClickTour(e) {
                                    router.push(`/resorts/tours/${tour.timetable.length > 1 ? 'multiday' : 'oneday' }/${tour._id}`);
                                }
                                //
                                return <div className={classes.tour}>
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
                                            <p>{tour.price} руб.</p>
                                        </div>
                                        <div className={classes.adress}>
                                            <h1>Адрес: </h1>
                                            <p>{tour.adress}</p>
                                        </div>
                                        <div className={classes.days}>
                                            <h1>Продолжительность: </h1>
                                            <p>{tour.timetable.length} 
                                                {tour.timetable.length == 1 ? ' день' :
                                                tour.timetable.length < 5 ? ' дня' : ' дней'}</p>
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
                                            <p>{order.price} руб.</p>
                                        </div>
                                        {isHistory ? 
                                        <div className={classes.manager}>
                                            <h1>Менеджер завершившый ваш заказа:</h1>
                                            <p>{order.manager.name + 
                                            ' ' + order.manager.surname + 
                                            ' ' + order.manager.middle_name}</p>
                                        </div> 
                                        :
                                        <div className={classes.status}>
                                            <h1>Статус заказа:</h1>
                                            <p>{order.status}</p>
                                        </div>}
                                    </div>
                                    {/*  */}
                                    <div className={classes.buttons}>
                                        <button className={classes.button} onClick={OnClickTour}>
                                            Перейти на страницу
                                        </button>
                                        {isHistory ? GenerateLeaveCommentButton(tour, 'tours') : ''}
                                    </div>
                                </div>;
                            case 'relax_orders':
                            case 'history_relax_orders':
                                const relax = order.relax;
                                const room = order.room;
                                //
                                function OnClickRelax(e) {
                                    router.push(`/resorts/relax/${relax.type == 'Санаторий' ? 'sanatoriums' : 'pensionats' }/${relax._id}`);
                                }
                                //
                                return <div className={classes.relax}>
                                    <div className={classes.title_relax}>
                                        Фото место отдыха
                                    </div>
                                    <div className={classes.title_room}>
                                        Фото комнаты
                                    </div>
                                    {/*  */}
                                    <div className={classes.image_relax}>
                                        <img src={relax.images[0].src}/>
                                    </div>
                                    {/*  */}
                                    <div className={classes.image_room}>
                                        <img src={room.image}/>
                                    </div>
                                    {/*  */}
                                    <div className={classes.relax_info}>
                                        <div className={classes.name}>
                                            <h1>Название::</h1>
                                            <p>{relax.name}</p>
                                        </div>
                                        <div className={classes.name}>
                                            <h1>Тип места отдыха:</h1>
                                            <p>{relax.type}</p>
                                        </div>
                                        <div className={classes.date_arrival}>
                                            <h1>Дата прибытия:</h1>
                                            <p>{new Date(order.date_arrival).toLocaleDateString()}</p>
                                        </div>
                                        <div className={classes.date_leave}>
                                            <h1>Дата отбытия:</h1>
                                            <p>{new Date(order.date_leave).toLocaleDateString()}</p>
                                        </div>
                                        <div className={classes.price}>
                                            <h1>Общая сумма:</h1>
                                            <p>{order.price} руб.</p>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div className={classes.order_info}>
                                        <div className={classes.type_room}>
                                            <h1>Тип комнаты:</h1>
                                            <p>{room.category}</p>
                                        </div>
                                        <div className={classes.corpus}>
                                            <h1>Корпус в котором находиться комната:</h1>
                                            <p>{room.corpus}</p>
                                        </div>
                                        <div className={classes.number_of_seats}>
                                            <h1>Кол-во занятых вами мест:</h1>
                                            <p>Взрослых: {room.number_of.seats.adult} из {order.number_of.adult}<br/>
                                               {order.number_of.child ? `Детских: ${room.number_of.seats.child} из ${order.number_of.child}` : ''}
                                            </p>
                                        </div>
                                        <div className={classes.type_food}>
                                            <h1>Тип питания:</h1>
                                            <p>{order.type_of_food.toUpperCase()}</p>
                                        </div>
                                        <div className={classes.pets}>
                                            <h1>Разрешены ли домашние питомцы:</h1>
                                            <p>{room.pets ? 'Да' : 'Нет'}</p>
                                        </div>
                                        {isHistory ? 
                                        <div className={classes.manager}>
                                            <h1>Менеджер завершившый ваш заказа:</h1>
                                            <p>{order.manager.name + 
                                            ' ' + order.manager.surname + 
                                            ' ' + order.manager.middle_name}</p>
                                        </div> 
                                        :
                                        <div className={classes.status}>
                                            <h1>Статус заказа:</h1>
                                            <p>{order.status}</p>
                                        </div>}
                                    </div>
                                    {/*  */}
                                    <div className={classes.buttons}>
                                        <button className={classes.button} onClick={OnClickRelax}>
                                            Перейти на страницу
                                        </button>
                                        {isHistory ? GenerateLeaveCommentButton(relax, 'relax') : ''}
                                    </div>
                                </div>;
                            case 'cruises_orders':
                            case 'history_cruises_orders':
                                const cruise = order.cruise;
                                const cabin = order.room;
                                //
                                function OnClickCruise(e) {
                                    router.push(`/resorts/cruise/${cruise.type == 'Речной' ? 'river' : 'marine' }/${cruise._id}`);
                                }
                                //
                                return <div className={classes.cruise}>
                                    <div className={classes.title_cruise}>
                                        Фото c место отдыха
                                    </div>
                                    <div className={classes.title_cabin}>
                                        Фото каюты
                                    </div>
                                    {/*  */}
                                    <div className={classes.image_cruise}>
                                        <img src={cruise.images[0].src}/>
                                    </div>
                                    {/*  */}
                                    <div className={classes.image_cabin}>
                                        <img src={cabin.image}/>
                                    </div>
                                    {/*  */}
                                    <div className={classes.cruise_info}>
                                        <div className={classes.name}>
                                            <h1>Название:</h1>
                                            <p>{cruise.name}</p>
                                        </div>
                                        <div className={classes.name}>
                                            <h1>Тип места отдыха:</h1>
                                            <p>{cruise.type}</p>
                                        </div>
                                        <div className={classes.price}>
                                            <h1>Общая сумма:</h1>
                                            <p>{order.price} руб.</p>
                                        </div>
                                        {isHistory ? 
                                        <div className={classes.manager}>
                                            <h1>Менеджер завершившый ваш заказа:</h1>
                                            <p>{order.manager.name + 
                                            ' ' + order.manager.surname + 
                                            ' ' + order.manager.middle_name}</p>
                                        </div> 
                                        :
                                        <div className={classes.status}>
                                            <h1>Статус заказа:</h1>
                                            <p>{order.status}</p>
                                        </div>}
                                    </div>
                                    {/*  */}
                                    <div className={classes.order_info}>
                                        <div className={classes.type_room}>
                                            <h1>Тип комнаты:</h1>
                                            <p>{cabin.category}</p>
                                        </div>
                                        <div className={classes.corpus}>
                                            <h1>Палуба на которой находиться каюта:</h1>
                                            <p>{cabin.corpus}</p>
                                        </div>
                                        <div className={classes.number_of_seats}>
                                            <h1>Кол-во занятых вами мест:</h1>
                                            <p>Взрослых: {cabin.number_of.seats.adult} из {order.number_of.adult}<br/>
                                               {order.number_of.child ? `Детских: ${room.number_of.seats.child} из ${order.number_of.child}` : ''}
                                            </p>
                                        </div>
                                        <div className={classes.type_food}>
                                            <h1>Тип питания:</h1>
                                            <p>{order.type_of_food.toUpperCase()}</p>
                                        </div>
                                        <div className={classes.pets}>
                                            <h1>Разрешены ли домашние питомцы:</h1>
                                            <p>{cabin.pets ? 'Да' : 'Нет'}</p>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div className={classes.buttons}>
                                        <button className={classes.button} onClick={OnClickCruise}>
                                            Перейти на страницу
                                        </button>
                                        {isHistory ? GenerateLeaveCommentButton(cruise, 'cruises') : ''}
                                    </div>
                                </div>;
                        }
                    }

                    const elements = [];
                    const orders = user[type_order];
                    //tours
                    if(orders && 
                       Object.keys(orders[0]).length != 0)
                    {
                        for(let i = 0; i < orders.length; i++)
                        {
                            const order = orders[i];
                            //
                            elements.push(ConvertOrder(order));
                        }
                    }
                    //
                    switch(type_order)
                    {
                        case 'tours_orders':
                            return <div className={classes.tours}>
                                {elements.length > 0 ? <h1 className={classes.title}>Забронированные туры</h1> : ''}
                                {elements}
                            </div>;
                        case 'relax_orders':
                            return <div className={classes.relaxes}>
                                {elements.length > 0 ? <h1 className={classes.title}>Забронированные санатории, пансионаты</h1> : ''}
                                {elements}
                            </div>;
                        case 'cruises_orders':
                            return <div className={classes.cruises}>
                                {elements.length > 0 ? <h1 className={classes.title}>Забронированные круизы</h1> : ''}
                                {elements}
                            </div>;
                        //
                        case 'history_tours_orders':
                            return <div className={classes.tours}>
                                {elements.length > 0 ? <h1 className={classes.title}>История покупок туров</h1> : ''}
                                {elements}
                            </div>;
                        case 'history_relax_orders':
                            return <div className={classes.relaxes}>
                                {elements.length > 0 ? <h1 className={classes.title}>История покупок санаториев и пансионатов</h1> : ''}
                                {elements}
                            </div>;
                        case 'history_cruises_orders':
                            return <div className={classes.cruises}>
                                {elements.length > 0 ? <h1 className={classes.title}>История покупок круизов</h1> : ''}
                                {elements}
                            </div>;
                    }
                }

                return <>
                    <div className={classes.orders}>
                        {GenerateOrders('tours_orders')}
                        {GenerateOrders('relax_orders')}
                        {GenerateOrders('cruises_orders')}
                    </div>
                    <div className={classes.history_orders}>
                        {GenerateOrders('history_tours_orders', true)}
                        {GenerateOrders('history_relax_orders', true)}
                        {GenerateOrders('history_cruises_orders', true)}
                    </div>
                </>;
            }

            return <div className={classes.account}>
                <div className={classes.greetings}>
                    <h1>Информация о вас</h1>
                </div>
                <div className={classes.info}>
                    {/*  */}
                    <div className={classes.image}>
                        <img src={user.image}/>
                    </div>
                    <div  className={classes.inputs}>
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
                        <InputText title='Аватарка'
                        value={user.image}
                        className={classes.input + ' ' + classes.image}
                        onChainge={(e, value) => OnChainge(e, value, 'image')}/>
                        {/*  */}
                        <SelectOption title='Пол'
                        values={[ 'Мужской', 'Женский' ]}
                        className={classes.input + ' ' + classes.gender}
                        onChainge={(e, value) => OnChainge(e, value, 'gender')}/>
                        {/*  */}
                    </div>
                    <button className={classes.button} onClick={OnClick}>
                        Принять изменения
                    </button>
                </div>
                {GenerateOrders()}
            </div>;
        }
        else
            return;
    }

    function GenerateModalWindow() {
        return window ? <ModalWindow {...window} onClose={() => setWindow()}/> : '';
    }

    return (
        <>
            <ClientLayout title='Личный кабинет'>
                <div className={classes.wrapper}>
                    {GenerateContent()}
                </div>
            {GenerateModalWindow()}
            </ClientLayout>
        </>
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
    console.log(router);
    console.log(JSON.stringify(null, 2, router));
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

export default AccountContextHOF(Account);
// export default <AccountContextComponent.Consumer>
//     {AccountContext => <Account AccountContext={AccountContext}/>}
// </AccountContextComponent.Consumer>;