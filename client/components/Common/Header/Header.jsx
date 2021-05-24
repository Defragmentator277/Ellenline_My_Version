import React from 'react';
import Link from 'next/link';
//
import classes from './Header.module.scss';

const Header = (props) => {

    return (
        <div className={classes.header}>
            <div className={classes.logo}>
                <img src='https://ellinline.ru/assets/images/логотип(1).png'></img>
                <div className={classes.text}>
                    <h1>Эллинлайн</h1>
                    <p>Санкт-Петербург, ул. Зайцева д.3 Туроператор с 1993 г.</p>
                </div>
            </div>
            {/*  */}
            <div className={classes.menu}>
                <div className={classes.item}>
                    <Link href='/'>О нас</Link>
                </div>
                <div className={classes.item}>
                    <Link href='/'>Санкт-Петербург</Link>
                </div>
                <div className={classes.item}>
                    <Link href='/resorts/tours'>Туры</Link>
                </div>
                <div className={classes.item}>
                    <Link href='/resorts/relax'>Отдых</Link>
                </div>
                <div className={classes.item}>
                    <Link href='/resorts/cruises'>Круизы</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;
