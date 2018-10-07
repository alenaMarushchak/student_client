import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import actions from '../../../actions';

const {
    loginSaga
} = actions;

import LoginForm from '../../../components/Auth/Login';

class Login extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        login   : PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login();
    };

    render() {
        return (
            <main className="main-content login">
                <div className="login-wrapper">
                    <h2 className="login-heading">Login</h2>
                    <div className="login-block">
                        <LoginForm
                            onSubmit={this.onSubmit}
                        />
                    </div>
                </div>
            </main>
        );
    }
}

const connectedLogin = connect(
    state => ({}),// eslint-disable-next-line
    dispatch => (
        {
            login: () => dispatch(loginSaga()),
            dispatch
        }
    ))(Login);

export default connectedLogin;