import React from 'react';
import classes from './Input.css'

const input = (props) => {

    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={classes.inputElement} {...props.elementConfig} value={props.value}></input>
        case ('textarea'):
            inputElement = <textarea className={classes.inputElement} {...props.elementConfig} value={props.value}/>
        default:
            inputElement = <input className={classes.inputElement} {...props.elementConfig} value={props.value}></input>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}> {props.label}</label>
            {inputElement}
        </div>
    )

}

export default input;
