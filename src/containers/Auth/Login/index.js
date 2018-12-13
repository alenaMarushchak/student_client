import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import actions from '../../../actions';

const {
    loginSaga
} = actions;

import LoginForm from '../../../components/Auth/Login';
import constants from "../../../constants";

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
        const {errors} = this.props;

        return (
            <React.Fragment>
                <LoginForm
                    onSubmit={this.onSubmit}
                    errors={errors}
                />
            </React.Fragment>
        );
    }
}

const connectedLogin = connect(
    store => ({
        errors: store.errors[`${constants.LOGIN}_FRONTEND`],
    }),
    dispatch => (
        {
            login: () => dispatch(loginSaga()),
            dispatch
        }
    ))(Login);

export default connectedLogin;