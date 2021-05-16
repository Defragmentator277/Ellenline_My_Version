import React from 'react'
import classes from './News.module.scss';

const News = () => {
    
    ///Новости
    const newsData = [
        {
            date: '14 мая', 
            title: 'Греция разрешила въезд россиянам',
            text: `Греция отменила ограничения на взъезд для россиян и других туристов. Совместное межминистерское решение опубликовала официальная правительственная газета.
            Россия вошла в список из 21 страны, граждане которых смогут добраться до республики любым транспортным средством через аэропорты и действующие порты и пункты пропуска.`
        },
        {
            date: '3 февраля', 
            title: 'Российские туристы рассказали, как путешествуют во время пандемии',
            text: `Аналитический центр сервиса поездок и путешествий выяснил, корректируют ли как-то российские путешественники свои планы из-за пандемии и чувствуют ли ее влияние на поездки, сообщает Туту.ру.
            В исследовании приняли участие 1 687 человек.
            Более трети (35 процентов) опрошенных сообщили, что все еще стараются никуда не выбираться. Примерно 12 процентов также свели поездки к минимуму и отправляются куда-то только при острой необходимости или по долгу службы.
            За эпидемиологической обстановкой в городе назначения следят, как минимум, шесть процентов респондентов: они стараются ездить только туда, где мало заболевших. Активно путешествуют, но тщательно выполняют меры предосторожности, постоянно носят маски и пользуются санитайзерами 11 процентов опрошенных.
            Наконец, 36 процентов респондентов рассказали, что путешествуют спокойно, как до пандемии.`
        },
        {
            date: '3 февраля', 
            title: 'Кулинарный тур в Грузию',
            text: 'Грузинская кухня "из первых рук" - гастрономические мастер-классы от шефов и не только. Кухня Грузии знаменита оригинальными контрастами острого и пряного, сочным ароматным мясом, многочисленными соусам и, конечно же, красным вином.'
        }
    ];

    ///Переборка переменной "newsData" и вывод всех новостей
    const mapNewsData = () =>{
        return newsData.map((item)=>{
            const { date, title, text } = item;
            return(
                <div className={classes.news__wrapper__item}>
                    <div className={classes.news__wrapper__item__date}>
                        {date}
                    </div>
                    <div className={classes.news__wrapper__item__title}>
                        {title}
                    </div>
                    <div className={classes.news__wrapper__item__text}>
                        {text}
                    </div>
                </div>
            )
        })
    }
    return (
        <div className={classes.news}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {/* Новости */}
                <div>
                    <h3 className={classes.news__title}>Новости</h3>
                    <div className={classes.news__wrapper}>
                        {mapNewsData()}
                    </div>
                    <a href='#' className={classes.news__allNews}>Все новости...</a>
                </div>

                {/* Социальные сети */}
                <div className={classes.news__socialNetworks}>
                    <h3 className={classes.news__socialNetworks__title}>
                        Подписывайтесь на наши соцсети!
                    </h3>
                    <div className={classes.news__socialNetworks__wrapper}>
                        <a href='#'><img src="https://img.icons8.com/clouds/100/000000/vk-com.png"/></a>
                        <a href='#'><img src="https://img.icons8.com/clouds/100/000000/facebook-new.png"/></a>
                        <a href='#'><img src="https://img.icons8.com/clouds/100/000000/instagram-new--v2.png"/></a>
                    </div>
                </div>
            </div>

            {/* Секция с партнёрами ELLENLINE */}
            <div className={classes.news__partners}>
                <h3 className={classes.news__partners__title}>
                    Работаем с надёжными туроператорами
                </h3>
                <div className={classes.news__partners__wrapper}>
                    <div className={classes.news__partners__img}>
                        <img src='https://kaskad-trk.ru/wp-content/uploads/2019/06/pegas.png'/>
                        <img src='http://surl.li/tsbh'/>
                        <img src='https://kaskad-trk.ru/wp-content/uploads/2019/06/pegas.png'/>
                        <img src='http://surl.li/tsbh'/>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News