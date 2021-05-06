import React, { useState } from 'react';                                                                        
import Link from 'next/link';
//
import SearchRelax from '../Search/SearchRelax.jsx';
//
import classes from './ChooseResort.module.scss';


const ChooseResort = (props) => {
    const path = props.path;
    const convert = props.convert;
    //
    const searchInfo = props.searchInfo;
    //
    const OnClick = props.onClick;
    
    function ToLink(type)
    {
        let content = <h1 onClick={OnClick} type={type}>{convert[type]}</h1>;
        if(OnClick)
            return content;
        else
            return <Link href={`/resorts/${path}/${type}`}>{content}</Link>;
    }

    return(
        <div className={classes.resort + ' ' + props.className}>
            <SearchRelax className={classes.search} searchInfo={searchInfo}/>
            <div className={classes.choose}>
                <div className={classes.left}>
                    {ToLink(Object.keys(convert)[1])}
                </div>
                <div className={classes.right}>
                    {ToLink(Object.keys(convert)[2])}
                </div>
            </div>
        </div>
    )
}

export default ChooseResort;