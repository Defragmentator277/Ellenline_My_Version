import React from 'react';
//
import PresentationMap from '../PresentationMap/PresentationMap.jsx';
//
import classes from './Providers.module.scss';

//В основном для пансионатов с санаториями
const Providers = (props) => {
    //#region Обязательные параметр
    const services = props.services;
    const address = props.address;
    //Переменная определяющая тип постороенния секции сервисов
    const type = props.type;
    //#endregion

    //tours, cruises
    const info = props.info;
    //tours
    const points = props.points;

    function GenerateSections() {
    
        //#region For all type
        function ConvertServices(service) {
            const massiv = services[service];
            const elements = [];
            massiv.forEach(element => {
                elements.push(<i class={`fa fa-${element.icon}`} aria-hidden="true"></i>);
                elements.push(<p>{element.text}</p>);
            });
            return elements;
        }

        function GenerateSection(section, className = '') {
            return <>
                <h1>{section.title}</h1>
                <div className={classes.service + ' ' + className}>
                    {section.content}
                </div>
            </>
        }
        //#endregion

        //#region For cruises
        function ConvertShipInfo() {
            const words = 
            { 
                name: ['Название:', ' '],
                year: ['Год постройки:', ' г.'],
                capacity: ['Количество пассажиров:', ' чел.'],
                length: ['Длина:', ' м.'],
                width: ['Ширина:', ' м.'],
                heigth: ['Высота:', ' м.'],
                speed: ['Скорость:', ' м/ч.'],
                class: ['Класс лайнера:', ' '],
            };
            const elements = [];
            Object.keys(info).forEach((element) => {
                if(words[element])
                {
                    elements.push(<span>{words[element][0]}</span>); // left
                    elements.push(<p>{info[element] + words[element][1]}</p>); //right
                }
            });
            return elements;
        }
        //#endregion

        //#region For tours
        function ConvertTourInfo() {
            const languages = info.languages.map((element) => element.language).join(', ');
            const countries = info.countries.map((element) => element.name).join(', ');
            const routes = info.routes.map((element) => 'Автобусные туры ' + element.route).join(', ');
            const array_points = [ points.x, points.y ]; 
            return <>
                <i class="fa fa-map-o" aria-hidden="true"></i>
                <div className={classes.map}>
                    <PresentationMap 
                    className={classes.ymap}
                    points={[{coordinates: array_points, 
                        hintContent: '', 
                        balloonContentBody: ''}]}/>
                </div>
                <i class="fa fa-language" aria-hidden="true"></i>
                <div className={classes.languages}>
                    <p>{languages}</p>
                </div>
                <i class="fa fa-globe" aria-hidden="true"></i>
                <div className={classes.countries}>
                    <p>{countries}</p>
                </div>
                <i class="fa fa-road" aria-hidden="true"></i>
                <div className={classes.routes}>
                    <p>{routes}</p>
                </div>
            </>
        }
        //#endregion

        let sections = 
        { 
            first: undefined, 
            second: undefined, 
            thrid: undefined,
            className: undefined
        };
        switch(type)
        {
            case 'relax':
                sections.first = GenerateSection(
                { 
                    title: 'В наличии',
                    content: ConvertServices('available')
                });
                sections.second = GenerateSection(
                {
                    title: 'Общие услуги',
                    content: ConvertServices('common')
                });
                sections.third = GenerateSection(
                {
                    title: 'Услуги в номерах',
                    content: ConvertServices('rooms')
                });
                break;
            case 'cruises':
                sections.first = GenerateSection(
                {
                    title: 'О лайнере',
                    content: ConvertShipInfo()
                }, classes.cruises);
                sections.second = GenerateSection(
                {
                    title: 'В наличии',
                    content: ConvertServices('available')
                });
                sections.third = GenerateSection(
                {
                    title: 'В каютах',
                    content: ConvertServices('cabin')   
                });
                break;
            case 'tours':
                sections.className = classes.tours;
                sections.first = GenerateSection(
                {
                    title: 'Общая информация',
                    content: ConvertTourInfo()
                });
                sections.second = GenerateSection(
                {
                    title: 'Оплаченные услуги',
                    content: ConvertServices('included')
                });
                sections.third = GenerateSection(
                {
                    title: 'Платные услуги',
                    content: ConvertServices('payable')
                });
                break;
            default:
                console.log(type + ' this type of providers don`t support');
                return 'ERROR TYPE: ' + type + ' NOT SUPPORTED';
        };  
        return <div className={classes.sections + ' ' + sections.className}>
            <div className={classes.section_first}>
                {sections.first}
            </div>
            <div className={classes.section_second}>
                {sections.second}
            </div>
            <div className={classes.section_third}>
                {sections.third}
            </div>
        </div>
    }

    return (
        <div className={classes.services + ' ' + props.className}>
            {GenerateSections()}
            <div className={classes.address}>
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <h1>{address}</h1>
            </div>
        </div>

    )
}

export default Providers;
