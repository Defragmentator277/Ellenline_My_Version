import React from 'react';
//
import ClientLayout from '../../layouts/ClientLayout.jsx';
import Comments from '../../components/Common/Comments/Comments.jsx';
//
import Global from '../global.js';
import classes from './index.module.scss';

const AboutUs = (props) => {
    //Комментарии пользователей
    const comments = props.comments;


    return (
        <ClientLayout title='Круизы'>
            <div className={classes.about_us}>
                <div className={classes.riverlines} id="riverlines" data-key="4c19e0a08288c464ba8a8867bf74056894d2ff49" data-id="1676"></div>
                
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

export default AboutUs;