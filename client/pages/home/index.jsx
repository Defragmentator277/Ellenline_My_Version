import React from 'react';
//
import ClientLayout from '../../layouts/ClientLayout.jsx';
//
import NemoTravel from './NemoTravel.jsx';
import Comments from '../../components/Common/Comments/Comments.jsx';
//
import Global from '../global.js';
import classes from './index.module.scss';

const Home = (props) => {
    const comments = props.comments;

    return (
        <ClientLayout title='О нас'>
            <div className={classes.home}>
                <NemoTravel/>
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
    const res = await fetch(`${Global.url}/api/getComments`);
    const comments = await res.json();

    return {
        props: {
            comments: comments
        }
    }
}

export default Home;
