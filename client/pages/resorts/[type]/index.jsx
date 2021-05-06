import React, {Component, useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
//
import ClientLayout from '../../../layouts/ClientLayout.jsx';
//
import Global from '../../global.js';
import classes from './index.module.scss';

const ChooseResort = dynamic(() => import('../../../components/Common/ChooseResort/ChooseResort.jsx'), 
{
    // loader: место для прелоадера
});

const Relax = (props) => {
    const type = props.type;
    const convert = Global.GetConvert(type);
    const searchInfo = props.searchInfo;

    console.log('searchInfo')
    console.log(searchInfo);

    return (
        <ClientLayout title={convert[Object.keys(convert)[0]]}>
            <ChooseResort 
            path={type} 
            convert={convert}
            searchInfo={searchInfo}/>
        </ClientLayout>
    )
}

//Здесь я заранее задам пути т.к. их всего три: (вот они слева направо)
//cruises, relax, tours
export async function getStaticPaths() {
    const paths = Object.keys(Global.resorts).map((element) => {
        return { params: { type: element } };
    });
    return {
        paths: paths,
        fallback: true
    }
}

export async function getStaticProps(router) {
    const type = router.params.type;
    //
    const res = await fetch(`${Global.url}/api/resorts/getCitiesDependsOnCountries`);
    console.log(res);
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
