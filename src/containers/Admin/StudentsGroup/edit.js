import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import {Button, Modal, Header, Tab, Segment, Container} from "semantic-ui-react";
import {SELECT_TOOLBAR_NAMES} from '../../../constants/custom'

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

        const {subjects, students} = this.props.group;

        this.state = {
            subjects,
            students
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const subjects = this.state.subjects;
        const students = this.state.students;

        this.props.editGroup(this.props.modalContentProps.id, subjects, students);
        this.props.dispatch(push('/groups'));
    };

    closeModal = () => {
        const {closeModal} = this.props;

        closeModal();
    };

    handelAddSubject = (option) => {
        const selected = this.state.subjects;

        selected.push(option);

        this.setState({
            subjects: [].concat(selected),
        });
    };

    handelDeleteSubject = (option) => {
        const selected = this.state.subjects;

        const index = selected.findIndex(item => item._id === option._id);

        selected.splice(index, 1);

        this.setState({subjects: [].concat(selected)});
    };

    handelAddStudent = (option) => {
        const selected = this.state.students;

        selected.push(option);

        this.setState({
            students: [].concat(selected),
        });
    };

    handelDeleteStudent = (option) => {
        const selected = this.state.students;

        const index = selected.findIndex(item => item._id === option._id);

        selected.splice(index, 1);

        this.setState({students: [].concat(selected)});
    };

    render() {
        const {
            errors = {},
            group = {
                name: ''
            },
            modalContentProps
        } = this.props;

        let panes = [
            {
                menuItem: 'Subjects', render: () => <React.Fragment>
                    <Header as='h3' content={'Subjects'}/>
                    <MultiSelectComponent
                        typeOfApi={MULTI_SELECT_TYPES.SUBJECT}
                        selectedOptions={this.state.subjects}
                        addItem={this.handelAddSubject}
                        deleteItem={this.handelDeleteSubject}
                        toolBarName={SELECT_TOOLBAR_NAMES.SUBJECT}
                    />
                </React.Fragment>
            },
            {
                menuItem: 'Students', render: () => <React.Fragment>
                    <Header as='h3' content={'Students'}/>
                    <MultiSelectComponent
                        typeOfApi={MULTI_SELECT_TYPES.STUDENT}
                        selectedOptions={this.state.students}
                        addItem={this.handelAddStudent}
                        deleteItem={this.handelDeleteStudent}
                        toolBarName={SELECT_TOOLBAR_NAMES.STUDENT}
                    />
                </React.Fragment>
            },
        ];

        return (<React.Fragment>

                <Modal.Header>Edit group</Modal.Header>

                <Modal.Content>
                    <EditForm
                        onSubmit={this.onSubmit}
                        errors={errors || {}}
                        initialValues={group}
                        {...modalContentProps}
                    />
                    <Segment>
                        <Tab panes={panes}/>
                    </Segment>

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
            editGroup: (id, subjects, students) => dispatch(editGroupSaga(id, subjects, students)),
            dispatch
        }
    ))(EditGroup);

export default connectedEditGroup;