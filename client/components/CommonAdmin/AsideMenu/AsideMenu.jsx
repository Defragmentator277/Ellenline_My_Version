import React, { useState } from 'react';
import Link from 'next/link';
//
import classes from './AsideMenu.module.scss';

const AsideMenu = (props) => {
    const [items, setItems] = useState(props.items);
    const root = props.root;

    function GenerateItems() {

        function GenerateItem(item) {
            return item.items.map((element) => 
            <Link href={`/admin/${root}/${item.href}/${element.href}`}>
                {element.title}
            </Link>);
        }

        const elements = [];
        if(items && items.length != 0)
        {
            for(let i = 0; i < items.length; i++)
            {
                let item = items[i];
                elements.push(<div className={classes.item}>
                    <Link href={`/admin/${root}/${item.href}`}>{item.title}</Link>
                    <div className={classes.submenu}>
                        {GenerateItem(item)}
                    </div>
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