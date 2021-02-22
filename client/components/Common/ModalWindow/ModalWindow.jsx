import React, { useState } from 'react';
//
import InputNumber from '../../CustomElements/InputNumber.jsx';
import InputText from '../../CustomElements/InputText.jsx';
//
import Global from '../../../pages/global.js';
import classes from './ModalWindow.module.scss';

const ModalWindow = (props) => {
    //state
    const [value, setValue] = useState(new Object()); 
    //all
    const title = props.title;

    //Задаеться либо изначальный тип (string, number) модульного окна или его содержимое 
    const fields = props.fields;
    //originally if type not undefined
    const onChainge = props.onChainge;
    //from the beginning
    const children = props.children;
    const onClose = props.onClose;
    
    function GenerateContent() {
        const elements = [];
        if(fields && fields.length != 0)
        {
            const isObject = fields.length > 1;
            let properties = 
            {
                classInput:classes.input,
                title: undefined,
                onChainge: undefined
            };
            for(let i = 0; i < fields.length; i++)
            {
                let field = fields[i];
                //field: { type: ... , prop: ... }
                properties.title = field.prop//Global.FirstLetter(field.prop);
                properties.onChainge = isObject ? 
                (e) => 
                {
                    // setValue() hook здесь может не вызывать так как здесь идет работа с ссылкой на объект
                    value[field.prop] = e.currentTarget.value;
                }:
                (e) => 
                {
                    setValue(e.currentTarget.value);
                };
                switch(field.type)
                {
                    case 'string':
                        elements.push(<InputText 
                        placeholder='Введите текст' {...properties}/>);
                        break;
                    case 'number':
                        elements.push(<InputNumber 
                        placeholder='Введите число' {...properties}/>);
                        break;
                    default:
                        console.log('THIS TYPE DON`T SUPPORT');
                        break;
                }
            }
            return elements;
        }
        else
            return children;
    }

    function GenerateButtons() {
        switch(fields) 
        {
            default:
                return <button onClick={(e) => 
                {
                    onChainge(e, value);
                    onClose(e);
                }}>
                    Потвердить
                </button>
            case undefined:
                return;
        }
    }

    return (
        <div className={classes.modal_overlay}>
            <div className={classes.modal}>
                <h1 className={classes.title}>{title}</h1>
                
                <div className={classes.separator}></div>
                
                <div className={classes.content + ' ' + props.className}>
                    {GenerateContent()}
                </div>

                <div className={classes.separator}></div>

                <div className={classes.buttons}>
                    <button onClick={(e) => onClose(e)}>
                        Закрыть
                    </button>
                    {GenerateButtons()}
                </div>
            </div>
        </div>
    )
}

export default ModalWindow;