import React, { Component } from "react";
import Aux from '../../hoc/Auxi2';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/Layout/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/Layout/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/withHandleError/withHandleError'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

}

class BurgerBuilder extends Component {

    componentDidMount() {
        axios.get('/ingredients.json').then((response) => {
            console.log(response);
            this.setState({ ingredients: response.data })
        }).catch((e) => {
            this.setState({ error: true })
        });
    }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        // alert("continue!");
        // this.setState({ loading: true })
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     cutomer: {
        //         name: 'amar',
        //         address: { street: 'new street', zipCode: '500049', country: 'india' },
        //         email: 'amarvadla27@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order).then((response) => {
        //     console.log(response);
        //     this.setState({ purchasing: false, loading: false })
        // }).catch((e) => {
        //     this.setState({ purchasing: false, loading: false })
        //     console.log(e)
        // });
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            search: queryString,
            pathname: '/checkout'
        })
    }

    updatePurchaseState(updatedIngredients) {

        const sum = Object.keys(updatedIngredients).map((igkey) => {
            return updatedIngredients[igkey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)

        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = oldCount + 1;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedIngredients = {
                ...this.state.ingredients
            };

            updatedIngredients[type] = oldCount - 1;

            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

            this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
            this.updatePurchaseState(updatedIngredients);
        }
    }



    render() {

        const disableInfo = {
            ...this.state.ingredients
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        let burger = this.state.error ? <p>can not fetch the ingredients..!</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients} /> <BuildControls ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler} />
            </Aux>
            );

            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}
            />
        }

        return (<Aux >
            <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler} > {orderSummary}
            </Modal>
            {burger}
        </Aux>
        );
    }

}

export default WithErrorHandler(BurgerBuilder, axios);