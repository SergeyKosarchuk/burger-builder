import React from 'react';
import styled from 'styled-components';

import axios from '../../../axios-orders';
import Button, { ACCEPT_TYPE } from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spiner';
import makeInput from '../../../components/UI/Input/Input';

const StyledContactData = styled.div`
    margin: 20px auto;
    width: 80%;
    text-align: center;
    box-shadow: 0 2px 3px #ccc;
    border: 1px solid #eee;
    padding: 10px;
    box-sizing: border-box;

    @media ( min-width: 600px ) {
        width: 500px;
    }
`;

export default class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        isLoading: false,
    }
    orderForm = {
        name: {
            fieldType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name',
            },
            value: ''
        },
        email: {
            fieldType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your email',
            },
            value: ''
        },
        street: {
            fieldType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your street',
            },
            value: '',
        },
        postalCode: {
            fieldType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your postal code',
            },
            value: ''
        },
        deliveryMethod: {
            fieldType: 'select',
            elementConfig: {
                options: [
                    {value: 'fast', label: 'Fastest'},
                    {value: 'cheap', label: 'Cheapest'},
                    {
                        value: 'default',
                        label: 'Choose delivery method',
                        disabled: true,
                    },
                ],
                defaultValue: 'default',
            },
        },
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({isLoading: true})
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            customer: {
                name: this.state.name,
                address: {
                    street: this.state.street,
                    postalCode: this.state.postalCode,
                },
                email: this.state.email,
            },
            created: new Date().toISOString()
        }
        axios.post('orders/.json', order)
            .then((result) => {
                this.setState({isLoading: false})
                this.props.onComplete()
            }).catch((err) => {
                console.info(err);
            });
    }

    render () {
        if ( this.state.isLoading ) {
            return <Spinner />
        }

        const inputs = Object.entries(this.orderForm).map(([fieldName, config]) => {
            return makeInput(fieldName, config.fieldType, config.elementConfig)
        })

        return (
            <StyledContactData>
                <h4>Enter your contact data</h4>
                <form>
                    {inputs}
                    <Button type={ACCEPT_TYPE} clicked={this.orderHandler}>SAVE ORDER</Button>
                </form>
            </StyledContactData>
        );
    }
}