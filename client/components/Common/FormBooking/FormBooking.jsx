import React, { useEffect, useState } from 'react';
//
import SelectOption from '../../CustomElements/SelectOption.jsx';
import InputText from '../../CustomElements/InputText.jsx';
import InputDate from '../../CustomElements/InputDate.jsx';
import Button from '../../CustomElements/Button.jsx';
import InputNumber from '../../CustomElements/InputNumber.jsx';
import InputTelephone from '../../CustomElements/InputTelephone.jsx';
import InputEmail from '../../CustomElements/InputEmail.jsx';
import ChooseRoom from '../ChooseRoom/ChooseRoom.jsx';
//
import Global from '../../../pages/global.js';
import classes from './FormBooking.module.scss';

const FormBooking = (props) => {
    /////////////////ALL
    //#region Variables
    const timetable = props.timetable;
    const price = props.price;
    //
    const type = props.type;
    const id = props.id;
    //info_person
    const [fio, setFio] = useState();
    const [email, setEmail] = useState();
    const [telephone, setTelephone] = useState();
    //#endregion
    /////////////////ALL

    /////////////////TOURS
    //#region Functions 
    function PrepareTimetable() {
        timetable.forEach((element) => {
            element.date = new Date(element.date).toDateString();
        });
    }
    if(timetable)
        PrepareTimetable();
    //
    function GetDates() {
        const dates = [];
        timetable.forEach((element) => {
            const date = element.date;
            if(!dates.includes(date))
                dates.push(date);
        });
        return dates;
    }
    //
    function GetTimes(date) {
        const times = [];
        timetable.forEach((element) => {
            if(date == element.date)
                times.push(element.time);
        });
        return times;
    }
    //
    function GetTrip(date, time) {
        return timetable.find((element) => element.date == date && element.time == time);
    }
    //#endregion

    //#region Variables THIS ALL VERY BAD REFACTORING NEDEED useEffect hook maybe can help
    const [dateArrival, setDateArrival] = useState(type == 'tours' || type == 'cruises' ? GetDates()[0] : new Date());
    //
    const [times, setTimes] = useState(type == 'tours' || type == 'cruises' ? GetTimes(dateArrival) : null);
    const [time, setTime] = useState(type == 'tours' || type == 'cruises' ? times[0] : null);
    //
    const [trip, setTrip] = useState(type == 'tours' || type == 'cruises' ? GetTrip(dateArrival, time) : null);
    //
    const [tickets, setTickets] = useState(NaN);
    let setInputTickets = setTickets;
    //#endregion
    /////////////////TOURS

    /////////////////RELAX
    const [rooms, setRooms] = useState(type == 'cruises' ? props.rooms.filter((element) => element.id_timetable_departure == trip.id) : prop.rooms);
    // const [rooms, setRooms] = useState(props.rooms);
    const [dateLeave, setDateLeave] = useState(new Date(new Date() - (-new Date(1000 * 60 * 60 * 24))));
    const [reservation, setReservation] = useState(); 
    
    //#region Functions
    function GetNewPrice() {
        let new_price = 0;
        if(dateArrival && dateLeave && reservation)
        {
            new_price += reservation.food.price || 0;
            const days = (new Date(dateLeave) - new Date(dateArrival)) / 1000 / 60 / 60 / 24;
            for(let i = 0; i < days; i++)
            {
                let new_date = new Date(new Date(dateLeave) - (1000 * 60 * 60 * 24 * i));
                let day = new_date.getDay();
                const prices = reservation.room.prices;
                //Выходной 
                if(day == 0 || day == 6)
                    new_price += prices.on_weekends;
                //Будний день
                else
                    new_price += prices.usual;
                //В случаи если был добавлен дополнительный взрослый
                if(reservation.number_of.extra.adult)
                    new_price += prices.extra.adult;
                //В случаи если был добавлен дополнительный ребенок
                if(reservation.number_of.extra.child)
                    new_price += prices.extra.child;
            }
        }
        return new_price;
    }
    //#endregion

    // if(type === 'cruises')
    //     useEffect(() => {
    //         console.log(trip);
    //         // console.log(rooms);
    //         const new_rooms = rooms.filter((element) => {
    //             // console.log('S');
    //             // console.log(parseInt(element.id_timetable_departure));
    //             // console.log(trip.id);
    //             // console.log(parseInt(element.id_timetable_departure) == trip.id);
    //             // console.log('E');

    //             return parseInt(element.id_timetable_departure) == trip.id;
    //         });
    //         setRooms(new_rooms);
    //         // setDateArrival(new Date());
    //         // setDateLeave(new Date(new Date() - (-new Date(1000 * 60 * 60 * 24))));
    //     }, []);
    console.log(rooms);
    /////////////////RELAX

    /////////////////CRUISES
    
    /////////////////CRUISES
    

    function GenerateInfoGoing() {
        //
        function GenerateCapacity() {
            switch(type)
            {
                case 'tours':
                    return trip ? <div className={classes.capacity}>
                        <span>Осталось свободных мест:</span>
                        <h1>{trip.number_of_seats.available}</h1>
                    </div> : '';
                case 'cruises':
                case 'relax':
                    break;
            }
        }
        //
        function GeneratePrice() {
            switch(type)
            {
                case 'tours':
                    return <div className={classes.price}>
                        <span>Итого</span>
                        <h1>{(price * (tickets || 0)).toLocaleString()} руб.</h1>
                    </div>;
                case 'relax':
                    return <div className={classes.price}>
                        <span>Итого</span>
                        <h1>{GetNewPrice()} руб.</h1>
                    </div>;
            }
        
            //WAS CLASS  + ' ' + sections.price_behavior
        }
        //
        let sections = 
        { 
            left_top: undefined,
            right_top: undefined,
            left_bottom: undefined,
            right_bottom: undefined
        };
        //
        switch(type)
        {
            case 'cruises':
                console.log(timetable);
                //#region For cruises function
                function TimeOnChaingeCruises(e) {
                    setInputTickets(NaN);
                    const time = e.currentTarget.value;
                    setTime(time);
                    const trip = GetTrip(dateArrival, time);
                    setRooms(props.rooms.filter((element) => parseInt(element.id_timetable_departure) == trip.id));
                    setTrip(trip);
                }
                //
                function DateOnChaingeCruises(e) {
                    setInputTickets(NaN);
                    const date = e.currentTarget.value;
                    setDateArrival(date);
                    const times = GetTimes(date);
                    setTimes(times);
                    setTime(times[0]);
                    const trip = GetTrip(date, times[0]);
                    setRooms(props.rooms.filter((element) => parseInt(element.id_timetable_departure) == trip.id));
                    setTrip(trip);
                }
                function GetValuesForTimeCruises(setter) {
                    setter(times);
                }
                // 
                function OnChangeRoomCruises(reserv) {
                    setReservation(reserv);
                }
                //#endregion
                sections.left_top = <SelectOption 
                    className={classes.time}
                    title='Выберите дату'
                    values={GetDates()}
                    onChainge={DateOnChaingeCruises}/>;
                //
                sections.right_top = <SelectOption
                    className={classes.time}
                    title='Выберите время'
                    placeholder={time}
                    getValues={(setter) => GetValuesForTimeCruises(setter)}
                    onChainge={TimeOnChaingeCruises}/>;
                //
                // console.log(trip.id);
                const elements = [];
                timetable.forEach((element) => {
                    elements.push(<ChooseRoom className={classes.rooms + ((element.id == trip.id) ? ' ' + classes.delete: '')} rooms={props.rooms.filter((element_in) => parseInt(element_in.id_timetable_departure) == element.id)}/>);
                });
                sections.left_bottom = elements;
                break;
            case 'relax':
                //#region For relax functions
                function OnChangeDateLeave(e, value) {
                    if(new Date(value) <= new Date(dateArrival))
                    {
                        alert('Дата отъезда должна быть меньше даты заезда!');
                        return false;
                    }
                    setDateLeave(value);
                    return true;
                }
                //
                function OnChangeDateArrival(e, value) {
                    if(new Date(value) >= new Date(dateLeave))
                    {
                        alert('Дата заезда должна быть меньше даты отъезда!');
                        return false;
                    }
                    setDateArrival(value);
                    return true;
                }
                // 
                function OnChangeRoom(reserv) {
                    setReservation(reserv);
                }
                //#endregion
                //   
                sections.left_top = <InputDate className={classes.date}
                    title='Дата заезда'
                    date={dateArrival}
                    min={dateArrival}
                    onChainge={OnChangeDateArrival}/>;
                //
                sections.right_top = <InputDate className={classes.date}
                    title='Дата отъезда'
                    date={dateLeave}
                    min={dateLeave}
                    onChainge={OnChangeDateLeave}/>;
                //
                sections.left_bottom =  <ChooseRoom className={classes.rooms} rooms={rooms} onChainge={OnChangeRoom}/>;
                break;
            case 'tours':
                //#region For tours functions
                function TimeOnChainge(e) {
                    setInputTickets(NaN);
                    const time = e.currentTarget.value;
                    setTime(time);
                    const trip = GetTrip(dateArrival, time);
                    setTrip(trip);
                }
                //
                function DateOnChainge(e) {
                    setInputTickets(NaN);
                    const date = e.currentTarget.value;
                    setDateArrival(date);
                    const times = GetTimes(date);
                    setTimes(times);
                    setTime(times[0]);
                    const trip = GetTrip(date, times[0]);
                    setTrip(trip);
                }
                //
                function GetValuesForTime(setter) {
                    setter(times);
                }
                //
                function TickestOnChainge(e, value) {
                    setTickets(value);
                }
                //#endregion

                const available = trip.number_of_seats.available;
                //
                sections.left_top = <SelectOption 
                    className={classes.time}
                    title='Выберите дату'
                    values={GetDates()}//CHAINGE
                    onChainge={DateOnChainge}/>;
                //
                sections.right_top = <SelectOption
                    className={classes.time}
                    title='Выберите время'
                    placeholder={time}
                    getValues={(setter) => GetValuesForTime(setter)}
                    onChainge={(e) => TimeOnChainge(e)}/>
                //
                sections.left_bottom = <InputNumber 
                    className={classes.tickets}
                    title='Введите кол-во билетов'
                    placeholder={'От 1 до ' + available}
                    setInnerValue={(setter) => setInputTickets = (value) => { setter(value); setTickets(value); }}
                    required='true'
                    min='1' max={available}
                    onChainge={TickestOnChainge}/>
                //
                // sections.price_behavior = classes.tours;
                break;
            default:
                console.log(type + ' type don`t support');
                return 'ERROR TYPE: ' + type + ' NOT SUPPORTED';
        }

        return <div className={classes.info_going}>
            {sections.left_top}
            {sections.right_top}
            {/* ROW */}
            {sections.left_bottom}
            {sections.right_bottom}
            {/* ROW */}
            {GenerateCapacity()}
            {GeneratePrice()}
        </div>;
    }

    function GenerateBookingForm() {
        function FioOnChainge(e, value) {
            setFio(value);
        }

        function EmailOnChainge(e, value) {
            setEmail(value);
        }

        function TelephoneOnChainge(e, value) {
            setTelephone(value);
        }

        return <div className={classes.info_person}>
            <InputText 
            className={classes.fio} 
            title='ФИО' 
            required='true'
            placeholder='Имя Фамилия Отчество'
            onChainge={FioOnChainge}/>
            {/*  */}
            <InputEmail 
            className={classes.e_mail} 
            title='E-mail' 
            required='true' 
            placeholder='mymail@mail.ru'
            onChainge={EmailOnChainge}/>
            {/*  */}
            <InputTelephone 
            className={classes.telephone} 
            title='Телефон' 
            required='true'
            onChainge={TelephoneOnChainge}/>
            {/*  */}
            <Button 
            className={classes.button} 
            type='submit' 
            value='Забронировать'/>
            {/*  */}
            <div className={classes.text}>
                <p>
                    Здесь какой-то очень важный <span>текст</span>
                </p>
            </div>
        </div>;
    }

    function SubmitOnClick(e) {
        e.preventDefault();
        //
        if(!/^[a-zA-Zа-яА-Я]+ [a-zA-Zа-яА-Я]+ [a-zA-Zа-яА-Я]+$/.test(fio))
        {
            alert('Поле ФИО должно быть формата: Фамилия Имя Отчество');
            return;
        }
        //Аналогично
        //Создание связи между автобусным туром и клиентом
        function CreateReservation(id_user) {
            let prop;
            switch(type)
            {
                case 'tours':
                    //Глубокое копирование объекта
                    const new_trip = JSON.parse(JSON.stringify(trip));
                    delete new_trip.number_of_seats;   
                    prop = { 
                        key: 'tours_orders',
                        new_value: {
                            id_tour: Global.ConvertToDBRef('tours', id),
                            timetable_departure: new_trip,
                            tickets: tickets,
                            price: price * tickets,
                            status: 0
                            // id_timetable_departure: trip.id,
                            // id_user: Global.ConvertToDBRef('users', id_user),
                            // tickets: tickets,
                            // price: price * tickets,

                        }
                    };
                    break;
                case 'relax':
                    //Глубокое копирование объекта
                    const new_room = JSON.parse(JSON.stringify(reservation.room));
                    delete new_room.number_of.rooms;
                    prop = {
                        key: 'relax_orders',
                        new_value: {
                            id_relax: Global.ConvertToDBRef('relax', id),
                            room: new_room,
                            number_of: reservation.number_of,
                            type_of_food: reservation.food.type,
                            date_arrival: dateArrival,
                            date_leave: dateLeave,
                            price: GetNewPrice(),
                            status: 0
                            // id_room: reservation.id_room,
                            // id_user: Global.ConvertToDBRef('users', id_user),
                            // number_of: reservation.number_of,
                            // date_arrival: dateArrival,
                            // date_leave: dateLeave,
                            // price: GetNewPrice()
                        }
                    }
                    break;
            }
            // console.log('NEW ORDER OBJECT');
            // console.log(prop);
            // return;
            fetch(`${Global.url}/api/db/users/update?id=${id_user}&prop=${JSON.stringify(prop)}&operator=$push`)
            .then((res) => 
            {
                console.log('Успех выбранный отдых забронирован');
                return res.json();
            })
            .then((res) => 
            {
                console.log(res);
                alert('Спасибо за вашу покупку, мы свяжемся с вами в ближайшее время!');
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
        //Аналогично
        //Идентификация пользователя в слуачи совпадение email-ov
        function IdentifyUser() {
            fetch(`${Global.url}/api/db/users`)
            .then((res) => 
            {
                console.log('Успех идентификации пользователя');
                return res.json();
            })
            .then((res) => 
            {
                console.log(res);
                CreateReservation(res.find((element) => element.email == email)._id);
            })
            .catch((err) => 
            {
                console.log('Ошибка идентификации пользователя');
                return err.json();
            })
            .catch((err) => 
            {
                console.log(err);
            });
        }
        //Аналогично
        //Создание аккаунт пользователю, если существует идентифицирует
        function CreateUser() {
            const inital = fio.trim().split(' ');
            const user = {
                login: 'user_login',
                password: 'user_password',
                name: inital[0],
                surname: inital[1],
                middle_name: inital[2],
                email: email,
                telephone: telephone,
                tours_orders: [],
                relax_orders: [],
                cruises_orders: []
            };
            fetch(`${Global.url}/api/db/users/insert?object=${JSON.stringify(user)}`)
            .then((res) => 
            {
                console.log('Успех');
                return res.json();
            })
            .then((res) => 
            {
                if(res.code == 11000)
                {
                    console.log('Данный пользователь уже существует!');
                    alert('Рады снова вас видеть ' + fio.trim() + '!');
                    IdentifyUser();

                }
                else
                {
                    console.log('Была созданна запись с новым пользователем!');
                    CreateReservation(res.insertedId);
                }
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
        //Уменьшение сидение в автобусе
        function DecrementSeats(prop, next, prop_next) {
            fetch(`${Global.url}/api/db/${type}/update?id=${id}&prop=${JSON.stringify(prop)}&operator=${'$inc'}`)
            .then((res) => 
            {
                console.log('Успех значение ' + prop.key + (prop.new_value >= 0 ? ' увеличенно' : ' уменьшенно') + '!');
                return res.json();
            })
            .then((res) => 
            {
                console.log(res);
                if(prop_next)
                    // next(prop_next.key, prop_next.isPos, prop_next.next, prop_next.prop_next);
                    next(prop_next.prop, prop_next.next, prop_next.prop_next)
                else
                    next();
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

        //Вызов api машрута в зависимости от типа отдыха
        switch(type)
        {
            case 'tours':
                DecrementSeats({ id: trip.id, path: 'timetable_departure', key: 'number_of_seats.available', new_value: -1 * tickets }, DecrementSeats, 
                       { prop: { id: trip.id, path: 'timetable_departure', key: 'number_of_seats.occupied', new_value: tickets }, next: CreateUser });
                break;
            case 'relax':
                DecrementSeats({ id: reservation.id_room, path: 'rooms', key: 'number_of.rooms.available', new_value: -1 }, DecrementSeats, 
                       { prop: { id: reservation.id_room, path: 'rooms', key: 'number_of.rooms.occupied', new_value: 1 }, next: CreateUser });
                break;
            case 'cruises':
                break;
        }
    }

    return(
        <form className={classes.booking + ' ' + props.className} onSubmit={SubmitOnClick}>
            {/* SEPARATOR */}
            {GenerateInfoGoing()}
            {/* SEPARATOR */}
            {GenerateBookingForm()}
        </form>
    )
}

export default FormBooking;