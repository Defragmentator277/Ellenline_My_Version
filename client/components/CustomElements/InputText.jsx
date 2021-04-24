import {useState, useEffect} from 'react'
//
import Title from './GeneralJsx/Title.jsx'
//
import classesInput from './GeneralScss/Input.module.scss'

const InputText = (props) => {
    const [value, setValue] = useState(props.value);
    const placeholder = props.placeholder;
    const title = props.title;
    const onChainge = props.onChainge;
    const required = props.required;
    //
    const regex = props.regex;

    function OnChange(e) {
        const value = e.currentTarget.value;
        let new_value = value;
        if(regex && !regex.test(value))
            new_value = null;
        setValue(new_value);
        if(onChainge)
            onChainge(e, new_value);
    }

    function GenerateTitle() {
        return title ? <Title title={title}/> : '';
    }

    function GenerateInput() {
        return <input className={classesInput.input + ' ' + props.classInput}   
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => OnChange(e)}/>
    }

    return (
        <div className={props.className}>
            {GenerateTitle()}
            {GenerateInput()}
        </div>
    )
}

export default InputText
