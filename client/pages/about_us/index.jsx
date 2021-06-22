import React from 'react';
//
import ClientLayout from '../../layouts/ClientLayout.jsx';
import Comments from '../../components/Common/Comments/Comments.jsx';
//
import Global from '../global.js';
import classes from './index.module.scss';

const AboutUs = (props) => {
    //Комментарии пользователей
    const comments = props.comments;


    return (
        <ClientLayout title='О нас'>
            <div className={classes.about_us}>
                <div className={classes.greetings}>
                    <div className={classes.title}>
                        Добро пожаловать на сайт Эллинлайн!
                    </div>
                    <div className={classes.text}>
                        <div className={classes.line}/>
                        <p>
                            Наша фирма, ООО “Эллинлайн”, является турфирмой (РТО 014483)
                            <br/><br/>
                            Работаем на рынке туристских услуг с 1993 года и зарекомендовали себя как надёжная компания с высоким качеством обслуживания и профессиональной работой.
                            <br/><br/>
                            Имеем договор страхования гражданской ответственности за неисполнение или ненадлежащее исполнение обязательств по договору о реализации туристского продукта №947/16-49 от 12/02/2016 с ПАО “Страховая компания Гайде” (191119, г. Санкт-Петербург, Лиговский пр-кт, д. 108, лит.А).
                        </p>
                    </div>
                </div>
                <div className={classes.info}>
                    <div className={classes.title}>
                        О компании
                    </div>
                    <div className={classes.text}>
                        <div className={classes.line}/>
                        <p>
                            Турагенство "Эллинлайн" уже длительное время ведёт результативное сотрудничество с результативными и популярными туроператорами в Санкт-Петербурге. Воспользовавшись эффективными услугами нашего турагенства, каждый клиент получит возможность подобрать и купить тур, гарантированно соответствующий заданным критериям поиска и размеру бюджета.
                        </p>
                    </div>
                </div>
                <div className={classes.customers}>
                    <div className={classes.title}>
                        За период деятельности туристической фирмы в<br/> 
                        числе наших заказчиков были:
                    </div>
                    <div className={classes.icons}>
                        <img src='https://upload.wikimedia.org/wikipedia/ru/thumb/2/2d/Gazprom-Logo-rus.svg/1200px-Gazprom-Logo-rus.svg.png'/>
                        <div className={classes.title}>
                            ОАО "Газпром"
                        </div>
                        <img src='http://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1RkCzQgLahLceHwu9G0MhGeiaaKTM5SRkZCeTgDn6uOyic'/>
                        <div className={classes.title}>
                            ФГУП "Росморпорт"
                        </div>
                        <img src='https://fb.ru/misc/i/gallery/25724/2244633.jpg'/>
                        <div className={classes.title}>
                            Фонд Ф. Эберта
                        </div>
                    </div>

                </div>
                <div className={classes.also}>
                    <div className={classes.title}>
                        А также:
                    </div>
                    <div className={classes.list}>
                        <div className={classes.item}>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <p>
                                учредительный съезд "Либеральной партии России"
                            </p>
                        </div>
                        <div className={classes.item}>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <p>
                                мероприятия, проводимые партией "Справдливая Россия"
                                в Санкт-Петербурге;
                            </p>
                        </div>
                        <div className={classes.item}>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <p>
                                учредительный съезд "Либеральной партии России";
                            </p>
                        </div>
                        <div className={classes.item}>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <p>
                                съезд Социалистического Интернационала;
                            </p>
                        </div>
                        <div className={classes.item}>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <p>
                                ЕЭС ООН экономические формулы, проводимые в Санкт-Петербурге;
                            </p>
                        </div>
                        <div className={classes.item}>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <p>
                                международный съезд дерматовенерологов и косметологов;
                            </p>
                        </div>
                        <div className={classes.item}>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <p>
                                международный съезд работников табачной промышленности;
                            </p>
                        </div>
                        <div className={classes.item}>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <p>
                                DHL;
                            </p>
                        </div>
                        <div className={classes.item}>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <p>
                                делегация штата Миннесота во главе с губернатором.
                            </p>
                        </div>
                    </div>

                </div>
                <div className={classes.comments}>
                    {/* КОММЕНТАРИИ */}
                    <Comments
                    // className={classes.comments}
                    classTitle={classes.title}
                    title='Отзывы наших клиентов'
                    // classContent={classes.content}
                    comments={
                    [
                        {
                            user: {
                                image: 'https://data.fantlab.ru/images/users/173950_2',
                                name: 'Зимин',
                                surname: 'Даниил',
                                middle_name: 'Вячеславович'
                            },
                            text:  'Отдыхал в Новый год в санатории "Белая вежа". Брал путевку в Питере у турфирмы Эллинлайн на 12 дней. Добирался поездом до Бреста, а затем взял такси за 800 рос. рублей. От вокзала километров 40. Природа в санатории супер. Сосны и ели. Воздух пьянящий. У меня был номер люкс-2 комнаты. Питание выше похвал, всего хватало, даже фруктов. персонал доброжелюбный и не избалованный. Есть классный бассейн. Организовывают экскурсии. А можно и самому все организовать. Рядом есть магазин продовольственный и промтоварный. На территории есть бар с алкоголем. Процедуры можно попросить самому какие хотите, а можно взять и дополнительно за небольшие деньги. В санаториях Белоруси я уже во второй раз. Был сначала в Нарочи. Сравнить есть с чем. Очень хороший отдых и релакс.',
                            date: new Date(),
                            rating: 5
                        },
                        {
                            user: {
                                image: 'https://data.fantlab.ru/images/users/173950_2',
                                name: 'Зимин',
                                surname: 'Даниил',
                                middle_name: 'Вячеславович'
                            },
                            text: 'Все просто класс',
                            date: new Date(),
                            rating: 5
                        },
                    ]}/>
                </div>
            </div>
        </ClientLayout>

    )
}

export async function getStaticProps(router) {
    //Получение комментариев пользователей
    const res = await fetch(`${Global.url}/api/getComments`);
    const comments = await res.json();

    return {
        props: {
            comments: comments
        }
    }
}

export default AboutUs;