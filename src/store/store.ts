import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import authReducer from './Auth/reducer';
import burgerBuilderReducer from './BurgerBuilder/reducer';
import orderReducer from './Orders/reducer';


const rootReducer = combineReducers({
    auth: authReducer,
    burgerBuilder: burgerBuilderReducer,
    orders: orderReducer,
})

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
));


export default store;
export type RootState = ReturnType<typeof rootReducer>;
