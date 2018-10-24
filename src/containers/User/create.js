import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../actions';
import constants from "../../constants";
import CreateForm from '../../components/User/createUser';

const {
    createUserSaga
} = actions;


class CreateUser extends Component {

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createUser();
        this.props.closeModal();
    };

    render() {
        const {
            closeModal,
            errors
        } = this.props;

        return (<React.Fragment>
                <button onClick={closeModal} type="button" className="button close">
                    Close modal
                </button>
                <CreateForm
                    onSubmit={this.onSubmit}
                    errors={errors || {}}
                />
            </React.Fragment>
        );
    }
}

const connectedCreateUser = connect(
    store => ({
        errors: store.errors[`${constants.CREATE_USER_SAGA}_FRONTEND`],
    }),
    dispatch => (
        {
            createUser: () => dispatch(createUserSaga()),
            dispatch
        }
    ))(CreateUser);

export default connectedCreateUser;