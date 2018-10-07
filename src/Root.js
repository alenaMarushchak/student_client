import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import App from './containers/App';
import AxiosConfigurator from './services/axiosConfig';

import Modal from './containers/Modal';
import {ToastContainer} from 'react-toastify';

import sagas from './sagas';
import {configureStore, sagaMiddleware} from './stores/configureStore';
import historyCreator from './services/history';

//import 'styles/main.scss';
//import 'react-toastify/dist/ReactToastify.css';

const store = configureStore({});

new AxiosConfigurator(store);

sagaMiddleware.run(sagas);

class Root extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router history={historyCreator.generateHistory()}>
                    <App>
                        <Modal/>
                        <ToastContainer/>
                    </App>
                </Router>
            </Provider>
        );
    }
}

export default Root;

