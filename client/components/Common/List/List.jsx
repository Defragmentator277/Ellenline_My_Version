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
                // element.price = 'от ' + element.price;
                elements.push(<ListItem category={resort}
                                        path={path}
                                        {...element}/>);
                                        // id={element._id}
                                        // title={element.name}
                                        // image={element.image}
                                        // adress={element.adress}
                                        // price={element.price}
                                        // services={element.services}/>);
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
