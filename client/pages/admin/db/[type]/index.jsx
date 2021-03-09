import React, { useState } from 'react';
//
import DatabaseLayout from '../DatabaseLayout.jsx';
import ModalWindow from '../../../../components/Common/ModalWindow/ModalWindow.jsx';
import ContextMenu from '../../../../components/Common/ContextMenu/ContextMenu.jsx';
//
import Global from '../../../global.js';
import Local from '../local.js';
import classes from './index.module.scss';

const Type = (props) => {
    const type = props.type;
    const collection = props.collection;
    const struct = props.struct;
    const isDifficult = struct.some((element) => { return element.type == 'object' });
    console.log(struct);    
    //
    const [contentModal, setContentModal] = useState();
    const [contentContext, setContentContext] = useState();

    function GenerateTitle() {
        const title = Local.items.find((element) => element.href == type).title;
        return <h1 className={classes.title}>{title}</h1>;
    }

    function GenerateTable() {
        const elements = [];
        //Из ключей создается массив колоннок
        const columns = struct.map((element) => {
            if(element.title && (element.type == 'object' || element.type == 'massive'))
                return element.title;
            else
                return element.prop;
        });
        //По клику на клетку запоминает последний айди
        let last_id;

        //В этой функции происходит основное взаимодествие с БД
        function OnClickCell(e) {
            e.preventDefault();
            const cell = e.currentTarget;
            //header тоже считается поэтому на одни элемент меньше
            const column = cell.getAttribute('column');
            //В случаи если колонна id
            if(column == '_id' || column == 'id')
                return;
            const id = cell.parentNode.getAttribute('_id');
            const object = collection.find((element) => element._id == id);
            const type_of = typeof object[column];
            //В случаи если объект являеться сложным запоминает айди, но не открывает контекстное меню
            if(type_of == 'object')
            {
                last_id = id;
                return;
            }
            //Buttons
            //Кнопка изменить
            const ChangeButton =
            {
                title: 'Изменить',
                OnClick: (event) => 
                {
                    //Открытие модульного окна для изменения параметра
                    setContentModal(
                    { 
                        title: 'Изменить', 
                        fields: [ { type: type_of, prop: column } ],
                        //По клику на кнопку изменить вызов api маршрута изменяющий данные в бд
                        onChainge: (e, value) =>
                        {
                            fetch(`${Global.url}/api/db/${type}/update?id=${id}&prop=${JSON.stringify({ key:column, new_value:value[column] })}`);   
                            cell.innerHTML = value[column];
                        }
                    });
                }
            }
            //Кнопка Добавить
            const AddButton =
            {
                title: 'Добавить',
                OnClick: (event) => 
                {
                    const fields = [];
                    //
                    function ConvertToFields(element) {
                        switch(element.type)
                        {
                            case 'massive':
                                //В случаи если это массив значит нужно добавить кнопку
                                //element.prop = [ ... ]
                                return {
                                    type: 'button',
                                    prop: 
                                    {
                                        title: 'Добавить',
                                        fields: element.prop
                                    },
                                    title: element.title
                                };
                            //В случаи массива или объекта
                            case 'object':
                                let prop = element.prop;
                                if(Array.isArray(prop))
                                    return {
                                        type: 'object',
                                        prop: prop.map((element) => ConvertToFields(element)),
                                        title: element.title
                                    };
                                else
                                    //В случаи если это объект рекурсивно добираемся до свойств
                                    return ConvertToFields(prop);
                            default:
                                return element;
                        }
                    }
                    //
                    struct.forEach((element) => {
                        //Пропускаем поля c id, т.к. они по дефолту добавлються потом в бд
                        if(element.prop !== '_id' 
                        && element.prop !== 'id')
                        {
                            fields.push(ConvertToFields(element));
                        }
                    });
                    //
                    setContentModal(
                    {
                        title: 'Добавить',
                        fields: fields,
                        onChainge: (e, value) => 
                        {
                            //All properties
                            fetch(`${Global.url}/api/db/${type}/insert?object=${JSON.stringify(value)}`);
                            location.reload();
                        }
                    });
                }
            } 
            //Кнопка удалить
            const DeleteButton = 
            {
                title: 'Удалить',
                OnClick: (event) => 
                {
                    fetch(`${Global.url}/api/db/${type}/delete?id=${id}`);
                    location.reload();
                }
            }
            //Создание content для контекстного меню
            //
            setContentContext(
            { 
                content: [ ChangeButton, AddButton, DeleteButton ],
                points: 
                {
                    left: e.clientX,
                    top: e.clientY
                }
            });
        }
        //Функция итерации 
        function Iterate(WhatPush) {
            for(let i = 0; i < collection.length; i++)
            {
                const row = [];
                const object = collection[i];
                console.log(object);
                struct.forEach((elem_struct) => {
                    //new 
                    let title;
                    if(elem_struct.title && (elem_struct.type == 'object' || elem_struct.type == 'massive'))
                        title = elem_struct.title;
                    else
                        title = elem_struct.prop;
                    //end new
                    row.push(<td 
                        align='center'
                        column={title}//old
                        onClick={(e) => OnClickCell(e)}>
                        {WhatPush(object, elem_struct)}
                    </td>);
                });
                elements.push(<tr _id={object._id}>{row}</tr>)
            }
            
            return elements;
        }
        //Простая конвертация
        function Simple() {
            //Найти максимальные значения ключей
            //NEW 
            return Iterate((object, elem_struct) => { return object[elem_struct.prop] });
        }
        //Сложная конвертация
        function Difficult() {
            //#region NEW FORM 
            function ConvertVariable(object, elem_struct, path = []) {
                
                let className;
                let content = [];
                switch(elem_struct.type)
                {
                    default:
                        console.log('THIS TYPE DON`T SUPPORT');
                        return <div>DONT SUPPORT</div>;
                    case 'string':
                    case 'number':
                    case 'boolean':
                    //MongoDB object represent id of element in documents (TABLE IN SQL NOTATION)
                    case 'ObjectId':
                        const this_path = [];
                        let prop_path, id, last_prop;
                        // let id;
                        for(let i = 0; i < path.length; i++)
                        {
                            if(typeof path[i] == 'number')
                            {
                                this_path.push(path[i + 1]);
                                //
                                id = parseInt(path[i++]);
                                prop_path = this_path.slice(0).join('.');
                                last_prop = path.slice(i + 1, path.length).concat(elem_struct.prop).join('.');
                                //
                                this_path.push(id);
                            }
                            else
                                this_path.push(path[i]);
                        }
                        // this_path - all path to propertie, elem_struct.prop - last propertie

                        this_path.push(elem_struct.prop);

                        function OnClickVariable(e) {
                            const field = e.currentTarget;
                            //Возможно излишне ресурсо затратно

                            if(last_prop == 'id' ||
                               last_prop == '_id')
                                return;
                                
                            const ChangeButton = 
                            {
                                title: 'Изменить',
                                OnClick: 
                                (e) => 
                                {
                                    setContentModal(    
                                    {
                                        title: 'Изменить',
                                        fields: [ elem_struct ],
                                        //По клику на кнопку изменить вызов api маршрута изменяющий данные в бд
                                        onChainge: (e, value) => 
                                        {
                                            let object;
                                            switch(id)
                                            {
                                                //В случаи если нет вложенных массивов
                                                case undefined:
                                                    object = { key: this_path.join('.'), new_value: value[elem_struct.prop] };
                                                    break;
                                                //В случаи если один вложенный массив
                                                default:
                                                    object = 
                                                    { 
                                                        id: id, 
                                                        path: prop_path,
                                                        key: last_prop, 
                                                        new_value: value[elem_struct.prop]
                                                    };
                                                    break;
                                                //В случаи нескольких вложенных массивов
                                                //Пока не поддерживается
                                                // default:
                                                //     console.log("ERROR HAS ARRAY IN ARRAY, THIS FEATURE DON`T SUPPORT");
                                                //     break;
                                            };
                                            fetch(`${Global.url}/api/db/${type}/update?id=${last_id}&prop=${JSON.stringify(object)}`);
                                            field.innerHTML = value;
                                        }
                                    });
                                }
                            };
        
                            setContentContext(
                            {
                                content: [ ChangeButton ],
                                points: 
                                {
                                    left: e.clientX,
                                    top: e.clientY
                                }
                            });
                        }

                        return <p 
                            className={classes.variable} 
                            onClick={(e) => OnClickVariable(e)}>
                            {object[elem_struct.prop].toString()}
                        </p>;
                        break;
                    case 'massive':
                        className = classes.massive;
                        //
                        const array = object[elem_struct.title];
                        const array_path = path.concat(elem_struct.title).join('.');
                        //
                        array.forEach((element, index) => {

                            function OnClickRemoveButton(e) {
                                e.preventDefault();
                                const object = { key: array_path, new_value: element.id };
                                fetch(`${Global.url}/api/db/${type}/update?id=${last_id}&prop=${JSON.stringify(object)}&operator=${'$pull'}`);
                                return;
                            }
                            //Конвертация элемента массива
                            function ConvertElementOfArray() {
                                return ConvertVariable(
                                    { [elem_struct.title]: element }, 
                                    { 
                                        type: 'object', 
                                        prop: elem_struct.prop, 
                                        title: elem_struct.title
                                    }, path.concat(element.id));
                            }
                            //
                            content.push(<div className={classes.item}>
                                {ConvertElementOfArray()}
                                <button onClick={(e) => OnClickRemoveButton(e)}>
                                    Удалить
                                </button>
                            </div>);
                        });
                        //Add button
                        //Назвать элемент чтобы затем в ModalWindow найти это кнопку и создать элемент по подобию
                        //Объекта который также будет находиться в кнопке
                        function OnClickAddButton(e, value)
                        {
                            e.preventDefault();
                            const object = { key: array_path, new_value: value };
                            console.log(object);
                            fetch(`${Global.url}/api/db/${type}/update?id=${last_id}&prop=${JSON.stringify(object)}&operator=${'$push'}`);
                            return;
                        }
                        //
                        content.push(<button 
                            window={
                            {
                                title: 'Добавить',
                                //elem_struct.prop содержит все поля для создания нового элемента
                                fields: elem_struct.prop, 
                                onChainge: OnClickAddButton
                            }}>
                            Добавить
                        </button>);
                        break;
                    case 'object':
                        className = classes.object; 
                        const new_object = object[elem_struct.title];
                        //
                        elem_struct.prop.forEach((element) => {
                            let title;
                            if(element.title)
                                title = element.title;
                            else
                                title = element.prop;
                            //
                            content.push(<>
                                <div className={classes.text}>
                                    {Global.FirstLetter(title)}:
                                </div>
                                <div className={classes.content}>
                                    {ConvertVariable(new_object, element, path.concat(elem_struct.title))}
                                </div> 
                            </>);    
                        });
                        break;
                }

                if(path.length == 0)
                {
                    content = <div className={className}>
                        {content}
                    </div>;
                    //
                    return <button onClick={(e) => OpenModalButton(e, content, elem_struct.title)}>
                        Открыть
                    </button>;
                }
                
                return <div className={className}>
                    {content}
                </div>;
            }
            //#endregion

            function OpenModalButton(e, content, title) {
                setContentModal(
                { 
                    content: content, 
                    title: title 
                });
            }

            // NEW
            return Iterate((object, elem_struct) => { return ConvertVariable(object, elem_struct) });
        }
        
        //Создание таблицы
        let table;
        if(collection && collection.length != 0)
        {
            //Создание столбцов заголовков
            const header = [];
            columns.forEach((element) => { 
                header.push(<th>{Global.FirstLetter(element)}</th>);//ТУТ ОШИБКА
            });
            elements.push(<tr>{header}</tr>);
            //end
            if(isDifficult)
                table = Difficult();
            else
                table = Simple();
        }
        return <table 
            className={classes.table} 
            cellspacing='0'
            cellpadding='5' 
            border='1'>
            {table}
        </table>;
    }

    function GenerateModalWindow() {
        return contentModal ? 
        <ModalWindow className={classes.modal} 
                     title={Global.FirstLetter(contentModal.title)}
                     onClose={(e) => { setContentModal() }}
                     //
                     fields={contentModal.fields}
                     onChainge={contentModal.onChainge}>
            {contentModal.content}
        </ModalWindow> : '';
    }

    function GenerateContextMenu() {
        return contentContext ? 
        <ContextMenu items={contentContext.content} 
                     points={contentContext.points}
                     onClickOutside={(e) => { setContentContext() }}
                     OnClick={(e) => console.log(e)}/> : '';
    }

    return(
        <DatabaseLayout>
            {GenerateTitle()}
            {GenerateTable()}
            {/*AT FIRST DON`T VISIBLE */}
            {GenerateModalWindow()}
            {GenerateContextMenu()}
        </DatabaseLayout>
    )
}

export async function getStaticPaths() {
    const paths = Local.items.map((element) => { return { params: { type: element.href } } });
    return {
        paths: paths,
        fallback: true
    }
}

export async function getStaticProps(router) {
    //Запрос к бд для получения коллекции из mongoDB
    const type = router.params.type;
    const collection = await (await fetch(Global.url + '/api/db/' + type)).json();
    const struct = await (await (fetch(Global.url + '/api/db/' + type + '/struct'))).json();

    console.log(await struct);

    return {
        props: {
            type: type,
            collection: collection,
            struct: struct
        }
    }
}

export default Type;