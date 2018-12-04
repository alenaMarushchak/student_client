import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Header, Button} from 'semantic-ui-react'

import StundentItemAllPoints from '../../../components/Teacher/StudentItemAllPoints'

import actions from '../../../actions';
import constants from '../../../constants';
import {getFormValues} from "redux-form";

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

    }

    getKey = () => {
        return this.keyCount++;
    }


}

const connectedGroupProfile = connect(
    store => ({
        subjects: store.student.values,
    }),
    dispatch => (
        {
            loadGroupsBySubject: (id) => dispatch(loadStudentPointsSaga({studentId: id})),
            clean              : () => dispatch(cleanData(constants.LOAD_STUDENT_POINTS)),
            dispatch
        }
    ))(GroupProfile);

export default connectedGroupProfile;