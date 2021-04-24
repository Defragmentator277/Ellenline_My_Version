import { useEffect, useState } from 'react';
//
import Title from './GeneralJsx/Title.jsx';
//
import classes from './SelectOption.module.scss';

const SelectOption = (props) => {
    const [values, setValues] = useState(props.values);
    const [selections, setSelections] = useState(0);
    //
    const onChainge = props.onChainge;
    const isOnce = props.isOnce;
    //
    const title = props.title;

    //MAYBE THIS IS BAD FOR TABLE IN ADMIN CMS 
    useEffect(() => {
        if(props.getValues)
            props.getValues(setValues);
    }, isOnce ? [] : null);

    function InsertSelections () {

        function OnChange(e) {
            const value = e.currentTarget.value;
            if(onChainge)
                onChainge(e, value);
        }

        function ConvertToElement(element) {
            return <div className={dynamic.class}>
                {dynamic.buttonLeft}
                <select className={props.classSelect} onChange={(e) => OnChange(e)}>
                    {element}
                </select>
                {dynamic.buttonRight}
            </div>
        }

        function DeleteSelectOption (e) {
            if(selections > 0)
                setSelections(index => index - 1);
        }
    
        function AddSelectOption(e) {
            setSelections(index => index + 1);
        }

        function InsertValues(enable_placeholder_in_select = false) {
            const elements = [];
            if(enable_placeholder_in_select
            && props.placeholder)
                elements.push(<option selected hidden>{props.placeholder}</option>);
            if(values && values.length != 0)
            {
                for(let i = 0; i < values.length; i++)
                {
                    if(enable_placeholder_in_select 
                    || props.placeholder != values[i])
                        elements.push(<option>{values[i]}</option>);
                }
            }
            return elements;
        }

        const elements = [];
        let dynamic = 
        {
            class: undefined,
            buttonLeft: undefined,
            buttonRight: undefined
        };

        if(props.type === 'dynamic')
        {
            dynamic.class = classes.dynamic_option;
            dynamic.buttonLeft = <i className={"fa fa-minus " + classes.leftButton} onClick={(e) => DeleteSelectOption(e)} aria-hidden="true"></i>;
            dynamic.buttonRight = <i className={"fa fa-plus " + classes.rightButton} onClick={(e) => AddSelectOption(e)} aria-hidden="true"></i>;
        }

        elements.push(ConvertToElement(InsertValues(true)));
        for(let i = 0; i < selections; i++)
        {
            elements.push(ConvertToElement(InsertValues()));
        }
        return elements;
    }

    function GenerateTitle() {
        return title ? <Title className={classes.title} title={title}/> : '';
    }

    return (
        <div className={classes.select_option + ' ' + props.className}>
            {GenerateTitle()}
            {InsertSelections()}
        </div>
    )
};

export default SelectOption;
