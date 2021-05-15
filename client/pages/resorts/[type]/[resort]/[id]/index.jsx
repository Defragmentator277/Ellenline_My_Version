import React, { useState, useEffect } from 'react';
//
import ClientLayout from '../../../../../layouts/ClientLayout.jsx';
import FormBooking from '../../../../../components/Common/FormBooking/FormBooking.jsx';
import InfoSection from '../../../../../components/Common/InfoSection/InfoSection.jsx';
import PresentationMap from '../../../../../components/Common/Map/PresentationMap.jsx';
import Providers from '../../../../../components/Common/Providers/Providers.jsx';
import Timetable from '../../../../../components/Common/Timetable/Timetable.jsx';
import Comments from '../../../../../components/Common/Comments/Comments.jsx';
//
import Global from '../../../../global.js';
import classes from './index.module.scss';

const Resort = (props) => {
    console.log('ON CLIENT');
    console.log(props.items);
    //
    const type = props.type;
    const resort = props.resort;
    //relax, tours, cruises
    const id = props.id;
    const images = props.images;
    const title = props.title;
    const price = props.price;
    const services = props.services;
    const text= props.text;
    const adress = props.adress;
    const points = props.points;
    const comments = props.comments;
    //tours, cruises
    const info = props.info;
    const timetable = props.timetable;
    //tours
    const timetable_schedule = props.timetable_schedule;
    //relax
    const stars = props.stars;
    const rooms = props.rooms;

    function GenerateTimetable() {
        switch(type) 
        {
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

    function GenerateMap() {
        switch(type)
        {
            case 'relax':
            case 'cruises':
                return <PresentationMap 
                className={classes.map}
                points={[{coordinates: points, 
                    hintContent: '', 
                    balloonContentBody: ''}]}/>
            case 'tours':
                return;
            default:
                return console.log(type + ' don`t support');
        }
    }

    return (
        <ClientLayout title={title}>
            <div className={classes.resort}>
                <InfoSection 
                title={title} 
                price={price} 
                text={text}
                images={images}
                type={type}
                //
                stars={stars}
                duration={timetable ? timetable[timetable.length - 1].day : null}/>

                <Providers 
                services={services} 
                address={adress}
                type={type}
                //
                info={info}
                points={points}/>

                {GenerateTimetable()}

                <Comments
                comments={comments}/>

                {/* {GenerateMap()} */}

                <FormBooking 
                className={classes.form}
                price={price}
                type={type}
                id={id}
                //
                timetable={timetable_schedule}
                rooms={rooms}/>
            </div>
        </ClientLayout>
    )
}

export async function getStaticPaths() {
    const paths = [];
    //
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

export async function getStaticProps(router) {
    const type = router.params.type;
    const resort = router.params.resort;
    const id = router.params.id;
    //
    const res = await fetch(Global.url + '/api/resorts/' + type + '/' + resort + '/' + id);
    const items = await res.json();
    const item = items[0];
    //
    return {
        props: {
            items: items, //FOR DEBUGGING DELETE LATE
            type: type,
            resort: resort,
            //relax, tours, cruises
            id: item._id || null,
            title: item.name || null,
            images: item.images || null,
            price: item.price || null,
            services: item.services || null,
            text: item.description || null,
            adress: item.adress || null,
            points: item.points || null,
            comments: item.comments || null,
            //NOT NULL UP
            //tours, cruises
            info: item.info || null,
            timetable: item.timetable || null,
            duration: item.duration || null,
            //tours
            timetable_schedule: item.timetable_schedule || null,
            //relax
            stars: item.stars || null,
            rooms: item.rooms || null
        }
    };
}

export default Resort;
