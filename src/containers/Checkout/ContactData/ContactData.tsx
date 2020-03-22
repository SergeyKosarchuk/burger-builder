import React from 'react';
import styled from 'styled-components';

import Button, { ACCEPT_TYPE } from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import makeInput from '../../../components/UI/Input/Input';
import { EmailValidator, LengthValidator, IValidator } from './validators';
import { FieldType } from '../../../components/UI/Input/types';
import rootStoreContext from '../../../context/rootStoreContext';
import { observer } from 'mobx-react';

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
  name: string,
  email: string,
  street: string,
  postalCode: string,
  isLoading: boolean,
  formErrors: FormErrorsType,
  deliveryMethod?: string
}

type ValidatedInputFieldSet = 'name' | 'postalCode' | 'street' | 'email';
type NonValidatedInputFieldSet = 'deliveryMethod';
type InputFieldSet = ValidatedInputFieldSet | NonValidatedInputFieldSet;
type FormErrorsType = {
  [field: string]: boolean
};

type Validators = {
  [field: string]: IValidator
};

type FieldConfig = {
  fieldType: FieldType,
  elementConfig: any
}

type orderFormType = {
  [field in InputFieldSet]: FieldConfig
};

@observer
class ContactData extends React.Component<ContactDataProps, ContactDataState> {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>

  state = {
    name: '',
    email: '',
    street: '',
    postalCode: '',
    isLoading: false,
    formErrors: {
      name: false,
      email: false,
      street: false,
      postalCode: false,
      deliveryMethod: false
    },
    deliveryMethod: undefined
  }
  orderForm: orderFormType = {
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

  validators: Validators = {
    name: new LengthValidator(5, 10),
    postalCode: new LengthValidator(6, 6),
    street: new LengthValidator(10, 20),
    email: new EmailValidator()
  }

  orderHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    this.setState({isLoading: true})

    const contactData = {
      name: this.state.name,
      street: this.state.street,
      postalCode: this.state.postalCode,
      email: this.state.email,
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

  inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = (event.target.name as InputFieldSet);
    const value = event.target.value;
    const hasError = this.validators[name] ? !this.validators[name].validate(value) : false;

    this.setState(prevState => {
      const newState = {
        ...prevState,
        formErrors: {
          ...prevState.formErrors
        }
      };
      newState[name] = value;
      newState.formErrors[name] = hasError;
      return newState;
    })
  }

  render () {
    if ( this.state.isLoading ) {
      return <Spinner />
    }

    const inputs = Object.entries(this.orderForm).map(item => {
      const fieldName = (item[0] as InputFieldSet);
      const config = (item[1] as any);
      const hasError = !!this.state.formErrors[fieldName];
      const value: any = this.state[fieldName];

      return makeInput({
        fieldName: fieldName,
        fieldType: config.fieldType,
        fieldOptions: config.elementConfig,
        changed: this.inputChangedHandler,
        hasError: hasError,
        value: value
      })
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

export default ContactData;
