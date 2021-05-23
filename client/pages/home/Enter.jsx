import React from 'react';
//
import Reviews from './Reviews.jsx';
import NemoTravel from './NemoTravel.jsx';
import Comments from '../../components/Common/Comments/Comments.jsx';
//
import Global from '../global.js';
import classes from './Enter.module.scss';

// Стоит выделить Home в отдельный компонент в папку Home, вместе со стилями
const Home = (props) => {
    const comments = props.comments;
    //
    console.log('COMMENTS');
    console.log(comments);

    return (
        <div className={classes.home}>
            <NemoTravel/>

            {/* <Reviews/> */}
            {/* <SpecOffers />
            <News /> */}
        </div>
    )
}

export async function getStaticProps(router) {
    const comments = await(await fetch(`${Global.url}/api/getRandomComments`)).json();

    return {
        props: {
            comments: comments
        }
    }
}

export default Home;