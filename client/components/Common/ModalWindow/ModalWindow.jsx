import React, { useState } from 'react';
//
import InputNumber from '../../CustomElements/InputNumber.jsx';
import InputText from '../../CustomElements/InputText.jsx';
import InputBoolean from '../../CustomElements/InputBoolean.jsx';
//
import Global from '../../../pages/global.js';
import classes from './ModalWindow.module.scss';

const ModalWindow = (props) => {
    //state
    const [value, setValue] = useState({}); 
    const [window, setWindow] = useState();
    //all
    const title = props.title;

    //Задаються поля (string, number, boolean, object, 'button') модульного окна или его содержимое 
    const fields = props.fields;
    //originally if type not undefined
    const onChainge = props.onChainge;
    //from the beginning
    const children = props.children;
    const onClose = props.onClose;

    function ShowSubModalWindow() {
        return window ? <ModalWindow {...window} onClose={(e) => setWindow()}/>: '';
    }
    
    function GenerateContent() {
        const elements = [];
        //
        function GenerateSubModalWindow(items) {
            let array = items.props.children;
            if(!Array.isArray(array))
                array = [ array ];
            //
            for(let i = 0; i < array.length; i++)
            {
                const item = array[i];
                if(item.props)
                {
                    //Находит кнопку которая должна открывать модальное окно
                    if(item.props.window)
                    {
                        //В этом случаи item = button
                        function OnClickButton(e) {
                            //item.props.window = { title: ..., fields: ..., onChainge: (e, value) => { ... } }
                            setWindow(item.props.window);
                        }
                        //
                        array[i] = <button onClick={(e) => OnClickButton(e)}>
                            {item.props.window.title}
                        </button>;
                    }
                    else
                        GenerateSubModalWindow(item);
                }
            }
            return array;
        }
        //
        function GenerateField(field, path = []) {

            function GenerateProperties(title) {
                return {
                    classInput: classes.input,
                    title: title,
                    onChainge: 
                    (e, this_value) => 
                    {
                        // setValue() hook здесь может не вызывать, так как здесь идет работа с ссылкой на объект
                        // path указывает на вложенное свойство
                        if(path.length > 0)
                        {
                            if(value[path[0]] == undefined)
                                value[path[0]] = {};
                            let object = value[path[0]];
                            //
                            for(let i = 1; i < path.length; i++)
                            {
                                if(object[path[i]] == undefined)
                                    object[path[i]] = {};
                                object = object[path[i]];
                            }
                            //
                            object[field.prop] = this_value;
                        }
                        else
                            value[field.prop] = this_value;
                        console.log(value);
                    }
                };
            };
            
            function OnClickAddButton(e, OnChainge) {
                setWindow(Object.assign(field.prop, { onChainge: OnChainge }));
            }

            switch(field.type)
            {
                case 'string':
                    return <InputText 
                    {...GenerateProperties(field.prop)}
                    placeholder='Введите текст'/>;
                case 'number':
                    return <InputNumber 
                    {...GenerateProperties(field.prop)}
                    placeholder='Введите число'/>;
                case 'boolean':
                    //Нужно задать начальное состояние
                    value[field.prop] = false;
                    return <InputBoolean 
                    {...GenerateProperties(field.prop)}
                    placeholder='Введите'/>;
                case 'button':
                    //В случаи типа 'button' field.prop хранит в себе объект для создание ModalWindow
                    function OnChainge(e, this_value) {
                        let object = value;
                        let part;
                        //
                        if(path.length > 0)
                        {
                            part = path[0];
                            //
                            if(value[part] == undefined)
                                value[part] = {};
                            object = value[part];
                            //
                            for(let i = 1; i < path.length; i++)
                            {
                                part = path[i];
                                if(object[part] == undefined)
                                    object[part] = {};
                                object = object[part];
                            }
                        }
                        //
                        part = field.title;
                        //
                        if(object[part] == undefined)
                        {
                            this_value.id = 0;
                            object[part] = [ this_value ];
                        }
                        else
                        {
                            this_value.id = object[part].length;
                            object[part].push(this_value);
                        }
                    }
                    //
                    return <div className={classes.massive}>
                        <h1 className={classes.title}>{field.title}</h1>
                        <button className={classes.button} onClick={(e) => OnClickAddButton(e, OnChainge)}>
                            Добавить
                        </button>
                    </div>;
                case 'object':
                    const array = [];
                    //
                    field.prop.forEach(element => {
                        array.push(GenerateField(element, path.concat(field.title)));
                    });
                    //
                    return <div className={classes.object}>
                        <p className={classes.title}>
                            {field.title}
                        </p>
                        {array}
                    </div>;
                default:
                    console.log('THIS TYPE DON`T SUPPORT');
                    return <div>NOTHING DEFAULT</div>;
            }
        }

        if(fields && fields.length != 0)
        {
            for(let i = 0; i < fields.length; i++)
            {
                let field = fields[i];
                //Настроить конвертацию
                //field: { type: ... , prop: ..., [...title] }
                elements.push(GenerateField(field));
            } 
            return elements;
        }
        else
        {
            GenerateSubModalWindow(children);
            return children;
        }
    }

    function GenerateButtons() {

        //Проверяет пусты ли поля
        function CheckEmptyness(properties, object = value, path = []) {
            //true - обязательные поля не заполнены, false - все заполнено
            for(let i = 0; i < properties.length; i++)
            {
                const element = properties[i];
                if(element.type == 'number' 
                && parseInt(object[element.prop]) == 0)
                    continue;
                if(element.type == 'button')
                {
                    if(object[element.title] == undefined)
                    {
                        alert('Заполните массив ' + element.title + ' хотя бы одним значением!');
                        return true;
                    }
                }   
                if(element.type == 'object')
                {
                    if(CheckEmptyness(element.prop, object[element.title], path.concat(element.title)))
                        return true;
                }
                else if((!object[element.prop] 
                && element.type != 'boolean'
                && element.type != 'button'))
                {
                    alert('Поле ' + element.prop + ' не заполнено!');
                    return true;
                }
            }
            return false;
        }

        function ConfirmButton(e) {
            if(fields.length == 1 
            && Object.keys(value).length == 0)
            {
                alert('Значение не может быть пустым!');
                return;
            }
            if(CheckEmptyness(fields))
                return;
            onChainge(e, value);
            onClose(e);
        }

        switch(fields) 
        {
            default:
                return <button onClick={(e) => ConfirmButton(e)}>
                    Потвердить
                </button>
            case undefined:
                return;
        }
        //Может создать кнопку назад?
    }

    return (
        <>
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
            {ShowSubModalWindow()}
        </>
    )
}

export default ModalWindow;