import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions';
import constants from "../../../constants";
import CreateForm from '../../../components/Admin/StudentsGroup/createGroup';

import {Button, Header, Modal} from 'semantic-ui-react'
import MultiSelectComponent from "../../CustomElements/MultiSelect";
import {MULTI_SELECT_TYPES} from "../../../constants/custom";

const {
    createGroupSaga
} = actions;


class CreateGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subjects: []
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const subjects = this.state.subjects;

        this.props.createGroup(subjects);
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

                    <Header as='h3' content={'Subjects'}/>
                    <MultiSelectComponent
                        typeOfApi={MULTI_SELECT_TYPES.SUBJECT}
                        selectedOptions={this.state.subjects}
                        addItem={this.handelAddItem}
                        deleteItem={this.handelDeleteItem}
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
            createGroup: (subjects) => dispatch(createGroupSaga(subjects)),
            dispatch
        }
    ))(CreateGroup);

export default connectedCreateGroup;




