import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './Auth/reducer';
import burgerBuilderReducer from './BurgerBuilder/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    burgerBuilder: burgerBuilderReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer, composeEnhancers(applyMiddleware(thunk))
);

export default store;