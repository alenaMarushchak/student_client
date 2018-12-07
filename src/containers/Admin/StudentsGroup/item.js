import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions/index';
import constants from "../../../constants/index";
import {push} from "react-router-redux";

import StudentsTable from '../../../components/Admin/StudentsGroup/studentsTable'
import SubjectsTable from '../../../components/Admin/StudentsGroup/subjectsTable'

import {Header, Button, Container, Segment, Tab} from 'semantic-ui-react'

const {
    loadGroupSaga,
    showModal,
    cleanData
} = actions;


class GroupProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadGroup(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clean();
    }

    showEditModal = () => {
        let id = this.props.group._id;
        this.props.showEditGroupModal(id);
    };

    goBack = () => {
        this.props.dispatch(push(`/groups`));
    };


    render() {
        const {
            group: {
                name,
                students,
                subjects
            } = {}
        } = this.props;


        let panes = [
            {
                menuItem: 'Students', render: () => students.length ? <StudentsTable
                    students={students}
                /> : <span>No data..</span>
            },
            {
                menuItem: 'Subjects', render: () => subjects.length ?
                    <SubjectsTable subjects={subjects}/> :
                    <span>No data...</span>
            },
        ];

        let content = name ? <React.Fragment>
                <Container style={{marginBottom: '50px'}}>
                    <Header as={'h2'} content={'Group Information'}/>
                    <Segment>
                        <Header as='h5' attached='top'>
                            Name
                        </Header>

                        <Segment attached color='teal'>{name}</Segment>
                    </Segment>
                    <Segment>
                        {students && subjects ? <Tab panes={panes}/> : null}
                    </Segment>
                </Container>
                <Button content='Edit' primary onClick={this.showEditModal}/>
            </React.Fragment> :

            <Header as={'h2'} content={'Not found group...'}/>;

        return (<React.Fragment>

                {content}

                <Button content='Go back' secondary onClick={this.goBack}/>

            </React.Fragment>
        );
    }
}

const connectedGroupProfile = connect(
    store => ({
        group: store.groups.selected.value,
    }),
    dispatch => (
        {
            loadGroup         : (id) => dispatch(loadGroupSaga(id)),
            showEditGroupModal: (id) => dispatch(showModal(constants.modal.type.EDIT_GROUP, {id})),
            clean             : () => dispatch(cleanData(constants.LOAD_GROUP)),
            dispatch
        }
    ))(GroupProfile);

export default connectedGroupProfile;