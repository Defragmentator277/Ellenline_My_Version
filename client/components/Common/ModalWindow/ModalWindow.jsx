import React, { useState } from 'react';
////
import InputNumber from '../../CustomElements/InputNumber.jsx';
import InputText from '../../CustomElements/InputText.jsx';
import InputBoolean from '../../CustomElements/InputBoolean.jsx';
import InputDate from '../../CustomElements/InputDate.jsx';
import InputTime from '../../CustomElements/InputTime.jsx';
import SelectOption from '../../CustomElements/SelectOption.jsx';
//
import ContextMenu from '../ContextMenu/ContextMenu.jsx';
////
import Global from '../../../pages/global.js';
import Presets from './ModalWindowPresets.json';;
import classes from './ModalWindow.module.scss';

const ModalWindow = (props) => {
    //state
    const [value, setValue] = useState({}); 
    const [window, setWindow] = useState();
    const [contextMenu, setContextMenu] = useState();
    const up_value = props.up_value;
    //all
    const title = props.title;  

    //Преднастройка имеет самый высокий приоритет
    const preset = props.preset;
    //Задаються поля (string, number, boolean, object, 'button') модульного окна или его содержимое 
    const fields = preset ? Presets[preset] : props.fields;
    //originally if type not undefined
    const onChainge = props.onChainge;
    //Variables from the beginning
    const children = props.children;
    const onClose = props.onClose;
    const buttons = props.buttons || { close: true };

    function ShowSubModalWindow() {
        return window ? <ModalWindow {...window} onClose={(e) => setWindow()}/>: '';
    }

    function ShowContextMenu() {
        return contextMenu ? <ContextMenu {...contextMenu}/>: '';
    }
    
    function GenerateContent() {
        
        function GenerateSubModalWindow(items) {
            let array = items.props.children;
            if(!Array.isArray(array))
                array = [ array ];
            //
            for(let i = 0; i < array.length; i++)
            {
                const item = array[i];
                if(item && item.props)  
                {
                    //Находит кнопку которая должна открывать модальное окно
                    if(item.props.window)
                    {
                        //В этом случаи item = button
                        function OnClickButton(e) {
                            //item.props.window = { title: ..., fields: ..., onChainge: (e, value) => { ... } }
                            const str = item.props.window.toGetInnerIds;
                            //
                            item.props.window.fields = item.props.window.fields.map((element) => Global.ConvertToFieldsAddButtonMassive(element));
                            //
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

        function GenerateFields(fields) {

            function GenerateField(field, path = []) {

                function SetValueOfPropertie(this_value, last_field = field.prop) {
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
                        object[last_field] = this_value;
                    }
                    else
                        value[last_field] = this_value;
                }
    
                function GetValueOfPropertie(path) {
                    if(!up_value)
                        return null;
                    if(path.length > 0)
                    {
                        if(up_value[path[0]] == undefined)
                            return null;
                        let object = up_value[path[0]];
                        //
                        for(let i = 1; i < path.length; i++)
                        {
                            if(object[path[i]] == undefined)
                                return null;
                            object = object[path[i]];
                        }
                        //
                        return object;
                    }   
                    else
                        return up_value;
                }
    
                function GenerateProperties(title) {
                    return {
                        classInput: classes.input,
                        title: title,
                        onChainge: 
                        (e, this_value) => 
                        {
                            // setValue() hook здесь может не вызывать, так как здесь идет работа с ссылкой на объект
                            // path указывает на вложенное свойство
                            SetValueOfPropertie(this_value)
                            return true;
                        }
                    };
                };
                
                function OnClickAddButton(e, OnChainge) {
                    setWindow(Object.assign(field.prop, { onChainge: OnChainge, up_value: up_value || value }));
                }
    
                switch(field.type)
                {
                    case 'string':
                        return <InputText 
                        {...GenerateProperties(field.translate || field.prop)}
                        placeholder='Введите текст'
                        isPassword={field.secret}/>;
                    case 'number':
                        return <InputNumber 
                        {...GenerateProperties(field.translate || field.prop)}
                        min={field.min}
                        max={field.max}
                        placeholder='Введите число'/>;
                    case 'boolean':
                        //Нужно задать начальное состояние
                        SetValueOfPropertie(false);
                        return <InputBoolean 
                        {...GenerateProperties(field.translate || field.prop)}
                        placeholder='Введите'/>;
                    case 'date':
                        return <InputDate
                        {...GenerateProperties(field.translate || field.prop)}/>;
                    case 'time':
                        return <InputTime
                        {...GenerateProperties(field.translate || field.prop)}/>;
                    case 'combobox':
                        return <SelectOption
                        {...GenerateProperties(field.translate || field.prop)}
                        placeholder='Выберите значение'
                        classSelect={classes.input + ' ' + classes.select}
                        values={field.items}/>;
                    case 'InnerId':
                        const ids = GetValueOfPropertie(field.ref.split('.'))?.map((element) => element.id) || [];
                        //
                        return <SelectOption
                        title={field.prop}
                        placeholder='Выберите айди'
                        classSelect={classes.input + ' ' + classes.select}
                        onChainge={(e, value) => SetValueOfPropertie(value)}
                        isOnce={true}
                        values={ids}
                        getValues={(values) => field.getValues(values)}/>;
                    case 'OtherId':
                        return <SelectOption
                        title={field.translate || field.prop}
                        placeholder='Выберите айди'
                        classSelect={classes.input + ' ' + classes.select}
                        onChainge={(e, value) => SetValueOfPropertie(Global.ConvertToDBRef(field.ref, value))}
                        isOnce={true}
                        getValues={(values) => field.getValues(values)}/>;
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
                        // SetValueOfPropertie([], field.title);
                        return <div className={classes.massive}>
                            <h1 className={classes.title}>{field.translate || field.title}</h1>
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
                        console.log(field);
                        //
                        return <div className={classes.object}>
                            <p className={classes.title}>
                                {field.translate || field.title}
                            </p>
                            {array}
                        </div>;
                    default:
                        console.log('THIS TYPE DON`T SUPPORT');
                        return <div>NOTHING DEFAULT</div>;
                }
            }
            //
            const elements = [];
            for(let i = 0; i < fields.length; i++)
            {
                let field = fields[i];
                elements.push(GenerateField(field));
            } 
            return elements;
        }

        //Опции генерации модульного окна
        if(fields && fields.length != 0)
        {
            return GenerateFields(fields);
        }
        else
        {
            if(children)
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
                if(element.type == 'number')
                {
                    const value = parseInt(object[element.prop]);
                    if(value == 0)
                        continue;
                }
                if(element.type == 'button')
                {
                    if(object[element.title] == undefined)
                    {
                        const min = element.min || 0;
                        console.log(min);
                        //Доработать
                        if(min == 0)
                        {
                            object[element.title] = object[element.title] || [];
                        }
                        else if((object[element.title]?.length || 0) < min)
                        {
                            alert('Заполните массив ' + (element.translate || element.title) + ' ' + min + (min == 1 ? '  значение' : ' значениями') + '!');
                            return true;
                        }
                    }
                }   
                else if(element.type == 'object')
                {
                    if(CheckEmptyness(element.prop, object[element.title], path.concat(element.title)))
                        return true;
                }
                else if(!object[element.prop] 
                && element.type != 'boolean')
                {
                    alert('Поле ' + (element.translate || element.prop) + ' не заполнено!');
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
            if(onChainge)
            {
                if(!onChainge(e, value))
                    onClose(e, value);
            }
            else
                onClose(e, value);  
        }

        //Массив кнопок
        const new_buttons = [];
        //Опции генерации модульного окна
        if(children && buttons.close)
            new_buttons.push(
            <button onClick={(e) => onClose(e)}>
                Закрыть
            </button>);
        if(preset || fields)
            new_buttons.push(
            <button onClick={(e) => ConfirmButton(e)}>
                Потвердить
            </button>);
        //
        return new_buttons;
        //Может создать кнопку назад?
    }

    return (
        <>
            <div className={classes.modal_overlay + ' ' + props.modal_overlay}>
                <div className={classes.modal}>
                    <h1 className={classes.title}>{title}</h1>
                    
                    <div className={classes.separator}></div>
                    
                    <div className={classes.content + ' ' + props.className}>
                        {GenerateContent()}
                    </div>

                    <div className={classes.separator}></div>

                    <div className={classes.buttons}>
                        {GenerateButtons()}
                    </div>
                </div>
            </div>
            {ShowSubModalWindow()}
            {ShowContextMenu()}
        </>
    )
}

export default ModalWindow;