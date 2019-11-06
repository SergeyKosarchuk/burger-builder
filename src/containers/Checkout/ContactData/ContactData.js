import React from 'react';
import styled from 'styled-components';

import Button, { ACCEPT_TYPE } from '../../../components/UI/Button/Button';

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
        }
    }

    render () {
        return (
            <StyledContactData>
                <h4>Enter your contact data</h4>
                <form>
                    <Input type='text' name='name' placeholder='Your name' />
                    <Input type='emai' name='email' placeholder='Your emai' />
                    <Input type='text' name='street' placeholder='Your street' />
                    <Input type='text' name='postal code' placeholder='Your postal code' />
                    <Button type={ACCEPT_TYPE}>SAVE ORDER</Button>
                </form>
            </StyledContactData>
        );
    }
}