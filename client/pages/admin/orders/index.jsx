import React from 'react';
import { useRouter } from 'next/router';
//
import AdminLayout from '../../../layouts/AdminLayout.jsx';
import ModalWindow from '../../../components/Common/ModalWindow/ModalWindow.jsx';
import SelectOption from '../../../components/CustomElements/SelectOption.jsx';
//
import Global from '../../global.js';
import classes from './index.module.scss';

//Страница с заказами для менеджеров
const Orders = (props) => {
    //Нужен для маршрутизации по страницам
    const router = useRouter();
    //Состояния оплаты
    const payments = [ 'Не оплаченно', 'Оплаченно половины суммы', 'Заказ оплачен' ];
    //Массив пользователей с заказами
    const orders = props.orders;

    //Генерация основного контента
    function GenerateContent() {
        //Получение аккаунта сотрудника
        const account_worker = Global.getCookie('account_worker');
        //
        function GenerateUser(user) {

            function GenerateOrders(type_order)
            {
                const elements = [];
                const orders = user[type_order];
                //
                function ConvertOrder(order)
                {
                    function OnClickEndOrder(e, type) {
                        function AfterAddingHistory() {
                            const prop = {
                                key: type_order,
                                new_value: order.id
                            }
                            //
                            fetch(`${Global.url}/api/db/users/update?prop=${JSON.stringify(prop)}&id=${user._id}&operator=${'$pull'}`)
                            .then((res) => {
                                console.log('Успех!');
                                console.log(res);
                                return res.json();
                            })
                            .then((res) => {
                                console.log(res);
                                if(res)
                                {
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
                        //
                        const new_order = JSON.parse(JSON.stringify(order));
                        delete new_order.status;
                        switch(type)
                        {
                            case 'tours':
                                delete new_order.tour;
                                new_order.id_tour = Global.ConvertToDBRef('tours', order.tour._id);
                                break;
                            case 'relax':
                                delete new_order.relax;
                                new_order.id_relax = Global.ConvertToDBRef('relax', order.relax._id);
                                break;
                            case 'cruises':
                                delete new_order.cruise;
                                new_order.id_cruise = Global.ConvertToDBRef('cruises', order.cruise._id);
                                break;
                        }
                        new_order.id_manager = Global.ConvertToDBRef('managers', account_worker._id);
                        //
                        const prop = {
                            key: 'history_' + type_order,
                            new_value: new_order
                        }
                        //
                        fetch(`${Global.url}/api/db/users/update?prop=${JSON.stringify(prop)}&id=${user._id}&operator=${'$push'}`)
                        .then((res) => {
                            console.log('Успех!');
                            console.log(res);
                            return res.json();
                        })
                        .then((res) => {
                            console.log(res);
                            if(res)
                            {
                                AfterAddingHistory();
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
                    //
                    function OnChaingePayment(e, value) {
                        const prop = {
                            key: 'status',
                            path: type_order,
                            id: order.id,
                            new_value: value
                        }
                        fetch(`${Global.url}/api/db/users/update?id=${user._id}&prop=${JSON.stringify(prop)}`)
                        .then((res) => {
                            console.log('Успех!');
                            console.log(res);
                            return res.json();
                        })
                        .then((res) => {
                            console.log(res);
                            if(res)
                            {
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
                    //
                    function OnClickDeny() {
                        const prop = {
                            key: type_order,
                            new_value: order.id
                        };
                        //
                        // console.log(prop);
                        // console.log(user);
                        // return;
                        fetch(`${Global.url}/api/db/users/update?id=${user._id}&prop=${JSON.stringify(prop)}&operator=${'$pull'}`)
                        .then((res) => {
                            console.log('Успех!');
                            console.log(res);
                            return res.json();
                        })
                        .then((res) => {
                            console.log(res);
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
                                alert('Вы успешно отменили бронирование пользователю ' + user.name + ' ' + user.surname + ' ' + user.middle_name);
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
                        })
                    }
                    //
                    switch(type_order)
                    {
                        case 'tours_orders':
                            const tour = order.tour;
                            //
                            function OnClickTour(e) {
                                router.push(`/resorts/tours/${tour.timetable.length > 1 ? 'multiday' : 'oneday' }/${tour._id}`);
                            }
                            //
                            return <div className={classes.tour}>
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
                                        <h1>Кол-во купленных билетов:</h1>
                                        <p>{order.tickets}</p>
                                    </div>
                                    <div className={classes.price}>
                                        <h1>Сумма заказа:</h1>
                                        <p>{order.price} руб.</p>
                                    </div>
                                    <div className={classes.status}>
                                        <h1>Статус заказа:</h1>
                                        {/* CHAINGE VALUE  */}
                                        <SelectOption
                                        placeholder={order.status}
                                        values={payments}
                                        onChainge={OnChaingePayment}/>
                                    </div>
                                </div>
                                {/*  */}
                                <div className={classes.buttons}>
                                    <button className={classes.button} onClick={OnClickDeny}>
                                        Отказаться
                                    </button>
                                    <button className={classes.button} onClick={OnClickTour}>
                                        Перейти на страницу
                                    </button>
                                    <button className={classes.button} onClick={(e) => OnClickEndOrder(e, 'tours')}>
                                        Завершить заказ
                                    </button>
                                </div>
                            </div>;
                        case 'relax_orders':
                            const relax = order.relax;
                            const room = order.room;
                            //
                            function OnCLickRelax(e) {
                                router.push(`/resorts/relax/${relax.type == 'Санаторий' ? 'sanatoriums' : 'pensionats' }/${relax._id}`);
                            }
                            //
                            return <div className={classes.relax}>
                                {/*  */}
                                <div className={classes.relax_info}>
                                    <div className={classes.name}>
                                        <h1>Название:</h1>
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
                                    <div className={classes.pets}>
                                        <h1>Разрешены ли домашние питомцы:</h1>
                                        <p>{room.pets ? 'Да' : 'Нет'}</p>
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
                                    <div className={classes.status}>
                                        <h1>Статус заказа:</h1>
                                        {/* CHAINGE VALUE  */}
                                        <SelectOption
                                        placeholder={order.status}
                                        values={payments}
                                        onChainge={OnChaingePayment}/>
                                    </div>
                                </div>
                                {/*  */}
                                <div className={classes.buttons}>
                                    <button className={classes.button} onClick={OnClickDeny}>
                                        Отказаться
                                    </button>
                                    <button className={classes.button} onClick={OnCLickRelax}>
                                        Перейти на страницу
                                    </button>
                                    <button className={classes.button} onClick={(e) => OnClickEndOrder(e, 'relax')}>
                                        Завершить заказ
                                    </button>
                                </div>
                            </div>;
                        case 'cruises_orders':
                            const cruise = order.cruise;
                            const cabin = order.room;
                            //
                            function OnClickCruise(e) {
                                router.push(`/resorts/cruises/${cruise.type == 'Речной' ? 'river' : 'marine' }/${cruise._id}`);
                            }
                            //
                            return <div className={classes.cruise}>
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
                                    <div className={classes.pets}>
                                        <h1>Разрешены ли домашние питомцы:</h1>
                                        <p>{cabin.pets ? 'Да' : 'Нет'}</p>
                                    </div>
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
                                    <div className={classes.status}>
                                        <h1>Статус заказа:</h1>
                                        {/* CHAINGE VALUE  */}
                                        <SelectOption
                                        placeholder={order.status}
                                        values={payments}
                                        onChainge={OnChaingePayment}/>
                                    </div>
                                </div>
                                {/*  */}
                                <div className={classes.buttons}>
                                    <button className={classes.button} onClick={OnClickDeny}>
                                        Отказаться
                                    </button>
                                    <button className={classes.button} onClick={OnClickCruise}>
                                        Перейти на страницу
                                    </button>
                                    <button className={classes.button} onClick={(e) => OnClickEndOrder(e, 'cruises')}>
                                        Завершить заказ
                                    </button>
                                </div>
                            </div>;
                    }
                }
                //
                function ExpandBookingSection(e) {
                    let arrow = e.currentTarget;
                    arrow.parentNode.classList
                    .toggle(classes.active);
                }
                //
                if(orders)
                {
                    for(let i = 0; i < orders.length; i++)
                    {
                        elements.push(ConvertOrder(orders[i]));
                    }
                }
                //
                if(elements.length > 0)
                    switch(type_order)
                    {
                        case 'tours_orders':
                            return <div className={classes.tours_orders}>
                                <div className={classes.greetings} onClick={ExpandBookingSection}>
                                    <h1>Забронированные туры</h1>
                                    <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                </div>
                                {elements}
                            </div>;
                        case 'relax_orders':
                            return <div className={classes.relax_orders}>
                                <div className={classes.greetings} onClick={ExpandBookingSection}>
                                    <h1>Забронированные санатории, пансионаты</h1>
                                    <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                </div>
                                {elements}
                            </div>;
                        case 'cruises_orders':
                            return <div className={classes.cruises_orders}>
                                <div className={classes.greetings} onClick={ExpandBookingSection}>
                                    <h1>Забронированные круизы</h1>
                                    <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                </div>
                                {elements}
                            </div>;
                    }
            }
            
            if(user.tours_orders.length > 0 ||
               user.relax_orders.length > 0 ||
               user.cruises_orders.length > 0)
                return <div className={classes.user}>
                    <div className={classes.greetings}>
                        Информация о пользователе
                    </div>
                    {/*  */}
                    <div className={classes.info}>
                        <div>
                            <h1>ФИО:</h1>
                            <p>{user.name + ' ' + user.surname + ' ' + user.middle_name}</p>
                        </div>
                        <div>
                            <h1>Пол:</h1>
                            <p>{user.gender}</p>
                        </div>
                        <div>
                            <h1>Электронная почта:</h1>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h1>Телефон:</h1>
                            <p>{user.telephone}</p>
                        </div>
                    </div>
                    {/*  */}
                    <div className={classes.greetings}>
                        Информация о заказах
                    </div>
                    {/*  */}
                    <div className={classes.orders}>
                        {GenerateOrders('tours_orders')}
                        {GenerateOrders('relax_orders')}
                        {GenerateOrders('cruises_orders')}
                    </div>
                </div>;
        }
        //
        const elements = [];
        for(let i = 0; i < orders.length; i++)
        {
            //Конвертирования каждого пользователя, в карточку с заказом
            elements.push(GenerateUser(orders[i]));
        }
        if(account_worker && account_worker.role == 'managers')
            //В случаи если сотрудник существует и его роль менеджер
            //происходит генерация карточек пользователей
            return <div className={classes.users}>
                <div className={classes.greetings}>{elements.length == 0 ? 'В данный момент здесь нету активных заказов' : 'Карточки заказов пользователей'}</div>
                {elements}
            </div>;
        else
            //В случаи если сотрудник не существует и его роль не администратор
            //вывод информации о ошибки, и последующее перекидвание на главную страницу
            return <ModalWindow title='Ошибка!' onClose={() => { router.push('/admin') }}>
                <div className={classes.text}>
                    У вас нет необходимости работать с заказами, 
                    если же появилась такая небоходимость воспользуйтесь возможностями БД
                </div>
            </ModalWindow>;
    }
    //
    return (
        <AdminLayout title='Заказы'>
            {GenerateContent()}
        </AdminLayout>
    )
}

//Функция NextJS запускающаяся при сборке сайта, 
//на основе путей из getStatisPaths делает запросы к серверу, 
//и передает ответы главному компоненту через props
export async function getStaticProps(router) {
    //Запрос на получение всех заказов, и из конвертация из id в объекты
    const orders = await (await fetch(`${Global.url}/api/getAllOrders`)).json();

    return {
        props: {
            orders: orders
        }
    }

}

export default Orders;