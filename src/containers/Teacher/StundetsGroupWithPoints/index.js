import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions';
import constants from '../../../constants';

import {Button, Header, Table} from 'semantic-ui-react'
import {push} from "react-router-redux";

import StudentLine from './stundentLineItem';

const {
    loadGroupWithStudentsPointsSaga,
    cleanData
} = actions;


class GroupProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {match: {params: {id: subjectId, groupId}}} = this.props;

        this.props.loadStudentsPoints(subjectId, groupId);
    }

    componentWillUnmount() {
        this.props.clean();
    }

    goBack = () => {
        const {match: {params: {id}}} = this.props;

        this.props.dispatch(push(`/subjects/${id}/groups`));
    };


    render() {
        const {
            match: {params: {id: subjectId}},
            students
        } = this.props;


        let content = students.length ? <React.Fragment>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Module 1</Table.HeaderCell>
                            <Table.HeaderCell>Module 2</Table.HeaderCell>
                            <Table.HeaderCell>Average</Table.HeaderCell>
                            <Table.HeaderCell>Exam</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {students.map((item, index) => <StudentLine key={item._id}
                                                                    number={index + 1}
                                                                    student={item}
                                                                    subjectId={subjectId}/>)}
                    </Table.Body>
                </Table>
            </React.Fragment> :

            <Header as={'h2'} content={'Students list is empty'}/>;

        return (<React.Fragment>

                {content}

                <Button content='Go back' secondary onClick={this.goBack}/>

            </React.Fragment>
        );
    }
}

const connectedGroupProfile = connect(
    store => ({
        students: store.groups.students.values,
    }),
    dispatch => (
        {
            loadStudentsPoints: (subjectId, groupId) => dispatch(loadGroupWithStudentsPointsSaga(subjectId, groupId)),
            clean             : () => dispatch(cleanData(constants.LOAD_GROUP_WITH_POINTS_SAGA)),
            dispatch
        }
    ))(GroupProfile);

export default connectedGroupProfile;