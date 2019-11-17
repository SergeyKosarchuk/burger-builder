import React from 'react';
import styled from 'styled-components';

import axios from '../../../axios-orders';
import Button, { ACCEPT_TYPE } from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spiner';
import makeInput from '../../../components/UI/Input/Input';


class LengthValidator{
    constructor(minLength, maxLength) {
        this.minLength = minLength
        this.maxLength = maxLength
    }

    validate (value) {
        if (this.minLength && value.length < this.minLength) {
            return false;
        }

        if (this.maxLength && value.length > this.maxLength) {
            return false;
        }
        return true
    }
}

class EmailValidator {
    validate (email) {
        return email.includes('@') && email.includes('.');
    }
}

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
        street: '',
        postalCode: '',
        isLoading: false,
        formErrors: {},
    }
    orderForm = {
        name: {
            fieldType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name',
            },
        },
        email: {
            fieldType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your email',
            },
        },
        street: {
            fieldType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your street',
            },
        },
        postalCode: {
            fieldType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your postal code',
            },
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

    validators = {
        name: new LengthValidator(5, 10),
        postalCode: new LengthValidator(6, 6),
        street: new LengthValidator(10, 20),
        email: new EmailValidator()
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

    inputChangedHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const hasError = this.validators[name] ? !this.validators[name].validate(value) : false;

        this.setState((prevState, props) => {
            prevState[name] = value;
            prevState.formErrors[name] = hasError;
            return prevState;
        })
    }

    render () {
        if ( this.state.isLoading ) {
            return <Spinner />
        }

        const inputs = Object.entries(this.orderForm).map(([fieldName, config]) => {
            return makeInput(
                fieldName,
                config.fieldType,
                config.elementConfig,
                this.inputChangedHandler,
                !!this.state.formErrors[fieldName],
                this.state[fieldName]
            )
        })

        const formHasError = Object.values(this.state.formErrors).some((value) => value);

        return (
            <StyledContactData>
                <h4>Enter your contact data</h4>
                <form>
                    {inputs}
                    <Button type={ACCEPT_TYPE} clicked={this.orderHandler} disabled={formHasError}>SAVE ORDER</Button>
                </form>
            </StyledContactData>
        );
    }
}