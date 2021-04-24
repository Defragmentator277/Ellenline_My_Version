import React, {useEffect, useState} from 'react'
//
import Title from './GeneralJsx/Title.jsx'
//
import classesInput from './GeneralScss/Input.module.scss'

const InputNumber = (props) => {
    const placeholder = props.placeholder;
    //For end 
    const [value, setValue] = useState(props.value);
    //
    const min = props.min;
    const max = props.max;
    //
    const title = props.title;
    const onChainge = props.onChainge;
    const required = props.required;

    const setInnerValue = props.setInnerValue;
    useEffect(() => {
        if(setInnerValue)
            setInnerValue(setValue);
    }, [value])

    function OnChange(e) {
        const value = parseInt(e.currentTarget.value);
        let new_value = value;
        //
        if(value >= max)
            new_value = max;
        else if(value <= min)
            new_value = min;
        setValue(new_value);
        //
        if(onChainge)
            onChainge(e, new_value);
    }

    function GenerateTitle() {
        return title ? <Title title={title}/> : '';
    }

    function GenerateInput() {
        return <input className={classesInput.input + ' ' + props.classInput}  
        type="number"
        placeholder={placeholder} 
        value={value}
        required={required}
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
