import React from 'react';
import styled from 'styled-components';

import Button, { ACCEPT_TYPE } from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { LengthValidator } from './validators';
import rootStoreContext from '../../../context/rootStoreContext';
import { observer } from 'mobx-react';
import { CustomInput } from '../../../components/UI/Input/CustomInput';

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

interface ContactDataProps {
  onComplete(): void,
}

interface ContactDataState {
  address: string,
  isError: boolean,
  isLoading: boolean,
}

@observer
class ContactData extends React.Component<ContactDataProps, ContactDataState> {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>

  state = {
    address: '',
    isLoading: false,
    isError: false,
  }
  addressValidator = new LengthValidator(10, 15);

  orderHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    this.setState({isLoading: true})
    const user = this.context.authStore.user;
    const burger = this.context.burgerBuilderStore.burger;

    if (user && burger) {
      const contactData = {
        address: this.state.address,
        burger: burger,
        extraIngredients: this.context.burgerBuilderStore.extraIngredients,
        excludeIngredients: this.context.burgerBuilderStore.excludeIngredients,
      }

      try {
        await this.context.ordersStore.saveOrder(contactData);
        this.props.onComplete();
      }
      catch (err) {
        alert(err.message);
      }
      finally {
        this.setState({isLoading: false})
      }
    }
  }

  addressChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const address = event.target.value;

    if (this.addressValidator.validate(address)) {
      this.setState({ address: address, isError: false });
    }
    else {
      this.setState({ address: address, isError: true });
    }
  }

  render () {
    if ( this.state.isLoading ) {
      return <Spinner />
    }

    return (
      <StyledContactData>
        <h4>Enter your contact data</h4>
        <form>
          <CustomInput value={this.state.address} name='address' onChange={this.addressChangedHandler} placeholder='Address' hasError={this.state.isError}/>
          <Button type={ACCEPT_TYPE} clicked={this.orderHandler} disabled={this.state.isError}>SAVE ORDER</Button>
        </form>
      </StyledContactData>
    );
  }
}

export default ContactData;
