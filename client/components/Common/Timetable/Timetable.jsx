import React from 'react';
import classes from './Timetable.module.scss';

const Timetable = (props) => {
    const timetable = props.timetable;

    function ConvertDay(day) {
        return <div className={classes.event}>
            <span>{day.time.start + ' - ' + day.time.end}</span>
            <p>{day.description}</p>
        </div>
    }

    function InsertItems() {
        const elements = [];
        for(let i = 0; i < timetable.length; i++)
        {
            const all_day = timetable[i];
            //Macket
            //all_day = { time: { start: ..., end: ... }, day: ..., description: ..., id: ... }
            elements.push(<div className={classes.days}>
                <h1>{all_day.day} день</h1>
                {ConvertDay(all_day)}
            </div>);
        }
        return elements;
    }

    return (
        <div className={classes.time_table}>
            {InsertItems()}
        </div>
    )
}

export default Timetable;