import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk, {
    createThunkMiddleware,
    applyMiddleware
} from './rewrite-thunk';
import reducer from './reducers';
import Layout from './components/Layout';
console.log('^^^^^^^^^^^^^ thunk after created ^^^^^^^^^^^^');
console.dir(thunk);
const app = document.getElementById('app');
const middlewareApplied = applyMiddleware(thunk);
console.log('########## middleware after applyied ###########');
console.dir(middlewareApplied);
const store = createStore(reducer, middlewareApplied);  
console.log('xxxxxxxx - store - xxxxxxxx');
console.dir(store);


ReactDOM.render(
    <Provider store={store}><Layout/></Provider>,
    app
)