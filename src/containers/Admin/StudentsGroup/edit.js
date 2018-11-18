import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import {Button, Modal, Header} from "semantic-ui-react";

import actions from '../../../actions/index';

import MultiSelectComponent from '../../CustomElements/MultiSelect'

import EditForm from '../../../components/Admin/StudentsGroup/editGroup';

import constants from "../../../constants/index";

import {MULTI_SELECT_TYPES} from '../../../constants/custom'

const {
    editGroupSaga,
} = actions;

class EditGroup extends Component {

    constructor(props) {
        super(props);

        const {subjects} = this.props.group;

        this.state = {
            subjects
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const subjects = this.state.subjects;

        this.props.editGroup(this.props.modalContentProps.id, subjects);
        this.props.dispatch(push('/groups'));
    };

    closeModal = () => {
        const {closeModal} = this.props;

        closeModal();
    };

    handelAddItem = (option) => {
        const selected = this.state.subjects;

        selected.push(option);

        this.setState({
            subjects: [].concat(selected),
        });
    };

    handelDeleteItem = (option) => {
        const selected = this.state.subjects;

        const index = selected.findIndex(item => item._id === option._id);

        selected.splice(index, 1);

        this.setState({subjects: [].concat(selected)});
    };

    render() {
        const {
            errors = {},
            group = {},
            modalContentProps
        } = this.props;


        return (<React.Fragment>

                <Modal.Header>Edit group</Modal.Header>

                <Modal.Content>
                    <EditForm
                        onSubmit={this.onSubmit}
                        errors={errors || {}}
                        initialValues={group}
                        {...modalContentProps}
                    />

                    <Header as='h3' content={'Subjects'}/>
                    <MultiSelectComponent
                        typeOfApi={MULTI_SELECT_TYPES.SUBJECT}
                        selectedOptions={this.state.subjects}
                        addItem={this.handelAddItem}
                        deleteItem={this.handelDeleteItem}
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
        group : store.groups.selected.value,
    }),
    dispatch => (
        {
            editGroup: (id, subjects) => dispatch(editGroupSaga(id, subjects)),
            dispatch
        }
    ))(EditGroup);

export default connectedEditGroup;