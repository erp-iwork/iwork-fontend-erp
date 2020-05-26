import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store/store'
import { Provider } from 'react-redux'
import App from './App';

let storeInstance = Store()

ReactDOM.render(
    <Provider store={storeInstance}>
        <App />
    </Provider>,
document.getElementById('root'));
