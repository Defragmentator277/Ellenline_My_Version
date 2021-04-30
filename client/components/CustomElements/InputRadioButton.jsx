import React, { useState } from 'react';
//
import Title from './GeneralJsx/Title.jsx';
//
import classes from './InputRadioButton.module.scss';

const InputRadioButton = (props) => {
    const [value, setValue] = useState(props.value);
    const title = props.title;
    const checked = props.checked;
    const group = props.group;
    const onChainge = props.onChainge;  

    function OnChange(e) {
        const value = e.currentTarget.value;
        if(onChainge)
            onChainge(e, value);
        setValue(value);
    }

    function GenerateTitle() {
        return title ? <Title className={classes.title} title={title}/> : '';
    }

    function GenerateInput() {
        return <input className={classes.input} type='radio' name={group} value={value} checked={checked} onChange={OnChange}/>;
    }

    return (
        <div className={classes.wrapper + ' ' + props.className}>
            {GenerateInput()}
            {GenerateTitle()}
        </div>
    );
}

export default InputRadioButton;