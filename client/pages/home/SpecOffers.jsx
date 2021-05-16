import React from 'react'

import classes from './SpecOffers.module.scss';

const SpecOffers = () => {
    const tur = {img: 'https://p4.wallpaperbetter.com/wallpaper/246/533/176/saint-petersburg-city-in-russia-wallpaper-preview.jpg', title: 'Экскурсия по Санк-Петербургу', descr: 'Вы узнаете основные сведения о самых известных петербургских зданиях, памятниках, улицах и площадях', price: 700};
    const specData = [tur, tur, tur, tur,tur,tur];

    const mapSpecData = () =>{
        return specData.map((item)=>{
            const {img, title, descr, price} = item;
            return(
                <div className={classes.spec__wrapper__item}>
                    <div className={classes.spec__wrapper__item__image}>
                        <img src={img} alt='img'/>
                        <a href='#'>
                            <h3>{title}</h3>
                        </a>
                    </div>
                    <div className={classes.spec__wrapper__item__descr}>
                        {descr}
                    </div>
                    <div className={classes.spec__wrapper__item__price}>
                        {price} руб.
                    </div>
                </div>
            )
        })
    }
    
    return(
        <div className={classes.spec}>
            <h2>Наши спецпредложения</h2>
            <div className={classes.spec__wrapper}>
                {mapSpecData()}
            </div>
        </div>
    )
}

export default SpecOffers