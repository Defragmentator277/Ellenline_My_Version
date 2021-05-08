import React, { useEffect, useState } from 'react';
//
import InputText from '../../CustomElements/InputText.jsx';
import InputNumber from '../../CustomElements/InputNumber.jsx';
import SelectOption from '../../CustomElements/SelectOption.jsx';
import PriceCompare from '../../CustomElements/PriceCompare.jsx';
//
import classes from './SearchRelax.module.scss';

const SearchRelax = (props) => {
    const searchInfo = props.searchInfo;
    const OnChainge = props.onChainge;

    //#region Variables and get functions
    //NAME
    const [name, setName] = useState();
    //STARS
    const [stars, setStars] = useState();
    //COUNTRIES
    function GetCountries() {
        return searchInfo.map((element) => element.name);
    }
    const [country, setCountry] = useState();
    //CITIES
    function GetCities(country) {
        // return cities.map((element) => element.name);
        return searchInfo.find((element) => element.name == country).localities.map((element) => element.name);
    }
    const [city, setCity] = useState();
    let setterCities = () => {};
    //PRICE
    // const [price, setPrice] = useState({ min: NaN, max: NaN });
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState();
    //#endregion

    useEffect(() => {
        console.log('PRICE IN SEARCH RELAX');
        console.log(minPrice);
        console.log(maxPrice);
        // if(OnChainge)
        //     OnChainge({ name: name, stars: stars, country: country, city: city, price: price });
    });

    //#region [Propertie]OnChainge functions
    function NameOnChainge(e, value) {
        setName(value);
    }

    function CountryOnChainge(e, value) {
        const cities = GetCities(value);
        //
        if(city)
        {
            //Нахождение индекса combobox`a города, т.к. при смене страны он(индекс) не меняется нужно 
            //указать тоже значение явно
            const index = searchInfo
            .find((element) => element.name == country).localities
            .findIndex((element) => element.name == city);
            //
            setCity(cities[index]);
        }
        setCountry(value);
        setterCities(cities);
    }

    function CityOnChainge(e, value) {
        setCity(value);
    }

    function StarsOnChainge(e, value) {
        setStars(value);
    }

    function PriceOnChainge(value) {
        // console.log()
        setMinPrice(value.min);
        setMaxPrice(value.max);
        // setPrice(value);
        // set
    }
    //#endregion

    return (
        <div className={classes.search + ' ' + props.className}>
            <InputText 
            className={classes.name} 
            value={name} 
            placeholder="Название"
            onChainge={NameOnChainge}/>
            {/*  */}
            <InputNumber 
            className={classes.stars} 
            placeholder="Кол-во ★" 
            min="1" max="5"
            onChainge={StarsOnChainge}/>
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
            onChainge={CityOnChainge}
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
    );
    
}

export default SearchRelax;
