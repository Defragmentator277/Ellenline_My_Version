import React, {Component, useEffect, useState} from 'react';
import { useRouter } from 'next/router'; 
//Jsx
import ClientLayout from '../../../../layouts/ClientLayout.jsx';
import ListItem from './ListItem.jsx';
//Js, scss
import Global from '../../../global.js';
import classes from './index.module.scss';

const Resorts = (props) => {
    const router = useRouter();
    const [condition, setCondition] = useState();
    //
    const type = props.type;
    const resort = props.resort; 
    const items = props.items;

    console.log('ITEMS');
    console.log(items);

    useEffect(() => {
        setCondition(router.query.condition && JSON.parse(router.query.condition));
    }, [router]);

    function InsertItems() {
        const elements = [];
        if(items && items.length != 0)
        {
            for(let i = 0; i < items.length; i++)
            {
                let element = items[i];
                element.id = element._id;
                if(condition)
                {
                    if(condition.name && !new RegExp(condition.name, 'i').test(element.title))
                        continue;
                    //
                    if(condition.stars && condition.stars == element.stars)
                        continue;
                    //
                    if(condition.locality && condition.locality._id != element.locality._id)
                        continue;
                    else if(condition.country && condition.country._id.$id != element.locality.id_country.$id)
                        continue;
                    //
                    const price = condition.price;
                    if((price.min && element.min_price < price.min) || 
                       (price.max && element.min_price > price.max))
                        continue;
                    //
                }
                elements.push(<ListItem category={resort}
                                        path={type}
                                        {...element}/>);
            }
        }
        return elements;
    }

    return (
        <ClientLayout title={Global.GetConvert(type)[resort]}>
            <div className={classes.list}>
                {InsertItems()}           
            </div>
        </ClientLayout>
    )
}

//Эти функции необходимы для извлечении данных из БД, а затем передача их в пропсы
//Зачастую вместо них можно использовать, события жизненного цикла компонента
//Но если вы хотите обойти статическую генерацию в некоторых моментах придется их использовать
//

//Функция определяет пути которые должны быть пререндерены в самом начале
//Она необходима, для перехода на страницу сразу из строки поиска
export async function getStaticPaths() {
    //В этом случаи я получаю все типы отдыха и пререндериваю соотвествующие страницы
    const paths = [];
    //
    Object.keys(Global.resorts).forEach((prop) => {
        Global.resorts[prop].forEach((element) => {
            paths.push({ params: { type: prop, resort: element } });
        })
    });
    //
    return {
        paths: paths,
        fallback: true
    };
}

export async function getStaticProps(router) {
    //А здесь я получаю информацию об отдыхе, а затем передаю в качестве props`a
    const type = router.params.type;
    const resort = router.params.resort;
    //
    const res = await fetch(Global.url + '/api/resorts/'+ type + '/' + resort);
    const items = await res.json();
    //
    // const condition = router.params.condition;
    console.log('ON GET STATIC PROPS');
    // console.log(items);
    // console.log(JSON.stringify(router, null, 2));
    return {
        props: {
            type: type,
            resort: resort,
            items: items
        }
    };
}

export default Resorts;
