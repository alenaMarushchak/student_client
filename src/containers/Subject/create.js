import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../actions';
import constants from "../../constants";
import CreateForm from '../../components/Subject/createSubject';

import {Button, Modal} from 'semantic-ui-react'

const {
    createSubjectSaga
} = actions;


class CreateSubject extends Component {

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createSubject();
    };

    render() {
        const {
            closeModal,
            errors,
            modalContentProps
        } = this.props;

        return (
            <React.Fragment>

                <Modal.Header>Create subject</Modal.Header>
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

const connectedCreateSubject = connect(
    store => ({
        errors: store.errors[`${constants.CREATE_SUBJECT_SAGA}_FRONTEND`],
    }),
    dispatch => (
        {
            createSubject: () => dispatch(createSubjectSaga()),
            dispatch
        }
    ))(CreateSubject);

export default connectedCreateSubject;




