import React from 'react';
import Link from 'next/link';
//
import Global from '../../../pages/global.js';
import classes from './Header.module.scss';

const Header = (props) => {
    const account_user = Global.getCookie('account_user');

    function GenerateLogIn() {
        return account_user ? 
        <div className={classes.item}>
            <Link href={'/account/' + account_user._id}>Войти в личный кабинет</Link>
        </div> : '';
    }

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
                {GenerateLogIn()}
                <div className={classes.item}>
                    <Link href='/home'>О нас</Link>
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
