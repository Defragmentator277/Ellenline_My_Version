import React, { useState } from 'react';
//
import ListItem from './ListItem.jsx';
//
import classes from './List.module.scss';
import image from 'next/image';

const List = (props) => {
    const resort = props.resort;
    const items = props.items;
    const path = props.path;
    
    function InsertItems() {
        const elements = [];
        if(items && items.length != 0)
        {
            for(let i = 0; i < items.length; i++)
            {
                let element = items[i];
                element.id = element._id;
                elements.push(<ListItem category={resort}
                                        path={path}
                                        {...element}/>);
            }
        }
        return elements;
    }

    return (
        <div className={classes.list}>
            {InsertItems()}           
        </div>
    )
}

export default List;
