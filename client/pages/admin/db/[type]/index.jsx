import React, { cloneElement, useEffect, useState } from 'react';
//
import DatabaseLayout from '../DatabaseLayout.jsx';
import ModalWindow from '../../../../components/Common/ModalWindow/ModalWindow.jsx';
import ContextMenu from '../../../../components/Common/ContextMenu/ContextMenu.jsx';
import SelectOption from '../../../../components/CustomElements/SelectOption.jsx';
//
import Global from '../../../global.js';
import classes from './index.module.scss';

const Type = (props) => {
    //Массив для создания списка слева меню, получение перевода названия коллекции
    const items = props.items ?
        props.items.map((element) => { return { title: Global.GetTranslate(element), href: element } }) 
        : [];
    //Генерируемая коллекция
    const type = props.type;
    //Содержимое коллекции
    const collection = props.collection;
    //Структура коллекции
    const struct = props.struct;
    //Модальное окно
    const [contentModal, setContentModal] = useState();
    //Контекстное меню
    const [contentContext, setContentContext] = useState();

    //Генерация названия
    function GenerateTitle() {
        const title = Global.GetTranslate(type);//Local.items.find((element) => element.href == type).title;
        return <h1 className={classes.title}>{title}</h1>;
    }

    //Генерация таблицы
    function GenerateTable() {
        const elements = [];

        //Из ключей создается массив колоннок
        const columns = struct.map((element) => {
            if(element.translate)
                return element.translate
            else if(element.title)
                return element.title;
            else
                return element.prop;
        });

        //Функция генерирующая строки таблицы 
        function GenerateRows() {
            //По клику на клетку запоминает последний айди
            let last_id;

            //Конвертирование элемента для модального окна "добавления" элемента массива
            function ConvertToFieldsAddButton(element) {
                switch(element.type)
                {
                    case 'massive':
                    //В случаи если это массив
                        return {
                            type: 'button',
                            prop: 
                            {
                                title: 'Добавить',
                                fields: element.prop.map((element) => ConvertToFieldsAddButton(element))
                            },
                            title: element.title,
                            translate: element.translate,
                            min: element.min
                        };
                    //В случаи объекта
                    case 'object':
                        let prop = element.prop;
                        if(Array.isArray(prop))
                            return {
                                type: 'object',
                                prop: prop.map((element) => ConvertToFieldsAddButton(element)),
                                title: element.title,
                                translate: element.translate,
                                min: element.min
                            };
                        else
                            //В случаи если это объект рекурсивно добираемся до свойств
                            return ConvertToFieldsAddButton(prop);
                    //В случаи поля OtherId
                    case 'OtherId':
                        element.getValues = (setValues) => Global.GetIds(setValues, element.ref); 
                        return element;
                    //В случаи поля InnerId
                    case 'InnerId':
                        element.getValues = (setValues) => Global.GetIds(setValues, `${type}/sub_func/getInnerIds?id=${last_id}&key=${element.ref}`, 'id');
                        return element;
                    default:
                    //По умолчанию возвращает элемент
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
                    //Изменения состояния модульного окна
                    setContentModal(
                    {
                        title: 'Добавить',
                        fields: fields,
                        onChainge: (e, value) => 
                        {
                            //Запрос на добавление
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
                    //Получение ячейки
                    const cell = e.currentTarget;
                    //Получение колонны
                    const column = cell.getAttribute('column');
                    //В случаи если колонна id
                    if(column == '_id' || column == 'id')
                        return;
                    const id = object._id;
                    //Сохраняем последнее айди
                    last_id = id;
                    //Получаем структуру данного поля
                    const field_struct = struct.find((elem_struct) => elem_struct.prop === column || elem_struct.title === column);
                    const type_of = field_struct.type;
                    //В случаи если объект являеться сложным запоминает айди, но не открывает контекстное меню
                    if(field_struct.secret ||
                       type_of == 'object' ||
                       type_of == 'massive' ||
                       type_of == 'combobox' ||
                       type_of == 'OtherId' || 
                       type_of == 'InnerId')
                        return;
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
                                fields: [ { type: type_of, prop: column, translate: field_struct.translate } ],
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
                                return res.json();
                            })
                            .then((res) => 
                            {
                                console.log(res);
                                //Удаление объекта из таблицы, и перезагрузка страницы
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
                    //Изменение состояния контекстного меню
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

                //#region Рекурсивная функция, которая в зависимости от типа данных генерирует ячейку таблицы
                //в случаи вложенности, генерирует кнопку, по клику на которую октрывается модульное окно с содержимым
                function ConvertVariable(object, elem_struct, path = []) {
                    const this_path = [];
                    let prop_path, id, last_prop;
                    //Установка переменных this_path, id, prop_path, last_prop
                    //нужных для изменения значений в бд 
                    function getPathsIdsProp() {
                        //Итерация пути вложенности в объект
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
                    //Конвертация значения в объект нужный для изменения значения в бд
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
                        };
                    }
                    //События, происходящее при изменении полей выпадающего списка 
                    //с типом данных combobox, OtherId, InnerId
                    function onChangeSelection(e, value) {
                        //Конвертирования значение в удобоваримый вид
                        const new_object = convertToUpdateObject(value);
                        //Запрос на обновление данных в бд
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
                    //Css класс обертки переменной
                    let className;
                    //Содержимое
                    let content = [];
                    //Генерация поля в зависимости от структуры
                    switch(elem_struct.type)
                    {
                        //По умолчанию ошибка
                        default:
                            console.log(elem_struct.type + ' TYPE DON`T SUPPORT');
                            return <div>DONT SUPPORT</div>;
                        case 'string':
                        case 'number':
                        case 'boolean':
                        case 'time':
                        case 'date':
                        case 'ObjectId':
                            //В случаи простых типов данных
                            getPathsIdsProp();
    
                            //Событие, происходящие по клике на переменную
                            function OnClickVariable(e) {
                                e.preventDefault();
    
                                //Если значение переменной секретно 
                                //или если его колонка id, _id, 
                                //контекстное меню не вызывается
                                if(elem_struct.secret ||
                                   elem_struct.prop == 'id' ||
                                   elem_struct.prop == '_id')
                                    return;

                                //Кнопка изменить
                                const ChangeButton = 
                                {
                                    title: 'Изменить',
                                    OnClick: 
                                    (e) => 
                                    {
                                        //Изменение состояния модульного окна
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
                                };
                                //Изменения состояния контекстного меню
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
                                {elem_struct.secret ? '*******' : object[elem_struct.prop].toString()}
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
                            className = classes.massive;
                            //Массив
                            const array = object[elem_struct.title];
                            //Путь до массива в объекте
                            const array_path = path.concat(elem_struct.title).join('.');
                            //Итерация массива
                            array.forEach((element, index) => {
                                //Событие, происходящие по клику на кнопку удалить
                                function OnClickRemoveButton(e) {
                                    e.preventDefault();
                                    //
                                    if(array.length == 1)
                                    {
                                        alert('Запрещено удалять первый элемент массива!');
                                        return;
                                    }
                                    const object = { key: array_path, new_value: element.id };
                                    //Запрос на удаление элемента из массива
                                    fetch(`${Global.url}/api/db/${type}/update?id=${last_id}&prop=${JSON.stringify(object)}&operator=${'$pull'}`)
                                    .then((res) => 
                                    {
                                        console.log('Успех');
                                        return res.json();
                                    })
                                    .then((res) => 
                                    {
                                        console.log(res);
                                        //В случаи успеха страница перезагружается
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
                                //Конвертация элемента массива в вид объекта и последующая конвертация
                                function ConvertElementOfArray() {
                                    return ConvertVariable(
                                        { [elem_struct.title]: element }, 
                                        { ...elem_struct, type: 'object', }, 
                                        path.concat(element.id));
                                }
                                //Добавление конвертированных элементов, в содержимое
                                content.push(<div className={classes.item}>
                                    {ConvertElementOfArray()}
                                    <button onClick={(e) => OnClickRemoveButton(e)}>
                                        Удалить
                                    </button>
                                </div>);
                            });
                            //Событие, происходящие по клику на кнопку добавить
                            function OnClickAddButton(e, value)
                            {
                                e.preventDefault();
                                //Привидение к удобоваримому значению, для обновления
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
                                    //Обновление странцы
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
                            const new_id = this_id;
                            //
                            content.push(<button 
                                window={
                                {
                                    title: 'Добавить',
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
                            //Итерация каждого свойства объекта, и его последующая конвертация
                            elem_struct.prop.forEach((element) => {
                                content.push(<>
                                    <div className={classes.text}>
                                        {Global.FirstLetter(element.translate || element.title || element.prop)}:
                                    </div>
                                    <div className={classes.content}>
                                        {ConvertVariable(new_object, element, path.concat(elem_struct.title))}
                                    </div> 
                                </>);    
                            });
                            break;
                    }
                    //Если это первый сложный объект, создание кнопки
                    if(path.length == 0)
                    {
                        content = <div className={className}>
                            {content}
                        </div>;
                        //Событие, происходящие по клику на кнопку "Открыть"
                        function OpenModalButton(e, content, title) {
                            setContentModal(
                            { 
                                content: content, 
                                title: title 
                            });
                        }
                        //
                        return <button onClick={(e) => OpenModalButton(e, content, elem_struct.translate || elem_struct.title)}>
                            Открыть
                        </button>;
                    }
                    //
                    return <div className={className}>
                        {content}
                    </div>;
                }
                //#endregion
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
            //Итерация документов в коллекции
            for(let i = 0; i < collection.length; i++)
            {
                const object = collection[i];
                elements.push(GetRow(object));
            }
            //
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
    //Генерация модульного окна
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
    //Генерация контекстного меню
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

//Функция NextJS запускающаяся при сборке сайта, 
//возвращает все пути для данного динамического маршрута
export async function getStaticPaths() {
    //Получение всех названия коллекций из БД
    const collections = await (await fetch(Global.url + '/api/db/')).json();
    //Конвертирование в пути
    const paths = collections.map((element) => { return { params: { type: element } } });

    return {
        paths: paths,
        fallback: true
    }
}

//Функция NextJS запускающаяся при сборке сайта, 
//на основе путей из getStatisPaths делает запросы к серверу, 
//и передает ответы главному компоненту через props
export async function getStaticProps(router) {
    //Переменная содержащая название коллекции
    const type = router.params.type;
    //Получение всех названия коллекций из БД
    const items = await (await fetch(Global.url + '/api/db/')).json();
    //Получение содержимого коллекции из БД
    const collection = await (await fetch(Global.url + '/api/db/' + type)).json();
    //Получение структуры коллекции из бд
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