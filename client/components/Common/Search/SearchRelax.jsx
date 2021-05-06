import React, { useState } from 'react';
//
import InputText from '../../CustomElements/InputText.jsx';
import InputNumber from '../../CustomElements/InputNumber.jsx';
import SelectOption from '../../CustomElements/SelectOption.jsx';
// import PriceCompare from '../../CustomElements/PriceCompare';
//
import classes from './SearchRelax.module.scss';

const SearchRelax = (props) => {
    const searchInfo = props.searchInfo;

    //
    function GetCountries() {
        return searchInfo.map((element) => element.name);
    }
    const [country, setCountry] = useState();

    //

    function GetCities(country) {
        // return cities.map((element) => element.name);
        return searchInfo.find((element) => element.name == country).localities.map((element) => element.name);
    }
    //
    const [city, setCity] = useState();
    let setterCities = () => {};
    //

    console.log('______________________');
    console.log('COUNTRY');
    console.log(country);
    console.log('CITY');
    console.log(city);

    function CountryOnChainge(e, value) {
        const cities = GetCities(value);
        //
        if(city)
        {
            const index = searchInfo
            .find((element) => element.name == country).localities
            .findIndex((element) => element.name == city);
            //
            setCity(cities[index]);
        }
        setCountry(value);
        setterCities(cities);
    }
    //

    function CityOnChainge(e, value) {
        setCity(value);
    }

    return (
        <div className={classes.search + ' ' + props.className}>
            <InputText className={classes.input} placeholder="Название" />
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
            <InputNumber className={classes.stars} placeholder="Кол-во ★" min="1" max="5"/>
            {/*  */}
            {/* <PriceCompare className={classes.price} min='1' placeholder='Цена'/> */}
        </div>
    );
    
}

export default SearchRelax;
