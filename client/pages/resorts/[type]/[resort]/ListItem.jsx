import React, { useState } from 'react';
import Link from 'next/link';
import classes from './ListItem.module.scss';

const ListItem = (props) => {
    //Название коллекции
    const path = props.path;
    //Тип элемента
    const [category, setCategory] = useState(props.category);
    //Айди элемента
    const [id, setId] = useState(props.id);
    ////
    //Ссылка на изображение
    const [image, setImage] = useState(props.image);
    //Название
    const [title, setTitle] = useState(props.title);
    //Адрес
    const [adress, setAddress] = useState(props.adress);
    //Минимальная цена
    const [min_price, setPrice] = useState(props.min_price);
    //Услуги
    const [services, setServices] = useState(props.services);
    
    //Конвертирование услуг в иконки FontAwesome и текст
    function ConvertServices(){
        let elements = [];
        if(services && services.length != 0)
        {
            for(let i = 0; i < services.length; i++)
            {
                let service = services[i];
                //Смещение колонок
                let column_offset = {gridColumn: `${i + 1}`};
                elements.push(<i class={"fa fa-" + service.icon} aria-hidden="true" style={column_offset}></i>);
            }
        }
        return elements;
    }

    //Создание ссылок на страницу с подробной информацией
    return (
        <Link href={`/resorts/${path}/${category}/${id}`}>
            <div className={classes.list_item + ' ' + classes.className}
            style={{backgroundImage: `url(${image})`}}>
                <div className={classes.top}>
                    <h1 className={classes.title}>
                        {title}
                    </h1>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.address}>
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <p>{adress}</p>
                    </div>
                    <div className={classes.price}>
                        <i class="fa fa-money" aria-hidden="true"></i>
                        <p>от {min_price} руб.</p>
                    </div>
                    <div className={classes.services}>
                        {ConvertServices()}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ListItem;