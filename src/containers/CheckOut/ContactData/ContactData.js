import React, { Component } from "react";
import Button from '../../../components/Layout/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/Layout/UI/Spinner/Spinner'
import Input from '../../../components/Input/Input'

class ContactData extends Component {

    state = {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: ''
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: ''
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code'
            },
            value: ''
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: ''
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-mail'
            },
            value: ''
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
               options : [
                   {value : 'fastest' , displayValue : 'Fastest'},
                   {value : 'cheapest' , displayValue : 'Cheapest'}
                ]
            },
            value: ''
        },
        loading: false
    }

    OrderHandler = (event) => {
        event.preventDefault()
        console.log(this.props.ingredients)
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            cutomer: {
                name: 'amar',
                address: { street: 'new street', zipCode: '500049', country: 'india' },
                email: 'amarvadla27@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then((response) => {
            console.log(response);
            this.setState({ purchasing: false, loading: false })
            this.props.history.push('/')
        }).catch((e) => {
            this.setState({ purchasing: false, loading: false })
            console.log(e)
        });
    }

    render() {
        let form =
            <form>
                <Input name="name" type="text" placeholder="Your Name" ></Input>
                <Input name="email" type="email" placeholder="Your Mail" ></Input>
                <Input name="street" type="text" placeholder="Street" ></Input>
                <Input name="postalcode" type="text" placeholder="Postal Code" ></Input>
                <Button btnType="Success" clicked={this.OrderHandler}>ORDER</Button>
            </form>


        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your details</h4>
                {form}
            </div>
        )
    }

}

export default ContactData;