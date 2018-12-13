import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Header, Table} from 'semantic-ui-react'

import StudentItemAllPoints from '../../../components/Teacher/StudentItemAllPoints'

import actions from '../../../actions';
import constants from '../../../constants';

const {
    loadStudentPointsSaga,
    cleanData
} = actions;

class Home extends Component {
    constructor(props) {
        super(props);

        this.keyCount = 0;
    }

    componentDidMount() {
        this.props.loadStudentPoints();
    }

    componentWillUnmount() {
        this.props.clean();
    }

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

        </React.Fragment>)
    }
}

const connectedHome = connect(
    store => ({
        subjects: store.student.values,
    }),
    dispatch => (
        {
            loadStudentPoints: (studentId) => dispatch(loadStudentPointsSaga({studentId: studentId})),
            clean            : () => dispatch(cleanData(constants.LOAD_STUDENT_POINTS)),
            dispatch
        }
    ))(Home);

export default connectedHome;