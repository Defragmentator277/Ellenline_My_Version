import React from 'react'

import classes from './Footer.module.scss';

const Footer = () => {

    return(
        <div className={classes.footer}>
            <div className={classes.footer__left__icon}>
                <a href='#'><img src="https://img.icons8.com/plasticine/100/000000/vk-com.png"/></a>
                <a href='#'><img src="https://img.icons8.com/plasticine/100/000000/facebook.png"/></a>
                <a href='#'><img src="https://img.icons8.com/plasticine/100/000000/instagram-new--v2.png"/></a>
            </div>
            <div className={classes.footer__dis}>
                <div className={classes.footer__left}>
                    <div className={classes.footer__left__info}>
                        <div className={classes.footer__left__info__tur}>
                            Туристическое агенство "Эллинлайн"
                        </div>
                        <div className={classes.footer__left__info__email}>
                            e-mail: 7840054@mail.ru
                        </div>
                        <a href='#'>Пользовательское соглашение</a>
                        <br/>
                        <a href='#'>Политика конфиценциальности</a>
                        <br/>
                    </div>
                </div>
                <div className={classes.footer__center}>
                    <div className={classes.footer__center__left}> 
                        <div href='#'>Главная</div>
                        <div href='#'>Поиск туров</div>
                        <div href='#'>О компании</div>
                        <div href='#'>Контакты</div>
                    </div>
                    <div className={classes.footer__center__left}> 
                        <div href='#'>Информация</div>
                        <div href='#'>Экскурсии</div>
                        <div href='#'>Санатории</div>
                        <div href='#'>Бронирование туров</div>
                    </div>
                </div>
                <div className={classes.footer__right}>
                    <div className={classes.footer__right__number}>
                        +7 921 9733344
                    </div>
                    <div className={classes.footer__right__number}>
                        (812) 783 51 70
                    </div>
                    <div className={classes.footer__right__number}>
                        (812) 784 04 71
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer