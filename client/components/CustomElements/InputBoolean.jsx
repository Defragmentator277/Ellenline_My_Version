import React, { useState } from 'react';
//
import Title from './GeneralJsx/Title.jsx';
//
import classesInput from './GeneralScss/Input.module.scss'
import classes from './InputBoolean.module.scss';

const InputBoolean = (props) => {
    const placeholder = props.placeholder;
    const [value, setValue] = useState(props.value);
    const title = props.title;
    const onChainge = props.onChainge;

    function OnChange(e) {
        onChainge(e, e.currentTarget.checked);
    }

    function GenerateTitle() {
        return title ? <Title className={classes.title} title={title}/> : '';
    }

    function GenerateInput() {
        return <input 
        className={classes.input + ' ' + classesInput.input}
        type='checkbox'
        checked={value}
        onChange={(e) => OnChange(e)}/>;
    }

    return (
        <div className={classes.wrapper + ' ' + props.className}>
            {GenerateInput()}
            {GenerateTitle()}
        </div>
    )
}

export default InputBoolean;