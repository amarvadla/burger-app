import React, { Component } from "react";
import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withHandleError/withHandleError'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json').then((res) => {

            let fetchedOrders = [];
            for (let el in res.data) {
                fetchedOrders.push({
                    id: el,
                    ...res.data[el]
                })
            }

            this.setState({ loading: false, orders: fetchedOrders })

        }).catch((e) => {
            this.setState({ loading: false })
        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map((order) => {

                    return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />

                })}
            </div>)
    }
};

export default withErrorHandler(Orders, axios);