import React, { Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class CheckOut extends Component {
    state = {
        ingredients: null, price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1]
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({
            ingredients: ingredients, price: price
        })
    }

    checkOutSucessHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkOutCanceledHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckOutSummary ingredients={this.state.ingredients}
                    checkOutCanceled={this.checkOutCanceledHandler}
                    checkOutSuccess={this.checkOutSucessHandler} />
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.price} {...props}/>)} />
            </div>
        )
    }
}

export default CheckOut;