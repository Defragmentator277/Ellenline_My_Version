import React, { useState, useEffect } from 'react';
//
import Title from './GeneralJsx/Title.jsx';
//
import classes from './InputDate.module.scss';

const InputDate = (props) => {
    const title = props.title;
    const onChainge = props.onChainge;
    const [date, setDate] = useState(() => {
        if(!props.date)
        {
            let date = new Date();
            let year = date.getFullYear();
            let mounth = date.getMonth() + 1;
            if(mounth < 10)
                mounth = '0' + mounth;
            let day = date.getDate();
            if(day < 10)
                day = '0' + day;
            return year + '-' + mounth + '-' + day;
        }
        else return props.date;
    });
    const [min, setMin] = useState(props.min);
    const [max, setMax] = useState(props.max);

    // useEffect(() => {
    //     document.getElementById('date').value = date;
    // });

    function GenerateTitle() {
        return title ? <Title title={title}/> : '';
    }

    function OnChange(e) {
        const value = e.currentTarget.value;
        if(onChainge)
            onChainge(e, new Date(value));
    }
    
    return (
        <div className={classes.date + ' ' + props.className}>
            {GenerateTitle()}
            <input type="date"
                   min={min}
                   max={max}
                   onChange={(e) => OnChange(e)}/>
        </div>
    )
}

export default InputDate;