import React from 'react';
//
import ClientLayout from '../../layouts/ClientLayout.jsx';
//
import NemoTravel from './NemoTravel.jsx';
import Comments from '../../components/Common/Comments/Comments.jsx';
import Slider from '../../components/CustomElements/Slider.jsx';
//
import Global from '../global.js';
import classes from './index.module.scss';

//Главная страница "О нас"
const Home = (props) => {
    //Комментарии пользователей
    const comments = props.comments;

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
