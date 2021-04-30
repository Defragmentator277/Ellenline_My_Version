import React, { useState, useEffect } from 'react';
//
import Title from './GeneralJsx/Title.jsx';
//
import classes from './InputDate.module.scss';

const InputDate = (props) => {
    function ConvertObjectDateToDate(date) {
        if(!date || typeof date == 'string')
            return date;
        let year = date.getFullYear();
        let mounth = date.getMonth() + 1;
        if(mounth < 10)
            mounth = '0' + mounth;
        let day = date.getDate();
        if(day < 10)
            day = '0' + day;
        return year + '-' + mounth + '-' + day;
    }

    const [min, setMin] = useState(ConvertObjectDateToDate(props.min));
    const [max, setMax] = useState(ConvertObjectDateToDate(props.max));
    //
    const title = props.title;
    const onChainge = props.onChainge;
    const [date, setDate] = useState(() => {
        let date = !props.date ? new Date() : props.date;
        //
        if(date < min)
            date = min;
        else if(date > max)
            date = max;
        //
        return ConvertObjectDateToDate(date);
    });

    // useEffect(() => {
    //     document.getElementById('date').value = date;
    // });

    function GenerateTitle() {
        return title ? <Title title={title}/> : '';
    }

    function OnChange(e) {
        const value = e.currentTarget.value;
        if(onChainge)   
        {
            if(onChainge(e, new Date(value).toISOString()))
                setDate(value);
        }
        else
            setDate(value);
    }
    
    return (
        <div className={classes.date + ' ' + props.className}>
            {GenerateTitle()}
            <input type="date"
                   value={date}
                   min={min}
                   max={max}
                   onChange={(e) => OnChange(e)}/>
        </div>
    )
}

export default InputDate;