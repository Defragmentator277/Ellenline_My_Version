import React from 'react';
//
import Title from './GeneralJsx/Title.jsx';
//
import classes from './InputTime.module.scss';

const InputTime = (props) => {
    const title = props.title;
    const onChainge = props.onChainge;

    function GenerateTitle() {
        return title ? <Title title={title}/> : '';
    }

    function OnChange(e) {
        const value = e.currentTarget.value;
        if(onChainge)
            onChainge(e, value);
    }

    return(
        <div className={classes.time + ' ' + props.className}>
            {GenerateTitle()}
            <input className={classes.input + ' ' + props.classInput} 
                   type='time'
                   onChange={(e) => OnChange(e)}/>
        </div>
    )
}

export default InputTime;