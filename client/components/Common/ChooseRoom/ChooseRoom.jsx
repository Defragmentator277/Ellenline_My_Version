import React, { useState, useEffect } from 'react';
//
import Slider from '../../CustomElements/Slider.jsx';
import InputRadioButton from '../../CustomElements/InputRadioButton.jsx';
import InputBoolean from '../../CustomElements/InputBoolean.jsx';
//
import classes from './ChooseRoom.module.scss';

const ChooseRoom = (props) => {
    const [rooms, setRooms] = useState(props.rooms);
    const [index, setIndex] = useState(0);
    // const [room, setRoom] = useState(rooms[index]);
    const getValues = props.getValues;
    const room = rooms[index];
    const type = props.type;
    //
    const start_state = {
        // id_room: room.id,
        room: room,
        number_of: {
            adult: 1,
            child: 0,
            extra: {
                adult: 0,
                child: 0
            }
        },
        food: {
            type: '',
            price: ''
        }
        // food: '',
        // prices: {
        //     usual: 0,
        //     on_weekends: 0
        // }
    };
    const [reservation, setReservation] = useState(start_state);
    const onChainge = props.onChainge;

    function GenerateReservationDependOnIndex(index) {
        const new_obj = Object.assign({}, start_state);
        const room = rooms[index];
        // new_obj.id_room = room.id;
        // new_obj.prices = room.prices;
        new_obj.room = room;
        setReservation(new_obj);
        setIndex(index);
    }

    useEffect(() => {
        GenerateReservationDependOnIndex(0);
        // if(getValues)
        //     getValues(setRooms);
    }, [])

    useEffect(() => {
        if(onChainge)
            onChainge(reservation);
    });

    function GenerateSlider() {
        function OnChainge(index) {
            GenerateReservationDependOnIndex(index);
        }
        //
        const images = rooms.map((element) => element.image);
        //
        return <Slider className={classes.slider} images={images} index={index} onChainge={OnChainge}/>;
    }

    function GenerateContent() {
        function GeneratePersons() {
            const seats = room.number_of.seats;
            const elements = [];

            function GenerateAgeGroup(prop) {
                function GetConvert() {
                    switch(prop)
                    {
                        case 'adult':
                            return 'user';
                        case 'child':
                            return 'child';
                    }
                }

                for(let i = 0; i < seats[prop]; i++)
                {
                    function OnMouseDown(e) {
                        if(i == 0 && prop == 'adult')
                            return;
                        const new_obj = Object.assign({}, reservation);
                        if(new_obj.number_of[prop] != i + 1)
                            new_obj.number_of[prop] = i + 1;
                        else
                            new_obj.number_of[prop] = prop == 'adult' ? 1 : 0;
                        setReservation(new_obj);
                    }

                    let color;
                    if(reservation.number_of[prop] > i)
                        color = { color: 'black' };
                    
                    // WAS DELETED  onMouseDown={OnMouseDown} ANS ALSO style={color}
                    elements.push(<i class={"fa fa-" + GetConvert()} onMouseDown={OnMouseDown} style={color} aria-hidden="true"></i>);
                }
            }

            GenerateAgeGroup('adult');
            GenerateAgeGroup('child');

            return <div className={classes.persons}>
                {elements}
            </div>;
        }

        function GenerateCapacityRooms() {
            function GenerateInfoBasedOnType() {
                switch(type)
                {
                    case 'relax':
                        return 'комнат';
                    case 'cruises':
                        return 'кают';
                    default:
                        return;
                }
            }

            const capacity = room.number_of.rooms;

            return <div className={classes.capacity}>
                <p>Доступно {GenerateInfoBasedOnType()} {capacity.available} из {capacity.available + capacity.occupied}</p>
            </div>;
        }

        function GenerateCorpus() {
            function GenerateInfoBasedOnType() {
                switch(type)
                {
                    case 'relax':
                        return 'Корпус';
                    case 'cruises':
                        return 'Палуба';
                    default:
                        return;
                }
            }


            if(room.corpus)
                return <div className={classes.corpus}>
                    <p className={classes.title}>{GenerateInfoBasedOnType()}:</p>
                    <p className={classes.text}>{room.corpus}</p>
                </div>;
        }

        function GeneratePrices() {
            const prices = room.prices;

            function GenerateUsualPrice() {
                const words = {
                    title: null,
                    usual_price: null
                };
                //
                switch(type)
                {
                    case 'relax':
                        words.title = 'ночь';
                        words.usual_price = 'В будние дни:';
                        // return 'ночь';
                        break;
                    case 'cruises':
                        words.title = 'круиз';
                        words.usual_price = 'Вместе с каютой:';
                        // return 'круиз';
                        break;
                }
                //
                return <>
                    <div className={classes.title}>
                        <p>Цена за {words.title}</p> 
                    </div>
                    <div className={classes.right}>
                        {prices.usual ? <p>{words.usual_price} {prices.usual} руб.</p>: null}
                        {prices.on_weekends ? <p>В выходные дни: {prices.on_weekends} руб.</p> : null}
                    </div>
                </>;
            }

            function GenerateAdditionalSeat() {
                const extra = prices.extra;

                function OnChainge(e, value, prop) {
                    const new_obj = Object.assign({}, reservation);
                    new_obj.number_of.extra[prop] = value;
                    setReservation(new_obj);
                }

                if(extra.adult || extra.child)
                    return <>
                        <div className={classes.title}>
                            <p>Цена за дополнительное место</p>
                        </div>
                        <div className={classes.right}>
                            {extra.adult ? <InputBoolean title={'Взрослому: ' + extra.adult + 'руб.'} name='old' onChainge={(e, value) => OnChainge(e, value, 'adult')}/> : null}
                            {extra.child ? <InputBoolean title={'Ребенку: ' + extra.child + 'руб.'} name='new' onChainge={(e, value) => OnChainge(e, value, 'child')}/> : null}
                        </div>
                    </>;
            }


            return <div className={classes.prices}>
                {GenerateUsualPrice()}
                {GenerateAdditionalSeat()}
            </div>
        }

        function GeneratePets() {
            return <div className={classes.pets}>
                <p>{(room.pets ? 'Можно' : 'Нельзя') + ' приводить домашних питомцев с собой'}</p>
            </div>
        }

        function GenerateFood() {
            function ConvertProp(prop) {
                switch(prop)
                {
                    case 'bb':
                        return 'Стоимость только завтрака: ';
                    case 'hb':
                        return 'Стоимость завтрака и ужина: ';
                    case 'fb':
                        return 'Стоимость завтрака, обеда и ужина: ';
                    case '':
                        return 'Отказаться';
                    default:
                        return 'Такого питания нету в нашем списке';
                }
            }

            const food = Object.assign({ '': null }, room.prices_of_food);
            const food_types = Object.keys(food);
            const elements = [];

            const FoodSection = ({ children }) => {
                return (
                    <div className={classes.food}>
                        {children ? <>
                            <p className={classes.title}>Виды питания в отеле</p>
                            <div className={classes.type_food}>{children}</div> 
                        </> : ''}
                    </div>
                )
            };

            if(food_types.length > 0)
            {
                for(let i = 0; i < food_types.length; i++)
                {
                    const price = food[food_types[i]];
                    const title = price != null ? ConvertProp(food_types[i]) + (price || 'бесплатно') : 'Отказаться';
                    //
                    function OnChainge(e, value) {
                        const new_obj = Object.assign({}, reservation);
                        new_obj.food = { 
                            type: value,
                            price: price
                        };
                        setReservation(new_obj);
                    }
                    //
                    elements.push(<InputRadioButton 
                        className={classes.type} 
                        title={title} 
                        value={food_types[i]}
                        checked={reservation.food.type === food_types[i]}
                        onChainge={OnChainge}/>);
                }
                return <FoodSection>
                    {elements}
                </FoodSection>
            }
            else
                return <FoodSection/>;
        }

        return <div className={classes.content}>
            <p className={classes.title}>{room.category}</p>
            {GeneratePersons()}
            {GenerateCapacityRooms()}
            {GenerateCorpus()}
            {GeneratePrices()}
            {GeneratePets()}
            {GenerateFood()}
        </div>;
    }

    return(
        <div className={classes.choose_room + ' ' + props.className}>
            {GenerateSlider()}
            {GenerateContent()}
        </div>
    )
}

export default ChooseRoom;
// export default React.memo(ChooseRoom, (prevProps, nextProps) => {
//     console.log('shouldComponentUpdate()'),
//     console.log(prevProps);
//     console.log(nextProps);
//     console.log(prevProps.rooms != nextProps.rooms);
//     return prevProps.rooms != nextProps.rooms;
//     if(prevProps.rooms != nextProps.rooms)
//         return false;
//     return prevProps == nextProps;
// });