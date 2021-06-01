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
    //Комментарии пользователей
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
                {/* ФОТОГРАФИИ СОТРУДНИКОВ */}
                <div className={classes.title}>
                    <p>Наша команда</p>
                </div>
                <Slider images={
                [
                    'https://www.nixp.ru/uploads/news/fullsize_image/ee52cfc022cc7f6836bb971ef0bb16b11847d4db.png',
                    'https://avatars.mds.yandex.net/get-zen_doc/1101877/pub_5c386d979175d500aabd8819_5c386f619175d500aabd8833/scale_1200'
                ]} className={classes.slider}/>
                {/* ОПИСАНИЕ, О НАС */}
                <div className={classes.title}>
                    <p>О нас</p>
                </div>
                <div className={classes.text}>
                    Турагентство "Эллинлайн" уже длительное время ведет результативное сотрудничество с проверенными и популярными туроператорами в СПб (Санкт-Петербурге). Воспользовавшись эффективными услугами нашего турагентства в Санкт-Петербурге, каждый клиент получит возможность подобрать и купить тур, гарантированно соответствующий заданным критериям поиска и размеру бюджета.
                </div>
                {/* ПОИСК NEMOTRAVEL */}
                <NemoTravel/>
                {/* КОММЕНТАРИИ */}
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
    //Получение комментариев пользователей
    const res = await fetch(`${Global.url}/api/getComments`);
    const comments = await res.json();

    return {
        props: {
            comments: comments
        }
    }
}

export default Home;
