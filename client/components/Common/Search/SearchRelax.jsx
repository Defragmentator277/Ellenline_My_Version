import React, { useEffect, useState } from 'react';
//
import InputText from '../../CustomElements/InputText.jsx';
import InputNumber from '../../CustomElements/InputNumber.jsx';
import SelectOption from '../../CustomElements/SelectOption.jsx';
import PriceCompare from '../../CustomElements/PriceCompare.jsx';
//
import Global from '../../../pages/global.js';
import classes from './SearchRelax.module.scss';

const SearchRelax = (props) => {
    const type = props.type;
    const searchInfo = props.searchInfo;
    const OnChainge = props.onChainge;

    console.log(searchInfo);
    console.log('')


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
