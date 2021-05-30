import React, { useState, useEffect } from 'react';
//
import ClientLayout from '../../../../../layouts/ClientLayout.jsx';
import FormBooking from '../../../../../components/Common/FormBooking/FormBooking.jsx';
import InfoSection from '../../../../../components/Common/InfoSection/InfoSection.jsx';
import Providers from '../../../../../components/Common/Providers/Providers.jsx';
import Timetable from '../../../../../components/Common/Timetable/Timetable.jsx';
import Comments from '../../../../../components/Common/Comments/Comments.jsx';
//
import Global from '../../../../global.js';
import classes from './index.module.scss';

//Страница с туром, санаторием, пансонатом или круизом
const Resort = (props) => {
    //Название коллекции
    const type = props.type;
    //Переменные для всех типов коллекции: relax, tours, cruises
    const id = props.id;
    const images = props.images;
    const title = props.title;
    const price = props.price;
    const services = props.services;
    const text= props.text;
    const adress = props.adress;
    const points = props.points;
    const comments = props.comments;
    //Переменные для типов коллекции: tours, cruises
    const info = props.info;
    const timetable = props.timetable;
    //Переменные для типов коллекции: tours
    const timetable_schedule = props.timetable_schedule;
    //Переменные для типов коллекции: relax
    const stars = props.stars;
    const rooms = props.rooms;

    //Генерация расписания
    function GenerateTimetable() {
        switch(type) 
        {
            //В случаи если это тур или круиз
            //происходит генерация расписания
            case 'tours':
            case 'cruises':
                return <Timetable 
                timetable={timetable}/>;
            case 'relax':
                return;
            default:
                return console.log(type + ' don`t support');
        }
    }

    return (
        <ClientLayout title={title}>
            <div className={classes.resort}>
                {/* СЕКЦИЯ СО СЛАЙДЕРОМ, ОПИСАНИЕ И НЕБОЛЬШОЙ ИНФОРМАЦИЕЙ */}
                <InfoSection 
                title={title} 
                price={price} 
                text={text}
                images={images}
                type={type}
                //Необзятельные параметры
                stars={stars}
                duration={timetable ? timetable[timetable.length - 1].day : null}/>

                <Providers 
                services={services} 
                address={adress}
                type={type}
                //Необзятельные параметры
                info={info}
                points={points}/>

                {GenerateTimetable()}

                {/* КОММЕНТАРИИ ПОЛЬЗОВАТЕЛЕЙ */}
                <Comments
                classTitle={classes.title}
                className={classes.comments}
                max={4}
                comments={comments}/>

                {/* ФОРМА БРОНИРОВАНИЯ */}
                <FormBooking 
                className={classes.form}
                price={price}
                type={type}
                id={id}
                //Необзятельные параметры
                timetable={timetable_schedule}
                rooms={rooms}/>
            </div>
        </ClientLayout>
    )
}

//Функция NextJS запускающаяся при сборке сайта, 
//возвращает все пути для данного динамического маршрута
export async function getStaticPaths() {
    const paths = [];
    //Здесь сервер получает все типы отдыха, а также айди каждого документа из коллекции 
    //и затем создаются маршруты, на основе которых идут запросы на получение информации из бд
    const props = Object.keys(Global.resorts);
    for(let i = 0; i < props.length; i++)
    {
        const type_ofs = Global.resorts[props[i]];
        for(let j = 0; j < type_ofs.length; j++)
        {
            const answer = await (await fetch(Global.url + '/api/resorts/' + props[i] + '/' + type_ofs[j])).json();
            answer.forEach((part) => {
                paths.push({ params: { type: props[i], resort: type_ofs[j], id: part._id } });
            });
        }
    }
    //Macket
    //{ params: { type: '...', resort: '...', id: '...' } }
    return {
        paths: paths,
        fallback: false
    };
}

//Функция NextJS запускающаяся при сборке сайта, 
//на основе путей из getStatisPaths делает запросы к серверу, 
//и передает ответы главному компоненту через props
export async function getStaticProps(router) {
    //Здесь я получаю информацию о коллекции и ее типе, а также айди тура, санатория, пансионата, или круиза
    const type = router.params.type;
    const resort = router.params.resort;
    const id = router.params.id;
    //Запрос на получение информации о туре, санаторие, пансионате, или круизе
    const res = await fetch(Global.url + '/api/resorts/' + type + '/' + resort + '/' + id);
    const items = await res.json();
    const item = items[0];
    //
    return {
        props: {
            type: type,
            resort: resort,
            //Переменные для всех типов коллекции: relax, tours, cruises
            id: item._id || null,
            title: item.name || null,
            images: item.images || null,
            price: item.price || null,
            services: item.services || null,
            text: item.description || null,
            adress: item.adress || null,
            points: item.points || null,
            comments: item.comments || null,
            //Переменные для типов коллекции: tours, cruises
            info: item.info || null,
            timetable: item.timetable || null,
            duration: item.duration || null,
            //Переменные для типов коллекции: tours
            timetable_schedule: item.timetable_schedule || null,
            //Переменные для типов коллекции: relax
            stars: item.stars || null,
            rooms: item.rooms || null
        }
    };
}

export default Resort;
