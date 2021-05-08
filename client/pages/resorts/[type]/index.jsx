import React, {Component, useEffect, useState} from 'react';                                                               
import Link from 'next/link';
import dynamic from 'next/dynamic';
//
import ClientLayout from '../../../layouts/ClientLayout.jsx';
import SearchRelax from '../../../components/Common/Search/SearchRelax.jsx';
//
import Global from '../../global.js';
import classes from './index.module.scss';

// const ChooseResort = dynamic(() => import('../../../components/Common/ChooseResort/ChooseResort.jsx'), 
// {
//     // loader: место для прелоадера
// });

const Relax = (props) => {
    const type = props.type;
    const convert = Global.GetConvert(type);
    const searchInfo = props.searchInfo;

    console.log('searchInfo');
    console.log(searchInfo);
    
    function ToLink(path)
    {
        let content = <h1 type={path}>{convert[path]}</h1>;
        // if(OnClick)
        //     return content;
        // else
            return <Link href={`/resorts/${type}/${path}`}>{content}</Link>;
    }

    function FilterOnChainge(value) {
        console.log('FILTER CHAINGED');
        console.log(value);
    }

    return (
        <ClientLayout title={convert[Object.keys(convert)[0]]}>
            <div className={classes.resort + ' ' + props.className}>
                <SearchRelax 
                className={classes.search} 
                searchInfo={searchInfo}
                onChainge={FilterOnChainge}/>
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
            {/* <ChooseResort 
            path={type} 
            convert={convert}
            searchInfo={searchInfo}/> */}
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
