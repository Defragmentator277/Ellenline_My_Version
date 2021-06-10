import React from 'react';
//
import ClientLayout from '../../layouts/ClientLayout.jsx';
//
import NemoTravel from './NemoTravel.jsx';
import Slider from '../../components/CustomElements/Slider.jsx';
import Comments from '../../components/Common/Comments/Comments.jsx';
import ListItem from '../resorts/[type]/[resort]/ListItem.jsx';
import SpecOffers from './SpecOffers.jsx';
//
import Global from '../global.js';
import classes from './index.module.scss';

//Главная страница "О нас"
const Home = (props) => {

    function GenerateList() {
        const items = 
        [
            {
                id: 0,
                image: 'https://avatars.mds.yandex.net/get-zen_doc/3023531/pub_5fa941f91aeb58326cecd2fb_5fa9447447a34812ce0c11f5/scale_1200',
                title: 'Белая вежа',
                adress: 'Народня улица кв. 46',
                min_price: 15000,
                services: { icon: 'glass' },
                category: 'tours'
                
            },
            {
                id: 0,
                image: 'https://avatars.mds.yandex.net/get-zen_doc/3023531/pub_5fa941f91aeb58326cecd2fb_5fa9447447a34812ce0c11f5/scale_1200',
                title: 'Белая вежа',
                adress: 'Народня улица кв. 46',
                min_price: 15000,
                services: { icon: 'glass' },
                category: 'tours'
                
            },
            {
                id: 0,
                image: 'https://avatars.mds.yandex.net/get-zen_doc/3023531/pub_5fa941f91aeb58326cecd2fb_5fa9447447a34812ce0c11f5/scale_1200',
                title: 'Белая вежа',
                adress: 'Народня улица кв. 46',
                min_price: 15000,
                services: { icon: 'glass' },
                category: 'tours'
                
            }
        ]
        const elements = [];
        for(let i = 0; i < items.length; i++)
        {
            elements.push(<ListItem {...items[i]}/>);
        }
        console.log(elements);  
        return elements;
    }

    return (
        <ClientLayout>
            <div className={classes.home}>
                <div className={classes.NemoTravel}>
                    <NemoTravel/>
                </div>
                <div className={classes.title}>
                    <p>Горящие туры</p>
                </div>
                <br/>
                <div className={classes.list}>
                    {GenerateList()}
                </div>
                <SpecOffers/>
            </div>
        </ClientLayout>
    )
}

export default Home;
