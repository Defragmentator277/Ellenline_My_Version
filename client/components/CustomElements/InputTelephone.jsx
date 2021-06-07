import {useState, useEffect} from 'react'
//
import Title from './GeneralJsx/Title.jsx'
//
import classesInput from './GeneralScss/Input.module.scss'

const InputText = (props) => {
    const placeholder = props.placeholder || '+70000000000';
    const [value, setValue] = useState(props.value);
    const title = props.title;
    const onChainge = props.onChainge;
    const required = props.required;

    function OnChange(e) {
        const value = e.currentTarget.value;
        if(onChainge)
            onChainge(e, value);
    }

    function GenerateTitle() {
        return title ? <Title title={title}/> : '';
    }

    function GenerateInput() {
        return <input className={classesInput.input + ' ' + props.classInput}   
        type='tel'
        placeholder={placeholder}
        required={required}
        pattern='\+7[0-9]{10}'
        onChange={(e) => OnChange(e)}/>
    }

    return (
        <div className={props.className}>
            {GenerateTitle()}
            {GenerateInput()}
        </div>
    )
}

export default InputText;
