import React from 'react'
import Burger from '../Burger/Burger'
import Button from '../Layout/UI/Button/Button'
import classes from './CheckOutSummary.css'

const checkOutSummary = (props) => {

    return (
        <div className={classes.CheckOutSummary}>
            <h1>Hope this tastes well!!</h1>
            <div style={{ width: '80%', height: '80%', maring: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.checkOutCanceled}>Cancel</Button >
            <Button btnType="Success" clicked={props.checkOutSuccess}>Continue</Button >
        </div>
    );

}

export default checkOutSummary;