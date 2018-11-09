import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions';
import constants from "../../../constants";
import CreateForm from '../../../components/Admin/StudentsGroup/createGroup';

import {Button, Modal} from 'semantic-ui-react'

const {
    createGroupSaga
} = actions;


class CreateGroup extends Component {

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createGroup();
    };

    render() {
        const {
            closeModal,
            errors,
            modalContentProps
        } = this.props;

        return (
            <React.Fragment>

                <Modal.Header>Create group</Modal.Header>
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

const connectedCreateGroup = connect(
    store => ({
        errors: store.errors[`${constants.CREATE_GROUP_SAGA}_FRONTEND`],
    }),
    dispatch => (
        {
            createGroup: () => dispatch(createGroupSaga()),
            dispatch
        }
    ))(CreateGroup);

export default connectedCreateGroup;




