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

    //#region Variables 
    const [dateArrival, setDateArrival] = useState(type == 'tours' ? GetDates()[0] : null);
    //
    const [times, setTimes] = useState(type == 'tours' ? GetTimes(dateArrival) : null);
    const [time, setTime] = useState(type == 'tours' ? times[0] : null);
    //
    const [trip, setTrip] = useState(type == 'tours' ? GetTrip(dateArrival, time) : null);
    //
    const [tickets, setTickets] = useState(NaN);
    let setInputTickets = setTickets;// MAYBE THIS VERY BAD
    //#endregion
    /////////////////TOURS

    /////////////////RELAX
    const rooms = props.rooms;
    const [dateLeave, setDateLeave] = useState();
    /////////////////RELAX

    /////////////////PREPARE VARIABLES
    /////////////////PREPARE VARIABLES

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
                    break;
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
            // title_time: undefined, // title first date
            // date_or_time: undefined, 
            // room_or_tickets: undefined,
            // price_behavior: undefined
        };
        //
        switch(type)
        {
            case 'relax':
            case 'cruises':
                sections.left_top = <InputDate className={classes.date}
                    title='Дата заезда'
                    date={dateLeave}/>;
                sections.right_top = <InputDate className={classes.date}
                    title='Дата отъезда'
                    date={dateLeave}/>;
                sections.left_bottom = <ChooseRoom className={classes.rooms} rooms={rooms}/>;
                //LATE CHAINGE TO SELECT ENTERED
                // sections.left_bottom = <SelectOption 
                //     className={classes.parents}
                //     values={[ '1 взрослый', '2 взрослый' ]} 
                //     placeholder='Взрослые'/>;
                // sections.right_bottom = <SelectOption 
                //     className={classes.childs}
                //     type='dynamic' 
                //     values={[ 'Волк одиночка', 'Ребёнок', 'Питомец' ]}
                //     placeholder='Волк одиночка'/>;
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
        //Создание связи между автобусным туром и клиентом
        function CreateReservation(id_user) {
            const prop = { 
                key: 'clients',
                new_value: {
                    id_timetable_departure: trip.id,
                    id_user: Global.ConvertToDBRef('users', id_user),
                    tickets: tickets,
                    price: price * tickets,
                }
            };
            console.log()
            fetch(`${Global.url}/api/db/${type}/update?id=${id}&prop=${JSON.stringify(prop)}&operator=$push`)
            .then((res) => 
            {
                console.log('Успех автобусный тур забронирован');
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
        //Создание аккаунт пользователю, если существует идентифицирует
        function CreateUser() {
            const inital = fio.trim().split(' ');
            const user = {
                name: inital[0],
                surname: inital[1],
                middle_name: inital[2],
                email: email,
                telephone: telephone
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
        function DecrementSeats(key, isPos = false, next, prop_next) {
            const prop = { 
                id: trip.id,
                path: 'timetable_departure',
                key: 'number_of_seats.' + key,
                new_value: (isPos ? 1 : -1 ) * tickets
            };
            //
            fetch(`${Global.url}/api/db/${type}/update?id=${id}&prop=${JSON.stringify(prop)}&operator=${'$inc'}`)
            .then((res) => 
            {
                console.log('Успех значение ' + key + (isPos ? ' увеличенно' : ' уменьшенно') + '!');
                return res.json();
            })
            .then((res) => 
            {
                console.log(res);
                if(prop_next)
                    next(prop_next.key, prop_next.isPos, prop_next.next, prop_next.prop_next);
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
        //
        DecrementSeats('available', false, DecrementSeats, { key: 'occupied', isPos: true, next: CreateUser });
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