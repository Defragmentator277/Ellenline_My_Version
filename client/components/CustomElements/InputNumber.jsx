import React, {useEffect, useState} from 'react'
//
import Title from './GeneralJsx/Title.jsx'
//
import classesInput from './GeneralScss/Input.module.scss'

const InputNumber = (props) => {
    const placeholder = props.placeholder;
    //For end 
    const [value, setValue] = useState(props.value);
    const title = props.title;
    const onChainge = props.onChainge;

    function OnChange(e) {
        const value = parseInt(e.currentTarget.value);
        if(onChainge)
            onChainge(e, value);
    }

    function GenerateTitle() {
        return title ? <Title title={title}/> : '';
    }

    function GenerateInput() {
        return <input className={classesInput.input + ' ' + props.classInput}  
        type="number"
        placeholder={placeholder} 
        min={props.min} max={props.max} 
        onChange={(e) => OnChange(e)}/>;
    }

    return (
        <div className={props.className}>
            {GenerateTitle()}
            {GenerateInput()}
        </div> 
    )
}

export default InputNumber;
