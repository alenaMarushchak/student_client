import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions/index';
import constants from "../../../constants/index";
import EditForm from '../../../components/Admin/Subject/editSubject';
import {push} from "react-router-redux";
import {Button, Modal} from "semantic-ui-react";

const {
    editSubjectSaga,
} = actions;

class EditSubject extends Component {

    onSubmit = (e) => {
        e.preventDefault();

        this.props.editSubject(this.props.modalContentProps.id);
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


        return ( <React.Fragment>

                <Modal.Header>Edit subject</Modal.Header>

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

const connectedEditSubject = connect(
    store => ({
        errors: store.errors[`${constants.EDIT_SUBJECT_SAGA}_FRONTEND`],
        subject  : store.subjects.selected.value,
    }),
    dispatch => (
        {
            editSubject: (id) => dispatch(editSubjectSaga(id)),
            dispatch
        }
    ))(EditSubject);

export default connectedEditSubject;