import React, { Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class CheckOut extends Component {
    state = {
        ingredients: {
            meat: 1,
            salad: 2,
            cheese: 1,
            bacon: 0
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1]
        }
        this.setState({
            ingredients: ingredients
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
                    render={() => (<ContactData ingredients={this.state.ingredients} />)} />
            </div>
        )
    }
}

export default CheckOut;