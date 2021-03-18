import React, { useState } from 'react';
import Link from 'next/link';
import classes from './ListItem.module.scss';

const ListItem = (props) => {
    const [id, setId] = useState(props.id);
    const [image, setImage] = useState(props.image);
    const [title, setTitle] = useState(props.title);
    const [adress, setAddress] = useState(props.adress);
    const [min_price, setPrice] = useState(props.min_price);
    const [services, setServices] = useState(props.services);
    const [category, setCategory] = useState(props.category);
    //
    const path = props.path;
    
    function ConvertServices(){
        let elements = [];
        if(services && services.length != 0)
        {
            let offset = 0;
            for(let i = 0; i < services.length; i++)
            {
                let service = services[i];
                let column_offset = {gridColumn: `${i + 1}`};
                elements.push(<i class={"fa fa-" + service.icon} aria-hidden="true" style={column_offset}></i>);
            }
        }
        return elements;
    }

    return (
        <Link href={`/resorts/${path}/${category}/${id}`}>
            <div className={classes.list_item + ' ' + classes.className}
            style={{backgroundImage: `url(${image})`}}>
                <div className={classes.top}>
                    <h1 className={classes.title}>
                        {title}
                    </h1>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.address}>
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <p>{adress}</p>
                    </div>
                    <div className={classes.price}>
                        <i class="fa fa-money" aria-hidden="true"></i>
                        <p>от {min_price} руб.</p>
                    </div>
                    <div className={classes.services}>
                        {ConvertServices()}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ListItem;