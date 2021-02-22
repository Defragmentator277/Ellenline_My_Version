import React, {useEffect, useState} from 'react'
//
import Title from './GeneralJsx/Title.jsx'
//
import classesInput from './GeneralScss/Input.module.scss'

const InputNumber = (props) => {
    const [value, setValue] = useState(props.value);
    const title = props.title;
    const onChainge = props.onChainge;

    function GenerateTitle() {
        return title ? <Title title={title}/> : '';
    }

    return (
        // UNCOMMENT IF NEEDED RESTORE, ALSO WAS DELETED CLASS classe.input IN input
        <div className={props.className}>
            {GenerateTitle()}
            <input className={classesInput.input + ' ' + props.classInput}  
                type="number"
                placeholder={props.placeholder} 
                min={props.min} max={props.max} 
                onChange={(e) => onChainge(e)}/>
        </div> 
    )
}

export default InputNumber;
