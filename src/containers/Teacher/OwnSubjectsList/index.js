import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {getFormValues} from "redux-form";
import actions from '../../../actions'

import OwnSubjectsComponent from '../../../components/Teacher/OwnSubjets';
import Toolbar from "../../../components/Teacher/OwnSubjets/toolbar";
import Pagination from "../../../components/CustomElements/Pagination";
import {push} from "react-router-redux";
import constants from "../../../constants";

const {
    loadOwnTeacherSubjectsListSaga,
    removeTeacherFromSubjectSaga,
    cleanData
} = actions;

class OwnSubjects extends Component {

    componentDidMount() {
        const {
            page,
            filters
        } = this.props;

        this.props.getSubjectsList(page === 0 ? 1 : page, filters);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.toolbarVals || {}).search !== (this.props.toolbarVals || {}).search) {
            this.search();
        }
    }

    componentWillUnmount() {
        this.props.clean();
    }

    navigateTo = (subjectId) => {
        this.props.dispatch(push(`/subjects/${subjectId}/groups`));
    };

    search = () => {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.props.getSubjectsList(1);
        }, 500);
    };

    deleteSubjectItem = (id) => {
        this.props.deleteSubjectItem(id);
    };

    onPageChange = (page) => {
        const {filters} = this.props;
        this.props.getSubjectsList(page.selected + 1, filters)
    };

    render() {

        const {
            page = 1,
            totalPages,
            getSubjectsList,
            subjects,
        } = this.props;

        return (<React.Fragment>

                {subjects.length ? <React.Fragment>
                    <Toolbar
                        loadSubjectsList={getSubjectsList}
                    />
                    <OwnSubjectsComponent
                        values={subjects}
                        navigateTo={this.navigateTo}
                        deleteTeacherFromSubject={this.deleteSubjectItem}
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
        subjects   : store.subjects.teachersSubject.list.values,
        page       : store.subjects.teachersSubject.list.page,
        totalPages : store.subjects.teachersSubject.list.totalPages,
        filters    : store.subjects.teachersSubject.list.filters,
        toolbarVals: getFormValues('subjectsOwnToolbar')(store)
    }),
    dispatch => (
        {
            getSubjectsList  : (page, filters) => dispatch(loadOwnTeacherSubjectsListSaga(page, filters)),
            deleteSubjectItem: (id) => dispatch(removeTeacherFromSubjectSaga(id)),
            clean            : () => dispatch(cleanData(constants.LOAD_OWN_TEACHER_SUBJECT)),
            dispatch
        }
    ))(OwnSubjects);

export default connectedSubjectsList;