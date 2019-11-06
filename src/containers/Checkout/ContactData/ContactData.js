import React from 'react';
import styled from 'styled-components';

import axios from '../../../axios-orders';
import Button, { ACCEPT_TYPE } from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spiner';

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

const Input = styled.input`
    display: block;
    margin: 5px;
    padding: 5px;
    font-size: 14;
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

        return (
            <StyledContactData>
                <h4>Enter your contact data</h4>
                <form>
                    <Input type='text' name='name' placeholder='Your name' value={this.state.name} onChange={(event) => this.setState({name: event.target.value})}/>
                    <Input type='emai' name='email' placeholder='Your emai' value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}/>
                    <Input type='text' name='street' placeholder='Your street' value={this.state.street} onChange={(event) => this.setState({street: event.target.value})}/>
                    <Input type='text' name='postal code' placeholder='Your postal code' value={this.state.postalCode} onChange={(event) => this.setState({postalCode: event.target.value})}/>
                    <Button type={ACCEPT_TYPE} clicked={this.orderHandler}>SAVE ORDER</Button>
                </form>
            </StyledContactData>
        );
    }
}