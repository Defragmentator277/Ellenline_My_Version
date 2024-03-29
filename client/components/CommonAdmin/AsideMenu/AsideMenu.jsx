import React, { useState } from 'react';
import Link from 'next/link';
//
import classes from './AsideMenu.module.scss';

const AsideMenu = (props) => {
    const [items, setItems] = useState(props.items);
    const root = props.root;

    function GenerateItems() {

        const elements = [];
        if(items && items.length != 0)
        {
            for(let i = 0; i < items.length; i++)
            {
                let item = items[i];
                elements.push(<div className={classes.item}>
                    <Link href={`/admin/${root}/${item.href}`}>{item.title}</Link>
                </div>);
            }
        }
        return elements;
    }

    return(
        <div className={classes.menu + ' ' + props.className}>
            {GenerateItems()}
        </div>
    )
}

export default AsideMenu;