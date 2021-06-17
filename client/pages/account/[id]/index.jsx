import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
//
import ClientLayout from '../../../layouts/ClientLayout.jsx';
import ModalWindow from '../../../components/Common/ModalWindow/ModalWindow.jsx';
import Comment from '../../../components/Common/Comments/Comment.jsx';
//
import InputText from '../../../components/CustomElements/InputText.jsx';
import SelectOption from '../../../components/CustomElements/SelectOption.jsx';
//
import Global from '../../global.js';
import classes from './index.module.scss';

//Страница личного кабинета пользователя
const Account = (props) => {
    //Роутер необходим для маршрутизации
    const router = useRouter();
    //Установка модульного окна
    const [window, setWindow] = useState();
    //Получение данных о пользователей из props
    const [user, setUser] = useState(props.user);
    //Сохранения логина и пароля, для авторизации после изменения данных
    const login = props.login;
    const password = props.password;

    console.log(user);

    //Событие, происходящее при изменении любого input`a
    function OnChainge(e, value, prop) {
        if(value.length == 0)
        {
            alert('Поле не может быть не заполненным');
            location.reload();
        }
        user[prop] = value;
        setUser({...user});
    }

    //Событие, происходящее при нажатии кнопки "Принять изменения"
    function OnClick(e) {
        //Создание глубокой копии пользователя, для избежания несоответсвия данных
        const copy_user = JSON.parse(JSON.stringify(user));
        //Функция конвертации заказа
        //Удаление поля _id
        delete copy_user._id;
        //Конвертировани всех заказов
        delete copy_user.tours_orders;
        delete copy_user.history_tours_orders;
        //
        delete copy_user.relax_orders;
        delete copy_user.history_relax_orders;
        //
        delete copy_user.cruises_orders;
        delete copy_user.history_cruises_orders;
        //Запрос на обновлении информации о пользователе
        fetch(`${Global.url}/api/db/users/update?prop=${JSON.stringify(copy_user)}&id=${user._id}&operator=${'$replace'}`)
        .then((res) => {
            console.log('Успех!');
            console.log(res);
            return res.json();
        })
        .then((res) => {
            console.log(res);
            alert('Вы успешно изменили информацию о себе');
            //Устанавливать Cookie излишне, он сам установиться при перезагрузке страницы
        })
        .catch((err) => {
            console.log('Ошибка!');
            console.log(err);
            return err.json();
        })
        .catch((err) => {
            console.log(err);
            //Реакция на ошибку
            alert('Произошла непредвиденная ошибка');
        })
        // .finally(() => {
        //     //Обновление страницы в любом случаи
        //     // location.reload();
        // });
    }   

    function GenerateContent() {
        //Получение данных о пользователе из Cookie
        const account_user = Global.getCookie('account_user');
        //Проверка на существование Cookie и соотвествие учетных данных пользователя
        if(account_user && 
           account_user.login == login && 
           account_user.password == password)
        {
            //Функция генерация всех заказов
            function GenerateOrders() {

                //Общая функция для генерации одного заказа
                function GenerateOrders(type_order, isHistory = false) {

                    function ConvertOrder(order) {
                        //Генерация кнопки "Оставить комментарий", генерируется если isHistory = true
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
                                    //
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
                                            if(res)
                                                location.reload();
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
                        //Генерация кнопки "Доплатить", генерируется если isHistory = false
                        function GeneratePayInAdditioon() {
                            //Если заказ оплачен, функция ничего не возвращает
                            if(order.status == 'Заказ оплачен')
                                return;
                            //Событие, происходящие при клике
                            function OnClickPayInAddition() {
                                //
                                function UpdatePayment(prop) {
                                    fetch(`${Global.url}/api/db/users/update?id=${account_user._id}&prop=${JSON.stringify(prop)}`)
                                    .then((res) => {
                                        console.log('Успех!');
                                        console.log(res);
                                        return res.json();
                                    })
                                    .then((res) => {
                                        console.log(res);
                                        location.reload();
                                    })
                                    .catch((err) => {
                                        console.log('Ошибка!');
                                        console.log(err);
                                        return err.json();
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                                }
                                //
                                const prop = {
                                    key: 'status',
                                    path: type_order,
                                    id: order.id,
                                    new_value: ''
                                }
                                //
                                if(order.status == 'Не оплаченно')
                                {
                                    setWindow(
                                    {
                                        title: 'Доплата',
                                        preset: 'PayInAdditionSelection',
                                        onChainge: (e, value) => {
                                            if(value.payment == 'Оплата половины суммы')
                                                prop.new_value = 'Оплаченно половины суммы';
                                            else if(value.payment == 'Полная оплата по карте')
                                                prop.new_value = 'Заказ оплачен';
                                            UpdatePayment(prop);
                                        }
                                    });
                                }
                                else
                                {
                                    prop.new_value = 'Заказ оплачен';
                                    UpdatePayment(prop);
                                }
                            }
                            //
                            return <button className={classes.button} onClick={OnClickPayInAddition}>
                                Доплатить
                            </button>;
                        }
                        //Генерация кнопки "Отказаться", генерируется если isHistory = false
                        function GenerateDenyButton() {
                            //Событие, происходящие при клике
                            function OnClickDeny() {
                                const prop = {
                                    key: type_order,
                                    new_value: order.id
                                };
                                //Удаление брони из аккаунта пользователя
                                fetch(`${Global.url}/api/db/users/update?id=${user._id}&prop=${JSON.stringify(prop)}&operator=${'$pull'}`)
                                .then((res) => {
                                    console.log('Успех!');
                                    console.log(res);
                                    return res.json();
                                })
                                .then((res) => {
                                    console.log(res);
                                    //После успешного запроса, изменения кол-во доступных мест в зависимости от типа брони
                                    let query;
                                    if(type_order == 'tours_orders')
                                        query = `${Global.url}/api/db/tours/decrement?id=${order.tour._id}&arr_id=${order.id}&inc=${-order.tickets}`;
                                    else if(type_order == 'relax_orders')
                                        query = `${Global.url}/api/db/relax/decrement?id=${order.relax._id}&arr_id=${order.id}&inc=${-1}`;
                                    else if(type_order == 'cruises_orders')
                                        query = `${Global.url}/api/db/cruises/decrement?id=${order.cruise._id}&arr_id=${order.id}&inc=${-1}`;
                                    else
                                        console.log('Такого типа нету');
                                    fetch(query)
                                    .then((res) => {
                                        console.log('Успех!');
                                        console.log(res);
                                        return res.json();
                                    })
                                    .then((res) => {
                                        console.log(res);
                                        //В случаи успеха, выводиться окно предупреждения
                                        alert('Вы успешно отказатались от брони!');
                                    })
                                    .catch((err) => {
                                        console.log('Ошибка!');
                                        console.log(err);
                                        return err.json();
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                                    .finally(() => {
                                        location.reload();
                                    });
                                })
                                .catch((err) => {
                                    console.log('Ошибка!');
                                    console.log(err);
                                    return err.json();
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                            }
                            //
                            return <button className={classes.button} onClick={OnClickDeny}>
                                Отказаться
                            </button>
                        }
                        //
                        switch(type_order)
                        {
                            case 'tours_orders':
                            case 'history_tours_orders':
                                const tour = order.tour;
                                //В случаи если тура больше нету в БД
                                if(!tour)
                                    return <div className={classes.dont_exists}>
                                        <h1>Данный тур больше не существует!</h1>
                                    </div>;
                                //Событие, происходящие по клику на "Перейти страницу"
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
                                        {isHistory ? GenerateLeaveCommentButton(tour, 'tours') : 
                                        <>
                                            {GenerateDenyButton()}
                                            {GeneratePayInAdditioon()} 
                                        </>}
                                    </div>
                                </div>;
                            case 'relax_orders':
                            case 'history_relax_orders':
                                const relax = order.relax;
                                const room = order.room;
                                //В случаи если санатория, пансионата или комнаты больше нету в БД
                                if(!relax || !room)
                                    return <div className={classes.dont_exists}>
                                        <h1>Данное место отдыха больше не существует!</h1>
                                    </div>;
                                //Событие, происходящие по клику на "Перейти страницу"
                                function OnClickRelax(e) {
                                    router.push(`/resorts/relax/${relax.type == 'Санаторий' ? 'sanatoriums' : 'pensionats' }/${relax._id}`);
                                }
                                //
                                return <div className={classes.relax}>
                                    {/*  */}
                                    <div className={classes.title_relax}>
                                        Фото c места отдыха
                                    </div>
                                    <div className={classes.image_relax}>
                                        <img src={relax.images[0].src}/>
                                    </div>
                                    {/*  */}
                                    <div className={classes.title_room}>
                                        Фото комнаты
                                    </div>
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
                                        {isHistory ? GenerateLeaveCommentButton(relax, 'relax') : 
                                        <>
                                            {GenerateDenyButton()}
                                            {GeneratePayInAdditioon()} 
                                        </>}
                                    </div>
                                </div>;
                            case 'cruises_orders':
                            case 'history_cruises_orders':
                                const cruise = order.cruise;
                                const cabin = order.room;
                                //В случаи если круиза или комнаты больше нету в БД
                                if(!cruise || !cabin)
                                    return <div className={classes.dont_exists}>
                                        <h1>Данный круиз больше не существует!</h1>
                                    </div>;
                                //Событие, происходящие по клику на "Перейти страницу"
                                function OnClickCruise(e) {
                                    router.push(`/resorts/cruises/${cruise.type == 'Речной' ? 'river' : 'marine' }/${cruise._id}`);
                                }
                                //
                                return <div className={classes.cruise}>
                                    {/*  */}
                                    <div className={classes.image_cruise}>
                                        <img src={cruise.images[0].src}/>
                                    </div>
                                    <div className={classes.title_cruise}>
                                        Фото c места отдыха
                                    </div>
                                    {/*  */}
                                    <div className={classes.title_cabin}>
                                        Фото каюты
                                    </div>
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
                                               {order.number_of.child ? `Детских: ${cabin.number_of.seats.child} из ${order.number_of.child}` : ''}
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
                                        {isHistory ? GenerateLeaveCommentButton(cruise, 'cruises') : 
                                        <>
                                            {GenerateDenyButton()}
                                            {GeneratePayInAdditioon()} 
                                        </>}
                                    </div>
                                </div>;
                        }
                    }

                    const elements = [];
                    //Получение нужного массива с заказами
                    const orders = user[type_order];
                    //Если массив сущетсвует
                    if(orders)
                    {
                        for(let i = 0; i < orders.length; i++)
                        {
                            //Итерация каждого заказа
                            const order = orders[i];
                            elements.push(ConvertOrder(order));
                        }
                    }
                    //Событие, происходяще по клику на заголовок заказов
                    function ExpandBookingSection(e) {
                        let arrow = e.currentTarget;
                        arrow.parentNode.classList
                        .toggle(classes.active);
                    }
                    //В зависимости от типа заказа генерация разного текста заголовка
                    if(elements.length > 0)
                        switch(type_order)
                        {
                            //Обычные заказы
                            case 'tours_orders':
                                return <div className={classes.tours}>
                                    <div className={classes.title} onClick={ExpandBookingSection}>
                                        <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                        <h1>Забронированные туры</h1>
                                    </div>
                                    {elements}
                                </div>;
                            case 'relax_orders':
                                return <div className={classes.relaxes}>
                                    <div className={classes.title} onClick={ExpandBookingSection}>
                                        <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                        <h1>Забронированные санатории, пансионаты</h1>
                                    </div>
                                    {elements}
                                </div>;
                            case 'cruises_orders':
                                return <div className={classes.cruises}>
                                    <div className={classes.title} onClick={ExpandBookingSection}>
                                        <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                        <h1>Забронированные круизы</h1>
                                    </div>
                                    {elements}
                                </div>;
                            //Заказы ушедшие в историю
                            case 'history_tours_orders':
                                return <div className={classes.tours}>
                                    <div className={classes.title} onClick={ExpandBookingSection}>
                                        <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                        <h1>История покупок туров</h1>
                                    </div>
                                    {elements}
                                </div>;
                            case 'history_relax_orders':
                                return <div className={classes.relaxes}>
                                    <div className={classes.title} onClick={ExpandBookingSection}>
                                        <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                        <h1>История покупок санаториев и пансионатов</h1>
                                    </div>
                                    {elements}
                                </div>;
                            case 'history_cruises_orders':
                                return <div className={classes.cruises}>
                                    <div className={classes.title} onClick={ExpandBookingSection}>
                                        <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                        <h1>История покупок круизов</h1>
                                    </div>
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
                        values={user.gender == 'Мужской' ? [ 'Мужской', 'Женский' ] : [ 'Женский', 'Мужской' ]}
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
    }

    //Генерация модульного окна
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

//Функция NextJS запускающаяся при сборке сайта, 
//возвращает все пути для данного динамического маршрута
export async function getStaticPaths() {
    const paths = [];
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

//Функция NextJS запускающаяся при сборке сайта, 
//на основе путей из getStatisPaths делает запросы к серверу, 
//и передает ответы главному компоненту через props
export async function getStaticProps(router) {
    const id_user = router.params.id;
    //
    const res = await fetch(`${Global.url}/api/getUser?id_user=${id_user}&get_relaxes=${true}`);
    const user = await res.json();
    //
    return {
        props: {
            user: user,
            login: user.login,
            password: user.password
        }
    };
}

export default Account;