import classes from './Button.module.scss';

const Button = (props) => {
    const value = props.value;
    const type = props.type || '';
    //
    const OnSubmit = props.OnSubmit || ((e) => {});
    const OnClick = props.OnClick || ((e) => {});

    return (
        <button className={classes.button + ' ' + props.className} type={type} 
        onSubmit={(e) => OnSubmit(e)} 
        onClick={(e) => OnClick(e)}>
            {value}
        </button>
    )
}

export default Button
