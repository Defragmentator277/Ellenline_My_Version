import React, {Component, useEffect, useState} from 'react';                                                               
import Router from 'next/router';
//
import ClientLayout from '../../../layouts/ClientLayout.jsx';
import InputText from '../../../components/CustomElements/InputText.jsx';
import InputNumber from '../../../components/CustomElements/InputNumber.jsx';
import SelectOption from '../../../components/CustomElements/SelectOption.jsx';
import PriceCompare from '../../../components/CustomElements/PriceCompare.jsx';
//
import Global from '../../global.js';
import classes from './index.module.scss';

//Страница с формой поиска
const Relax = (props) => {
    //Названии коллекции
    const type = props.type;
    const searchInfo = props.searchInfo;
    //{ name:... , stars:... , country:... , locality:... , price: { min: ..., max:... } }
    //Конвертирующий объект
    const convert = Global.GetConvert(type);

    //#region Variables and get functions
    //NAME
    const [name, setName] = useState();
    let setterNames = () => {};
    //STARS
    const [stars, setStars] = useState();
    //COUNTRIES
    function GetCountries() {
        return searchInfo.map((element) => element.name);
    }
    const [country, setCountry] = useState();
    //CITIES
    function GetLocalities(country) {
        return searchInfo.find((element) => element.name == country).localities.map((element) => element.name);
    }
    const [locality, setLocality] = useState();
    let setterCities = () => {};
    //PRICE
    // const [price, setPrice] = useState({ min: NaN, max: NaN });
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState();
    //#endregion

    //#region [Propertie]OnChainge functions
    function NameOnChainge(e, value, setter) {
        setName(value);
    }

    function CountryOnChainge(e, value) {
        const cities = GetLocalities(value);
        //
        if(locality)
        {
            //Нахождение индекса combobox`a города, т.к. при смене страны он(индекс) не меняется нужно 
            //указать тоже значение явно
            const index = searchInfo
            .find((element) => element == country).localities
            .findIndex((element) => element == locality);
            //
            setLocality(cities[index]);
        }
        setCountry(searchInfo.find((element) => element.name == value));
        setterCities(cities);
    }

    function LocalityOnChainge(e, value) {
        setLocality(searchInfo.find((element) => element == country).localities
                          .find((element) => element.name == value));
    }

    function StarsOnChainge(e, value) {
        setStars(value);
    }

    function PriceOnChainge(value) {
        setMinPrice(value.min);
        setMaxPrice(value.max);
    }
    //#endregion

    //Генерация ссылки в зависимости от критериев поиска
    function ToLink(path)
    {
        function OnClick(e) {
            e.preventDefault();
            //
            const condition = {
                name: name,
                stars: stars,
                country: country,
                locality: locality,
                price: { min: minPrice, max: maxPrice }
            };
            //Переадрисация
            Router.push(`/resorts/${type}/${path}?condition=${JSON.stringify(condition)}`);
        }
        //Конвертирование в название 
        let content = <h1 onClick={OnClick}>{convert[path]}</h1>;
        return content;
    }

    //Генериция поля для кол-ва звезд
    function GenerateStars() {
        switch(type)
        {
            //Если это санаторий, пансионат поле генерируется
            case 'relax':
                return <InputNumber 
                className={classes.stars} 
                placeholder="Кол-во ★" 
                min="1" max="5"
                onChainge={StarsOnChainge}/>;
            default:
                return;
        }
    }

    //Дополнительный css класс, в случаи если это санатории или пансионаты
    const not_relax_class = type != 'relax' ? classes.not_relax : '';

    return (
        <ClientLayout title={convert[Object.keys(convert)[0]]}>
            <div className={classes.resort}>
                <div className={classes.search + ' ' + props.className}>
                    <InputText 
                    className={classes.name + ' ' + not_relax_class} 
                    value={name} 
                    placeholder="Название"
                    onChainge={NameOnChainge}/>
                    {/*  */}
                    {GenerateStars()}
                    {/*  */}
                    <SelectOption 
                    className={classes.country} 
                    values={GetCountries()} 
                    placeholder='Страна'
                    onChainge={CountryOnChainge}/>
                    {/*  */}
                    <SelectOption
                    className={classes.city} 
                    placeholder='Город'
                    onChainge={LocalityOnChainge}
                    getValues={(setter) => setterCities = setter}/>
                    {/*  */}
                    <PriceCompare 
                    className={classes.price} 
                    classTitle={classes.title}
                    placeholder='Цена'
                    min={minPrice}
                    max={maxPrice}
                    onChainge={PriceOnChainge}/>
                </div>
                {/* ROW */}
                <div className={classes.choose}>
                    <div className={classes.left}>
                        {ToLink(Object.keys(convert)[1])}
                    </div>
                    <div className={classes.right}>
                        {ToLink(Object.keys(convert)[2])}
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}

//Здесь заранее задаются пути т.к. их всего три: (вот они слева направо) в файле Global
//Функция NextJS запускающаяся при сборке сайта, 
//возвращает все пути для данного динамического маршрута
export async function getStaticPaths() {
    const paths = Object.keys(Global.resorts).map((element) => {
        return { params: { type: element } };
    });
    return {
        paths: paths,
        fallback: true
    }
}

//Функция NextJS запускающаяся при сборке сайта, 
//на основе путей из getStatisPaths делает запросы к серверу, 
//и передает ответы главному компоненту через props
export async function getStaticProps(router) {
    //Получение коллекции
    const type = router.params.type;
    //Получение городов, сгруппированных по странам
    const res = await fetch(`${Global.url}/api/resorts/getCitiesDependsOnCountries`);
    const searchInfo = await res.json();
    // 
    return {
        props: {
            type: type,
            searchInfo: searchInfo
        }
    }
}

export default Relax;
