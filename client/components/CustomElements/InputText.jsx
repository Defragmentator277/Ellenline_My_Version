import {useState, useEffect} from 'react'
//
import Title from './GeneralJsx/Title.jsx'
//
import classesInput from './GeneralScss/Input.module.scss'

const InputText = (props) => {
    const placeholder = props.placeholder;
    // props = props.settings;
    const [value, setValue] = useState(props.value);
    const title = props.title;
    const onChainge = props.onChainge;

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
        placeholder={placeholder}
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
