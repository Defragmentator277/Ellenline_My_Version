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
    //
    const [contentModal, setContentModal] = useState();
    const [contentContext, setContentContext] = useState();

    function GenerateTitle() {
        const title = Local.items.find((element) => element.href == type).title;
        return <h1 className={classes.title}>{title}</h1>;
    }

    function GenerateTable() {

        function Convertation(type_convert) {
            const elements = [];
            const columns = Local.GetColumns(type);

            //В этой функции происходит основное взаимодествие с БД
            function OnClickCell(e) {
                e.preventDefault();
                const cell = e.currentTarget;
                const row = cell.parentNode;
                if(cell.getAttribute('type') != 'simple')
                    return;
                const column = columns[[...row.childNodes].indexOf(cell)];
                if(column == '_id' || column == 'id')
                    return;
                //header тоже считается поэтому на одни элемент меньше
                const row_index = [...row.parentNode.childNodes].indexOf(row) - 1;
                const object = collection[row_index];
                const id = object._id;
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
                            title: 'Изменить ' + column, 
                            fields: [ { type: (typeof object[column]) } ],
                            //По клику на кнопку изменить вызов api маршрута изменяющий данные в бд
                            onChainge: (e, value) => 
                            {
                                cell.innerHTML = value;
                                fetch(`${Global.url}/api/db/${type}/update?id=${id}&prop=${JSON.stringify({[column]: value})}`);   
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
                        Object.keys(object).forEach((element) => 
                        { 
                            // console.log(element);
                            if(element != '_id' && element != 'id')
                            {
                                const prop = object[element];
                                fields.push(
                                { 
                                    type: typeof prop, 
                                    prop: element
                                });
                            }
                        });
                        //
                        setContentModal(
                        {
                            title: 'Добавить',
                            fields: fields,
                            onChainge: (e, value) => 
                            {
                                console.log("ON CHAINGE");
                                if(Object.keys(object).every((element) => {
                                    return !(element != '_id' && element != 'id' 
                                    && !value[element]);
                                }))
                                {
                                    //All properties
                                    fetch(`${Global.url}/api/db/${type}/insert?object=${JSON.stringify(value)}`);
                                    location.reload();
                                }
                                else
                                {
                                    //Not all properties!
                                    alert('Не все нужные поля были заполнены!');
                                }
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
            //Создание столбцов заголовков
            function CreateHeader() {
                const header = [];
                columns.forEach((element) => {
                    header.push(<th>{Global.FirstLetter(element)}</th>);
                });
                elements.push(<tr>{header}</tr>);
            }

            function Iterate(WhatPush) {
                for(let i = 0; i < collection.length; i++)
                {
                    const row = [];
                    const object = collection[i];
                    columns.forEach((element) => {
                        row.push(<td 
                            type={(typeof object[element]) == 'object' ? 'difficult' : 'simple'} 
                            onClick={(e) => OnClickCell(e)} align='center'>
                            {WhatPush(object, element)}
                        </td>);
                    });
                    elements.push(<tr>{row}</tr>)
                }
                
                return elements;
            }
            //Простая конвертация
            function Simple() {
                //Найти максимальные значения ключей
                return Iterate((object, element) => { return object[element] });
            }
            //Сложная конвертация
            function Difficult() {
                function OnClick(e) {
                    const field = e.currentTarget;
                    if(field.getAttribute('path') == 'id')
                        return;

                    setContentContext(
                    {
                        content: 
                        [
                            {
                                title: 'Изменить',
                                OnClick: 
                                (e) => 
                                {
                                    console.log('click on chainge');
                                }
                            }
                        ],
                        points: 
                        {
                            left: e.clientX,
                            top: e.clientY
                        }
                    });
                }
                //
                function ConvertVariable(variable, title, name_prop) {

                    switch(typeof variable)
                    {
                        case 'string':
                        case 'number':
                        default:
                            return <p className={classes.variable} path={name_prop} onClick={(e) => OnClick(e)}>
                                {variable.toString()}
                            </p>;
                        // case 'boolean':
                        //     return variable ? 'Да' : 'Нет';
                        case 'object':
                            let content = [];
                            let className;
                            if(Array.isArray(variable) && variable.length != 0)
                            {
                                className = classes.massive;
                                variable.forEach((element, index) => {
                                    content.push(ConvertVariable(element, null, element.id || index));
                                    //SEPARATOR
                                    content.push(<div className={classes.separator}></div>);
                                });
                                //Add button
                                content.push(<button path={name_prop}>
                                    Добавить
                                </button>);
                            }
                            else
                            {
                                className = classes.object;
                                Object.keys(variable).forEach((element) => {
                                    content.push(<>
                                        <div className={classes.text}>
                                            {Global.FirstLetter(element)}:
                                        </div>
                                        <div className={classes.content}>
                                            {ConvertVariable(variable[element], null, element)}
                                        </div> 
                                    </>);    
                                });
                            }

                            if(title)
                            {
                                content = <div path={title} className={className}>
                                    {content}
                                </div>;
                                // if(className == classes.massive)
                                return <button onClick={(e) => OpenModalButton(e, content, title)}>
                                    Открыть
                                </button>;
                            }
                            
                            return <div path={name_prop} className={className}>
                                {content}
                            </div>;
                    }
                }

                function OpenModalButton(e, content, title) {
                    setContentModal({ content: content, title: title });
                }

                return Iterate((object, element) => { return ConvertVariable(object[element], element) });
            }

            CreateHeader();
            if(collection && collection.length != 0)
            {
                switch(type_convert)
                {
                    case 'simple':
                        return Simple();
                    case 'difficult':
                        return Difficult();
                    default:
                        console.log('ERROR THIS TYPE OF CONVERTATION DON`T SUPPORT');
                        return 'ERROR THIS TYPE OF CONVERTATION DON`T SUPPORT';
                }
            }
        }

        let table;
        switch(type)
        {
            case 'cities':
            case 'countries':
                table = Convertation('simple');
                break;
            case 'resorts':
                table = Convertation('difficult');
                break;
            default:
                console.log('ERROR THIS TYPE OF DOCUMENT("TABLE" IN SQL) DON`T EXISTS');
                return;
        }
        return <table className={classes.table} cellspacing='0' cellpadding='5' border='1'>
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
    const res = await fetch(Global.url + '/api/db/' + type);
    const json = await res.json();

    return {
        props: {
            type: type,
            collection: json
        }
    }
}

export default Type;