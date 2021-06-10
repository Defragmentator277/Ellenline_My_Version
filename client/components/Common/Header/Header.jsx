import React from 'react';
import Link from 'next/link';
//
import Global from '../../../pages/global.js';
import classes from './Header.module.scss';
import NemoTravel from '../../../pages/home/NemoTravel.jsx';
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
                                <h1>Эллинлайн</h1>
                                <p>Санкт-Петербург, ул. Зайцева д. 3<br/>Туроператор с 1993</p>
                            </div>
                        </div>
                        <div className={classes.phone}>
                            <div className={classes.item}>
                            <i class="fab fa-whatsapp-square" style={{fontSize: '21px'}}></i> +7 921 973 33 44
                            </div>
                            <div className={classes.item}>
                            <i class="fas fa-phone"></i> (812) 785 51 70 
                            </div>
                            <div className={classes.item}>
                            <i class="fas fa-phone"></i> (812) 784 01 71 
                            </div>
                            <div className={classes.item}>
                            <i class="fas fa-envelope-open"></i> 7840054@mail.ru
                            </div>
                            <div className={classes.icon}>
                                <a href='#'><img src="https://img.icons8.com/plasticine/100/000000/vk-com.png"/></a>
                                <a href='#'><img src="https://img.icons8.com/plasticine/100/000000/facebook.png"/></a>
                                <a href='#'><img src="https://img.icons8.com/plasticine/100/000000/instagram-new--v2.png"/></a>
                            </div>
                        </div>
                        <div className={classes.slogon}>
                            Эллинлайн. Красивое<br/>напоминание об отдыхе
                        </div>
   
                    </div>
                    <div className={classes.menu}>
                    {GenerateLogIn()}
                        <div className={classes.item}>
                            <Link href='/about_us'>О нас</Link>
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
                        <div className={classes.item}>
                            <Link href='/resorts/lech'>Личный кабинет</Link>
                        </div>
                    </div>
                {/*  */}
                </div>
        </div>
    )
}

export default Header;
