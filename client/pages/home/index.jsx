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

const Home = (props) => {
    const comments = props.comments;

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
        <ClientLayout title='О нас'>
            <div className={classes.home}>
                <div className={classes.title}>
                    <p>Фото</p>
                </div>
                <br/>
                <Slider 
                className={classes.slider}
                images=
                {[
                    'https://infotolium.com/uploads/posts/2012-06/1339458128_sankt_petersb_35.jpg',
                    'http://russianasha.ru/files/tours/images/d0/ca/sankt-peterburg-den-za-dnem-5-dn-4-n.jpg'
                ]}/>
                <NemoTravel/>
                <Comments
                className={classes.comments}
                classTitle={classes.title}
                classContent={classes.content}
                comments={comments}/>
                <div className={classes.title}>
                    <p>Горящие туры</p>
                </div>
                <br/>
                <div className={classes.list}>
                    {GenerateList()}
                </div>
                <div className={classes.title}>
                    <p>Новости</p>
                </div>
                <SpecOffers/>
            </div>
        </ClientLayout>
    )
}

export async function getStaticProps(router) {
    const res = await fetch(`${Global.url}/api/getComments`);
    const comments = await res.json();

    return {
        props: {
            comments: comments
        }
    }
}

export default Home;
