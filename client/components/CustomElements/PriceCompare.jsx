import {useEffect, useState} from 'react';
//
import InputNumber from './InputNumber.jsx';
//
import classes from './PriceCompare.module.scss'

const PriceCompare = (props) => {
    const [min, setMin] = useState(props.min);
    const [max, setMax] = useState(props.max);

    const OnChainge = props.onChainge;

    useEffect(() => {
        const price = { min: min, max: max };
        console.log(price);
        if(OnChainge)
            OnChainge(price);
    });
    
    function MinimumOnChainge(e, value, setter) {
        if(value > max)
            value = max;
        setMin(value);
    }

    function MaximumOnChainge(e, value, setter) {
        if(value < min)
            value = min;
        setMax(value);
    }

    return (
        <div className={classes.compare + ' ' + props.className}>
            <InputNumber
            className={classes.minimum} 
            classTitle={classes.title + ' ' + props.classTitle}
            title='От'
            min='0'
            value={min}
            onChainge={MinimumOnChainge}/>
            {/*  */}
            <InputNumber
            className={classes.maximum}
            classTitle={classes.title + ' ' + props.classTitle}
            title='До'
            min='0'
            value={max}
            onChainge={MaximumOnChainge}/>
        </div>
    )
}

export default PriceCompare
