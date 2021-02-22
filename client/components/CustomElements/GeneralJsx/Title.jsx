import React from 'react';
//
import classes from './Title.module.scss';

const Title = (props) => {
    const title = props.title;

    return <p className={classes.title + ' ' + props.className}>
        {title}
    </p>
}

export default Title;