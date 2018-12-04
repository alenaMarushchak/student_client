import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';

import StudentsListView from '../../../components/Teacher/StudentsList';
import Toolbar from '../../../components/Teacher/StudentsList/toolbar';
import Pagination from '../../../components/CustomElements/Pagination'
import actions from '../../../actions';
import constants from "../../../constants";
import {push} from "react-router-redux";

const {
    loadStudentsListSaga,
    cleanData
} = actions;

class SubjectsList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            page,
            filters
        } = this.props;

        this.props.getStudentsList(page === 0 ? 1 : page, filters);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.toolbarVals || {}).search !== (this.props.toolbarVals || {}).search) {
            this.search();
        }
    }

    componentWillUnmount() {
        this.props.clean();
    }

    search = () => {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.props.getStudentsList(1);
        }, 500);
    };

    onPageChange = (page) => {
        const {filters} = this.props;
        this.props.getStudentsList(page.selected + 1, filters)
    };

    navigateTo = (id) => {
        this.props.dispatch(push(`/students/${id}`));
    };

    render() {

        const {
            page = 1,
            totalPages,
            getStudentsList,
            students,
        } = this.props;

        return (<React.Fragment>
                {students && students.length ? <React.Fragment>
                    <Toolbar
                        loadStudentsList={getStudentsList}
                    />
                    <StudentsListView
                        values={students}
                        navigateTo={this.navigateTo}
                    />
                    <Pagination
                        value={page}
                        totalPages={totalPages}
                        onChange={this.onPageChange}
                    />
                </React.Fragment> : <p>No data..</p>}

            </React.Fragment>
        );
    }
}

const connectedSubjectsList = connect(
    store => ({
        students   : store.student.list.values,
        page       : store.student.list.page,
        totalPages : store.student.list.totalPages,
        filters    : store.student.list.filters,
        toolbarVals: getFormValues('studentsToolbar')(store)
    }),
    dispatch => (
        {
            getStudentsList: (page, filters) => dispatch(loadStudentsListSaga(page, filters)),
            clean          : () => dispatch(cleanData(constants.LOAD_STUDENTS_LIST)),
            dispatch
        }
    ))(SubjectsList);

export default connectedSubjectsList;