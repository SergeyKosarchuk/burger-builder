import React from 'react';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import rootStoreContext from '../../context/rootStoreContext';


class Checkout extends React.Component<RouteComponentProps> {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>

  render () {
    const { ingredients, totalPrice } = this.context.burgerBuilderStore;
    const { history, match } = this.props;

    return (
      <div>
        <CheckoutSummary ingredients={ingredients}
                totalPrice={totalPrice.toFixed()}
                checkoutCancelled={() => history.goBack()}
                checkoutContinued={() => history.push(match.path + '/contact-data')}/>
        <Route path={match.path + '/contact-data'}>
          <ContactData onComplete={() => history.push('/')}/>
        </Route>
      </div>
    );
  }
}

export default withRouter(Checkout);
