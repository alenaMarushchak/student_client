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
            <React.Fragment>
                <LoginForm
                    onSubmit={this.onSubmit}
                />
            </React.Fragment>
        );
    }
}

const connectedLogin = connect(
    state => ({}),
    dispatch => (
        {
            login: () => dispatch(loginSaga()),
            dispatch
        }
    ))(Login);

export default connectedLogin;