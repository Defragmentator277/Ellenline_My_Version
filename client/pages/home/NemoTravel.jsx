import React, { useEffect } from 'react';
import classes from './NemoTravel.module.scss';

const NemoTravel = () => {

    useEffect(() => {
        FlightsSearchWidget.init({
            nemoURL: 'http://nemodemo.nemo.travel/',
            rootElement: document.getElementById('fillNemoTravel'),
            locale: 'ru'
        });
    });

    return <div className={classes.nemo_travel}>
        <div id="fillNemoTravel"></div>
    </div>;
}

export default NemoTravel;