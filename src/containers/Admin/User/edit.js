import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions/index';
import constants from "../../../constants/index";
import EditForm from '../../../components/Admin/User/editUser';
import {push} from "react-router-redux";
import {Button, Modal} from "semantic-ui-react";

const {
    editUserSaga,
} = actions;

class EditUser extends Component {

    onSubmit = (e) => {
        e.preventDefault();

        this.props.editUser(this.props.modalContentProps.id);
        this.props.dispatch(push('/users'));
    };

    closeModal = () => {
        const {closeModal} = this.props;

        closeModal();
    };

    render() {
        const {
            errors = {},
            user = {},
            modalContentProps
        } = this.props;


        return ( <React.Fragment>

                <Modal.Header>Edit user</Modal.Header>

                <Modal.Content>
                    <EditForm
                        onSubmit={this.onSubmit}
                        errors={errors || {}}
                        initialValues={user}
                        {...modalContentProps}
                    />
                </Modal.Content>

                <Modal.Actions>
                    <Button color='black' onClick={this.closeModal}>
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

const connectedEditUser = connect(
    store => ({
        errors: store.errors[`${constants.EDIT_USER_SAGA}_FRONTEND`],
        user  : store.users.selected.value,
    }),
    dispatch => (
        {
            editUser: (id) => dispatch(editUserSaga(id)),
            dispatch
        }
    ))(EditUser);

export default connectedEditUser;