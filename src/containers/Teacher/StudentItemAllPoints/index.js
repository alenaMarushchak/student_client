import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Header, Button, Table} from 'semantic-ui-react'

import StudentItemAllPoints from '../../../components/Teacher/StudentItemAllPoints'

import actions from '../../../actions';
import constants from '../../../constants';

const {
    loadStudentPointsSaga,
    cleanData
} = actions;

class StudentItemAllPointsContainer extends Component {
    constructor(props) {
        super(props);

        this.keyCount = 0;
    }

    componentDidMount() {
        const {match: {params: {id, studentId}}} = this.props;

        if(studentId){
            this.props.loadStudentPoints(studentId);
        } else {
            this.props.loadStudentPoints(id);
        }
    }

    componentWillUnmount() {
        this.props.clean();
    }

    goBack = () => {
        const {match: {params: {id, studentId}}} = this.props;

        if(studentId){
            this.props.dispatch(push(`/groups/${id}`));
        } else {
            this.props.dispatch(push(`/students`));
        }
    };

    getKey = () => {
        return this.keyCount++;
    };

    content = () => {
        const {subjects} = this.props;

       return (<Table basic='very' celled collapsing>

            <Table.Header>
                <Table.Row>

                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Module 1</Table.HeaderCell>
                    <Table.HeaderCell>Module 2</Table.HeaderCell>
                    <Table.HeaderCell>Exam</Table.HeaderCell>

                </Table.Row>
            </Table.Header>

            <Table.Body>
                {subjects.map(subject => <StudentItemAllPoints key={this.getKey}
                                                               subject={subject}/>)}
            </Table.Body>

        </Table>)
    };

    render() {
        const {subjects} = this.props;

        return (<React.Fragment>

            {subjects && subjects.length ? this.content() : <Header content={'Not found points'}/>}

            <Button content='Go back' secondary onClick={this.goBack}/>
        </React.Fragment>)
    }
}

const connectedStudentItemAllPointsContainer = connect(
    store => ({
        subjects: store.student.values,
    }),
    dispatch => (
        {
            loadStudentPoints : (id) => dispatch(loadStudentPointsSaga({studentId: id})),
            clean              : () => dispatch(cleanData(constants.LOAD_STUDENT_POINTS)),
            dispatch
        }
    ))(StudentItemAllPointsContainer);

export default connectedStudentItemAllPointsContainer;