import React, { cloneElement, useEffect, useState } from 'react';
//
import DatabaseLayout from '../DatabaseLayout.jsx';
import ModalWindow from '../../../../components/Common/ModalWindow/ModalWindow.jsx';
import ContextMenu from '../../../../components/Common/ContextMenu/ContextMenu.jsx';
import SelectOption from '../../../../components/CustomElements/SelectOption.jsx';
//
import Global from '../../../global.js';
import Local from '../local.js';
import classes from './index.module.scss';

const Type = (props) => {
    const items = props.items ?
        props.items.map((element) => { return { title: element, href: element } }) 
        : [];
    const type = props.type;
    const collection = props.collection;
    const struct = props.struct;
    //
    const [contentModal, setContentModal] = useState();
    const [contentContext, setContentContext] = useState();
    //

    function GenerateTitle() {
        const title = Global.FirstLetter(type);//Local.items.find((element) => element.href == type).title;
        return <h1 className={classes.title}>{title}</h1>;
    }

    function GenerateTable() {
        const elements = [];
        //Из ключей создается массив колоннок
        const columns = struct.map((element) => {
            if(element.title)// && (element.type == 'object' || element.type == 'massive'))
                return element.title;
            else
                return element.prop;
        });

        //Функция итерации 
        function GenerateRows() {
            //По клику на клетку запоминает последний айди
            let last_id;
            //Конвертирование элемента для модального окна
            function ConvertToFieldsAddButton(element) {
                switch(element.type)
                {
                    case 'massive':
                        //В случаи если это массив значит нужно добавить кнопку
                        //element.prop = [ ... ]
                        // console.log(element.prop);
                        return {
                            type: 'button',
                            prop: 
                            {
                                title: 'Добавить',
                                fields: element.prop.map((element) => ConvertToFieldsAddButton(element))
                            },
                            title: element.title
                        };
                    //В случаи массива или объекта
                    case 'object':
                        let prop = element.prop;
                        if(Array.isArray(prop))
                            return {
                                type: 'object',
                                prop: prop.map((element) => ConvertToFieldsAddButton(element)),
                                title: element.title
                            };
                        else
                            //В случаи если это объект рекурсивно добираемся до свойств
                            return ConvertToFieldsAddButton(prop);
                    case 'OtherId':
                        element.getValues = (setValues) => Global.GetIds(setValues, element.ref); 
                        return element;
                    case 'InnerId':
                        element.getValues = (setValues) => Global.GetIds(setValues, `${type}/sub_func/getInnerIds?id=${last_id}&key=${element.ref}`, 'id');
                        // element.getValues = (setValues) => setValues([]);
                        // return element;
                    default:
                        return element;
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
                    struct.forEach((element) => {
                        //Пропускаем поля c id, т.к. они по дефолту добавлються потом в бд
                        if(element.prop !== '_id' 
                        && element.prop !== 'id')
                        {
                            fields.push(ConvertToFieldsAddButton(element));
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
                            fetch(`${Global.url}/api/db/${type}/insert?object=${JSON.stringify(value)}`)
                            .then((res) => 
                            {
                                console.log('Успех');
                                return res.json();
                            })
                            .then((res) => 
                            {
                                console.log(res);
                                location.reload();
                            })
                            .catch((err) => 
                            {
                                console.log('Ошибка');
                                return err.json();
                            })
                            .catch((err) => 
                            {
                                console.log(err);
                            });
                        }
                    });
                }
            } 
            //Получение строки на основе объекта
            function GetRow(object) {
                const this_id = object._id;
                //В этой функции происходит основное взаимодествие с БД
                function OnClickCell(e) {
                    e.preventDefault();
                    const cell = e.currentTarget;
                    //header тоже считается поэтому на одни элемент меньше
                    const column = cell.getAttribute('column');
                    //В случаи если колонна id
                    if(column == '_id' || column == 'id')
                        return;
                    const id = object._id;
                    last_id = id;
                    const type_of = struct.find((elem_struct) => elem_struct.prop === column || elem_struct.title === column).type;
                    //В случаи если объект являеться сложным запоминает айди, но не открывает контекстное меню
                    if(type_of == 'object' ||
                       type_of == 'massive' ||
                       type_of == 'combobox' ||
                       type_of == 'OtherId' || 
                       type_of == 'InnerId')
                        return;
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
                                    fetch(`${Global.url}/api/db/${type}/update?id=${id}&prop=${JSON.stringify({ key:column, new_value:value[column] })}`)
                                    .then((res) => 
                                    {
                                        console.log('Успех');
                                        return res.json();
                                    })
                                    .then((res) => 
                                    {
                                        console.log(res);
                                        // cell.innerHTML = value[column];
                                        location.reload();
                                    })
                                    .catch((err) => 
                                    {
                                        console.log('Ошибка');
                                        return err.json();
                                    })
                                    .catch((err) => 
                                    {
                                        console.log(err);
                                    });   
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
                            fetch(`${Global.url}/api/db/${type}/delete?id=${id}`)
                            .then((res) => 
                            {
                                console.log('Успех');
                                //Приводит к несоотвествиям данных
                                // //Удаление объекта из таблицы
                                // document.getElementById('dataTable').removeChild(cell.parentNode);
                                return res.json();
                            })
                            .then((res) => 
                            {
                                console.log(res);
                                location.reload();
                            })
                            //
                            .catch((err) => 
                            {
                                console.log('Ошибка');
                                return err.json();
                            })
                            .catch((err) => 
                            {
                                console.log(err);
                            });                
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
                //#region For Difficult generation
                function ConvertVariable(object, elem_struct, path = []) {
                    // last_id = 
                    const this_path = [];
                    let prop_path, id, last_prop;
                    //
                    function getPathsIdsProp() {
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

                        this_path.push(elem_struct.prop);
                    }
                    //
                    function convertToUpdateObject(value) {
                        switch(id)
                        {
                            //В случаи если нет вложенных массивов
                            case undefined:
                                return { key: this_path.join('.'), new_value: value };
                            //В случаи если один вложенный массив
                            default:
                                return { 
                                    id: id, 
                                    path: prop_path,
                                    key: last_prop, 
                                    new_value: value
                                };
                            //В случаи нескольких вложенных массивов
                            //Пока не поддерживается
                            // default:
                            //     console.log("ERROR HAS ARRAY IN ARRAY, THIS FEATURE DON`T SUPPORT");
                            //     break;
                        };
                    }
                    //
                    function onChangeSelection(e, value) {
                        const new_object = convertToUpdateObject(value);
                        //
                        fetch(`${Global.url}/api/db/${type}/update?id=${last_id}&prop=${JSON.stringify(new_object)}`)
                        .then((res) => 
                        {
                            console.log('Успех');
                            console.log(res);
                        })
                        .catch((err) => 
                        {
                            console.log('Ошибка');
                            console.log(err);
                        });
                    }
                    //
                    let className;
                    let content = [];
                    switch(elem_struct.type)
                    {
                        default:
                            console.log(elem_struct.type + ' TYPE DON`T SUPPORT');
                            return <div>DONT SUPPORT</div>;
                        case 'string':
                        case 'number':
                        case 'boolean':
                        case 'time':
                        case 'date':
                        //MongoDB object represent id of element in documents (TABLE IN SQL NOTATION)
                        case 'ObjectId':
                            getPathsIdsProp();
                            // this_path - all path to propertie, elem_struct.prop - last propertie
    
                            function OnClickVariable(e) {
                                e.preventDefault();
    
                                if(elem_struct.prop == 'id' ||
                                   elem_struct.prop == '_id')
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
                                                let new_object = convertToUpdateObject(value[elem_struct.prop]);
                                                //
                                                fetch(`${Global.url}/api/db/${type}/update?id=${last_id}&prop=${JSON.stringify(new_object)}`)
                                                .then((res) => 
                                                {
                                                    console.log('Успех');
                                                    return res.json();
                                                })
                                                .then((res) => 
                                                {
                                                    // field.innerHTML = value;k
                                                    console.log(res);
                                                })
                                                //Ошибка
                                                .catch((err) => 
                                                {
                                                    console.log('Ошибка');
                                                    return err.json();
                                                })
                                                .catch((err) => 
                                                {
                                                    console.log(err);
                                                });
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
                        case 'combobox':
                            getPathsIdsProp();
                            //
                            const ComboboxValue = object[elem_struct.prop];
                            //
                            return <SelectOption 
                            classSelect={classes.choose}
                            placeholder={ComboboxValue} 
                            values={elem_struct.items}
                            onChainge={(e, value) => onChangeSelection(e, value)}
                            placeholder={object[elem_struct.prop]}/>;
                        case 'OtherId':
                            getPathsIdsProp();
                            //
                            const OtherId = object[elem_struct.prop];
                            //
                            return <SelectOption 
                            classSelect={classes.choose}
                            placeholder={OtherId.$id} 
                            onChainge={(e, value) => onChangeSelection(e, Global.ConvertToDBRef(OtherId.$ref, value))} 
                            isOnce={true}
                            getValues={(setValues) => Global.GetIds(setValues, OtherId.$ref)}/>;
                        case 'InnerId':
                            getPathsIdsProp();
                            //
                            const InnerId = object[elem_struct.prop];
                            //
                            return <SelectOption 
                            classSelect={classes.choose}
                            placeholder={InnerId}
                            onChainge={(e, value) => onChangeSelection(e, value)}
                            isOnce={true}
                            getValues={(setValues) => Global.GetIds(setValues, `${type}/sub_func/getInnerIds?id=${last_id}&key=${elem_struct.ref}`, 'id')}/>;
                        case 'massive':
                            // getPathsIdsProp();
                            //
                            className = classes.massive;
                            //
                            const array = object[elem_struct.title];
                            const array_path = path.concat(elem_struct.title).join('.');
                            //
                            array.forEach((element, index) => {
    
                                function OnClickRemoveButton(e) {
                                    e.preventDefault();
                                    const object = { key: array_path, new_value: element.id };
                                    fetch(`${Global.url}/api/db/${type}/update?id=${last_id}&prop=${JSON.stringify(object)}&operator=${'$pull'}`)
                                    .then((res) => 
                                    {
                                        console.log('Успех');
                                        return res.json();
                                    })
                                    .then((res) => 
                                    {
                                        console.log(res);
                                        location.reload();
                                    })
                                    .catch((err) => 
                                    {
                                        console.log('Ошибка');
                                        return err.json();
                                    })
                                    .catch((err) => 
                                    {
                                        console.log(err);
                                    });
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
                                fetch(`${Global.url}/api/db/${type}/update?id=${last_id}&prop=${JSON.stringify(object)}&operator=${'$push'}`)
                                .then((res) => 
                                {
                                    console.log('Успех');
                                    return res.json();
                                })
                                .then((res) => 
                                {
                                    console.log(res);
                                    location.reload();
                                })
                                .catch((err) => 
                                {
                                    console.log('Ошибка');
                                    return err.json();
                                })
                                .catch((err) => 
                                {
                                    console.log(err);
                                });
                                return;
                            }
                            const new_id = this_id;
                            //
                            content.push(<button 
                                window={
                                {
                                    title: 'Добавить',
                                    //elem_struct.prop содержит все поля для создания нового элемента 
                                    fields: elem_struct.prop,
                                    onChainge: OnClickAddButton,
                                    toGetInnerIds: `${type}/sub_func/getInnerIds?id=${new_id}`
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
                    //
                    if(path.length == 0)
                    {
                        content = <div className={className}>
                            {content}
                        </div>;
                        //
                        function OpenModalButton(e, content, title) {
                            setContentModal(
                            { 
                                content: content, 
                                title: title 
                            });
                        }
                        //
                        return <button onClick={(e) => OpenModalButton(e, content, elem_struct.title)}>
                            Открыть
                        </button>;
                    }
                    //
                    return <div className={className}>
                        {content}
                    </div>;
                }
                //#endregion

                const iddddd = object._id;

                return <tr _id={object._id}>
                    {struct.map((elem_struct) => {
                        //new 
                        let title;
                        if(elem_struct.title && (elem_struct.type == 'object' || elem_struct.type == 'massive'))
                            title = elem_struct.title;
                        else
                            title = elem_struct.prop;
                        //end new
                        return <td 
                            align='center'
                            column={title}//old
                            onClick={(e) => OnClickCell(e)}>
                            {ConvertVariable(object, elem_struct, [])}
                        </td>;
                    })}
                </tr>;
            }
        
            //Создание столбцов заголовков
            function GenerateHeader() {
                const header = [];
                columns.forEach((element) => { 
                    header.push(<th>{Global.FirstLetter(element)}</th>);
                });
                //
                function OnClick(e) {
                    e.preventDefault();
                    setContentContext(
                    { 
                        content: [ AddButton ],
                        points: 
                        {
                            left: e.clientX,
                            top: e.clientY
                        }
                    });
                }
                //
                elements.push(<tr onClick={(e) => OnClick(e)}>{header}</tr>);
            }
            GenerateHeader();
            for(let i = 0; i < collection.length; i++)
            {
                const object = collection[i];
                elements.push(GetRow(object));
            }
            
            return elements;
        }
        //Создание таблицы
        return <table 
            id='dataTable'
            className={classes.table} 
            cellspacing='0'
            cellpadding='5' 
            border='1'>
            {GenerateRows()}
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
        <DatabaseLayout items={items}>
            {GenerateTitle()}
            {GenerateTable()}
            {/*AT FIRST DON`T VISIBLE */}
            {GenerateModalWindow()}
            {GenerateContextMenu()}
        </DatabaseLayout>
    )
}

export async function getStaticPaths() {
    //ТУТ ИСПРАВИТь
    const collections = await (await fetch(Global.url + '/api/db/')).json();
    const paths = collections.map((element) => { return { params: { type: element } } });

    return {
        paths: paths,
        fallback: true
    }
}

export async function getStaticProps(router) {
    //Запрос к бд для получения коллекции из mongoDB
    const type = router.params.type;
    const items = await (await fetch(Global.url + '/api/db/')).json();
    //
    const collection = await (await fetch(Global.url + '/api/db/' + type)).json();
    const struct = await (await (fetch(Global.url + '/api/db/' + type + '/struct'))).json();
    //
    return {
        props: {
            items: items,
            type: type,
            //
            collection: collection,
            struct: struct
        }
    }
}

export default Type;