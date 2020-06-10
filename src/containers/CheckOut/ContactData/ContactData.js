import React, { Component } from "react";
import Button from '../../../components/Layout/UI/Button/Button'
import classes from './ContactData.css'

class ContactData extends Component {

    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        }
    }

    OrderHandler = (event) => {
        event.preventDefault()
        console.log(this.props.ingredients)
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your details</h4>
                <form>
                    <input name="name" type="text" placeholder="Your Name" ></input>
                    <input name="email" type="email" placeholder="Your Mail" ></input>
                    <input name="street" type="text" placeholder="Street" ></input>
                    <input name="postalcode" type="text" placeholder="Postal Code" ></input>
                    <Button btnType="Success" clicked={this.OrderHandler}>ORDER</Button>
                </form>
            </div>
        )
    }

}

export default ContactData;