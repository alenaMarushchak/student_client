import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions/index';
import constants from "../../../constants/index";
import CreateForm from '../../../components/Admin/User/createUser';

import {Button, Modal} from 'semantic-ui-react'

const {
    createUserSaga
} = actions;


class CreateUser extends Component {

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createUser();
    };

    render() {
        const {
            closeModal,
            errors,
            modalContentProps
        } = this.props;

        console.log('render modal');
        return (
            <React.Fragment>

                <Modal.Header>Create user</Modal.Header>
                <Modal.Content>
                    <CreateForm
                        onSubmit={this.onSubmit}
                        errors={errors || {}}
                        {...modalContentProps}
                    />
                </Modal.Content>

                <Modal.Actions>
                    <Button color='black' onClick={closeModal}>
                        Close
                    </Button>
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content="Save"
                        onClick={this.onSubmit}
                    />
                </Modal.Actions>

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




