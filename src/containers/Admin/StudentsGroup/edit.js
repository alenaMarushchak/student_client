import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions/index';
import constants from "../../../constants/index";
import EditForm from '../../../components/Admin/StudentsGroup/editGroup';
import {push} from "react-router-redux";
import {Button, Modal} from "semantic-ui-react";

const {
    editGroupSaga,
} = actions;

class EditGroup extends Component {

    onSubmit = (e) => {
        e.preventDefault();

        this.props.editGroup(this.props.modalContentProps.id);
        this.props.dispatch(push('/subjects'));
    };

    closeModal = () => {
        const {closeModal} = this.props;

        closeModal();
    };

    render() {
        const {
            errors = {},
            subject = {},
            modalContentProps
        } = this.props;

//TODO change soon...
        return ( <React.Fragment>

                <Modal.Header>Edit group</Modal.Header>

                <Modal.Content>
                    <EditForm
                        onSubmit={this.onSubmit}
                        errors={errors || {}}
                        initialValues={subject}
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

const connectedEditGroup = connect(
    store => ({
        errors: store.errors[`${constants.EDIT_GROUP_SAGA}_FRONTEND`],
        subject  : store.subjects.selected.value,
    }),
    dispatch => (
        {
            editGroup: (id) => dispatch(editGroupSaga(id)),
            dispatch
        }
    ))(EditGroup);

export default connectedEditGroup;