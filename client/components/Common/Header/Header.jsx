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
            <div className={classes.container}>
                <div className={classes.head}>
                    <div className={classes.logo}>
                        <img src='https://ellinline.ru/assets/images/логотип(1).png'></img>
                        <div className={classes.text}>
                            <p>Санкт-Петербург, ул. Зайцева д. 3<br/>Туроператор с 1993</p>
                            <h1>Эллинлайн</h1>
                        </div>
                    </div>
                    <div className={classes.phone}>
                        <div className={classes.item}>
                            +7 921 973 33 44
                        </div>
                        <div className={classes.item}>
                            (812) 785 51 70 
                        </div>
                        <div className={classes.item}>
                            (812) 784 01 71 
                        </div>
                        <div className={classes.item}>
                            7840054@mail.ru
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className={classes.menu}>
                    {GenerateLogIn()}
                    <div className={classes.item}>
                        <Link href='/home'>О нас</Link>
                    </div>
                    <div className={classes.item}>
                        <Link href='/SPb'>Санкт-Петербург</Link>
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
                    <div className={classes.item}>
                        <Link href='/resorts/lech'>Лечение</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
