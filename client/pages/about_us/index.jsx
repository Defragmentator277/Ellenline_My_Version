import React, {useState} from 'react';
//
import ClientLayout from '../../layouts/ClientLayout.jsx';
import Comments from '../../components/Common/Comments/Comments.jsx';
//
import Global from '../global.js';
import classes from './index.module.scss';

const AboutUs = (props) => {
    //Комментарии пользователей
    const comments = props.comments;
    const [activeNav, setAcriveNav] = useState('Все санатории');
    const item = {name: 'Альянс', sity: 'Санаторий в Кисловодске', price: '2500', rating: 4, photo: '', phone: '8 800 777 31 70'};
    const data = [item, item, item, item, item, item, item];
    function GenerateItem() {
        return data.map(item=>{
            const {name, sity, price, rating, photo, phone} = item;
            return(

                <tr className={classes.item}>
                    <td className={classes.item_name}>
                        <div className={classes.title}>
                            {name}
                        </div>
                        <div className={classes.sity}>
                            {sity}
                        </div>
                    </td>
                    <td className={classes.item_price}>
                        От {price} без прайса 
                    </td>
                    <td className={classes.item_rating}>
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>
                    </td>
                    <td className={classes.item_photo}>
                        <i class="fas fa-camera"></i>
                        <div className={classes.img}><img src='https://bloggood.ru/wp-content/themes/bloggood/images/RSS-email.png'></img></div>
                    </td>
                    <td className={classes.item_lech}>
                        <img src='http://sanatoring.ru/img/med/1x.png'/>
                        <img src='http://sanatoring.ru/img/med/2.png'/>
                        <img src='http://sanatoring.ru/img/med/3.png'/>
                        <img src='http://sanatoring.ru/img/med/4.png'/>
                        <img src='http://sanatoring.ru/img/med/5x.png'/>
                        <img src='http://sanatoring.ru/img/med/6x.png'/>
                        <img src='http://sanatoring.ru/img/med/7x.png'/>
                        <img src='http://sanatoring.ru/img/med/8.png'/>
                        <img src='http://sanatoring.ru/img/med/9.png'/>
                        <img src='http://sanatoring.ru/img/med/10.png'/>
                        
                    </td>
                    <td className={classes.item_service}>
                        <img src='http://sanatoring.ru/img/service/1x.png'/>
                        <img src='http://sanatoring.ru/img/service/2x.png'/>
                        <img src='http://sanatoring.ru/img/service/3.png'/>
                        <img src='http://sanatoring.ru/img/service/4.png'/>
                        <img src='http://sanatoring.ru/img/service/5x.png'/>
                        <img src='http://sanatoring.ru/img/service/6.png'/>
                        <img src='http://sanatoring.ru/img/service/7.png'/>
                        <img src='http://sanatoring.ru/img/service/8.png'/>
                        <img src='http://sanatoring.ru/img/service/9.png'/>
                        <img src='http://sanatoring.ru/img/service/10x.png'/>
                    </td>
                    <td className={classes.item_phone}>
                        {phone}
                    </td>
                    
                </tr>
            )
        })
    }


    const styleActive ={
        backgroundColor: '#1d355d'
    }
    return (
        <ClientLayout title='О нас'>
            <div className={classes.sanatorii}>
                <div className={classes.container}>
                    <div className={classes.nav}>
                        <div className={classes.nav_item} style={styleActive}>
                            Все санатории
                        </div>
                        <div className={classes.nav_item}>
                            Пятигорск
                        </div>
                        <div className={classes.nav_item}>
                            Кисловодск
                        </div>
                        <div className={classes.nav_item}>
                            Железноводск
                        </div>
                        <div className={classes.nav_item}>
                            Ессентуки
                        </div>
                    </div>
                    <table className={classes.board_item}>
                        <tbody>
                            <tr key={'head'}>
                                <th>Название санатория</th>
                                <th>Цены от</th>
                                <th>Рейтинг</th>
                                <th>Фото</th>
                                <th>Лечебный профиль</th>
                                <th>Сервис</th>
                                <th>Телефон санатория</th>
                                
                            </tr>
                            {GenerateItem()}
                        </tbody>
                    </table>
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