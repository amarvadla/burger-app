import React from 'react';
import classes from './Order.css'

const Order = (props) => {

    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientItem = ingredients.map((item) => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px ',
                border: '1px solid  #ccc',
                padding: '5px'

            }}
            key={item.name}>{item.name} ({item.amount})</span>
    })

    return (
        <div className={classes.Order}>
            <p>ingredients:{ingredientItem}</p>
            <p>Price: <strong> USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;