import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../Layout/UI/Button/Button'
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}><span style={{ textTransform: 'capitalize' }}>
                {igKey}
            </span> :
                {props.ingredients[igKey]}
            </li>);
    });
    return (
        <Aux>
            <h3>Your order :</h3>
            <p>A delecious burger with the following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <strong><p>Total Price: ${props.totalPrice.toFixed(2)}</p></strong>
            <p>Continue to checkout</p>
            <Button btnType={'Danger'} clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );

};

export default orderSummary;