import React, { useEffect } from 'react';
//
import classes from './ContextMenu.module.scss';

const ContextMenu = (props) => {
    const items = props.items;
    // item
    // { title: ..., onClick: ... }
    const { left, top } = props.points;
    const onClickOutside = props.onClickOutside;

    //Close if click 
    useEffect(() => {
    }); 

    function GenerateItems() {
        const elements = [];
        if(items && items.length != 0)
        {
            for(let i = 0; i < items.length; i++)
            {
                const item = items[i];
                elements.push(<div className={classes.button} 
                                   onClick={(e) => 
                                   { 
                                        item.OnClick(e);
                                        onClickOutside(e);
                                   }}>
                    {item.title}
                </div>);
            }
        }
        return elements;
    }

    return(
        <>
            <div className={classes.overlay} onClick={(e) => onClickOutside(e)}></div>
            <div className={classes.menu} style={{ left: left, top: top }}>
                {GenerateItems()}
            </div>
        </>
    )
}

export default ContextMenu;
