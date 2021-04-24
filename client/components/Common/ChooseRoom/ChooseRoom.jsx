import React, { useState } from 'react';
//
import Slider from '../../CustomElements/Slider.jsx';
//
import classes from './ChooseRoom.module.scss';

const ChooseRoom = (props) => {
    const [index, setIndex] = useState(0);
    const rooms = props.rooms;

    function GenerateSlider() {
        function OnChainge(index) {
            console.log('NEW INDEX');
            console.log(index);
            setIndex(index);
        }
        //
        const images = rooms.map((element) => element.image);

        return <Slider className={classes.slider} images={images} index={index} onChainge={OnChainge}/>;
    }

    function GenerateContent() {
        const room = rooms[index];

        function GeneratePersons() {
            const seats = room.number.of_seats;
            const elements = [];

            for(let i = 0; i < seats.adult; i++)
            {
                elements.push(<i class="fa fa-user" aria-hidden="true"></i>);
            }

            for(let i = 0; i < seats.child; i++)
            {
                elements.push(<i class="fa fa-child" aria-hidden="true"></i>);
            }

            return <div className={classes.persons}>
                {elements}
            </div>;
        }

        function GenerateCorpus() {
            if(room.corpus)
                return <div className={classes.corpus}>
                    <p>Корпус: {room.corpus}</p>
                </div>;
        }

        function GeneratePrices() {
            const prices = room.prices;

            function GenerateAdditionalSeat() {
                const extra = prices.extra;

                if(extra.adult || extra.child)
                    return <>
                        <div className={classes.left}>
                            <p>Цена за дополнительное место</p>
                        </div>
                        <div className={classes.right}>
                            {extra.adult ? <p>взрослому: {extra.adult}</p> : null}
                            {extra.child ? <p>ребенку: {extra.child}</p> : null}
                        </div>
                    </>;
            }


            return <div className={classes.prices}>
                <div className={classes.left}>
                    <p>Цена за ночь</p> 
                </div>
                <div className={classes.right}>
                    <p>в будние дни: {prices.usual}</p>
                    <p>в выходные дни: {prices.on_weekends}</p>
                </div>
                {GenerateAdditionalSeat()}
            </div>
        }

        function GeneratePets() {
            return <div className={classes.pets}>
                <p>{(room.pets ? 'Можно' : 'Нельзя') + ' приводить домашних питомцев с собой'}</p>
            </div>
        }

        function GenerateFood() {
            const food = room.prices_of_food;

            //ЗАМЕНИТЬ НА RADIOBUTTON`S
            if(food.bb || food.hb || food.fb)
                return <div className={classes.food}>
                    <p className={classes.title}>Виды питания в отеле</p>
                    {food.bb ? <p className={classes.type}>{'Стоимость только завтрака: ' + food.bb}</p> : null}
                    {food.hb ? <p className={classes.type}>{'Стоимость завтрака и ужина: ' + food.hb}</p> : null}
                    {food.fb ? <p className={classes.type}>{'Стоимость завтрака, обеда и ужина: ' + food.fb}</p> : null}
                </div>
        }

        return <div className={classes.content}>
            <p className={classes.title}>{room.category}</p>
            <br/>
            {GeneratePersons()}
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