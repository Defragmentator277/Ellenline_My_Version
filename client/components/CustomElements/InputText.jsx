import {useState, useEffect} from 'react'
//
import Title from './GeneralJsx/Title.jsx'
//
import classesInput from './GeneralScss/Input.module.scss'

const InputText = (props) => {
    const [value, setValue] = useState(props.value);
    const title = props.title;
    const onChainge = props.onChainge;

    function GenerateTitle() {
        return title ? <Title title={title}/> : '';
    }

    return (
        <div className={props.className}>
            {GenerateTitle()}
            <input className={classesInput.input + ' ' + props.classInput}   
                   placeholder={props.placeholder}
                   onChange={(e) => onChainge(e)}/>
        </div>
    )
}

export default InputText
