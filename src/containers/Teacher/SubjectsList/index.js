import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';

import SubjectsListView from '../../../components/Teacher/SubjectsList';
import Toolbar from '../../../components/Teacher/SubjectsList/toolbar';
import Pagination from '../../../components/CustomElements/Pagination'
import actions from '../../../actions';
import constants from "../../../constants";

const {
    loadSubjectsListSaga,
    addTeacherToSubjectSaga,
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

        this.props.getSubjectsList(page === 0 ? 1 : page, filters);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.toolbarVals || {}).search !== (this.props.toolbarVals || {}).search) {
            this.search();
        }
    }

    search = () => {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.props.getSubjectsList(1);
        }, 500);
    };

    onPageChange = (page) => {
        const {filters} = this.props;
        this.props.getSubjectsList(page.selected + 1, filters)
    };

    addSubjectItem = (subject) => {
        this.props.addSubjectItem(subject);
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
                        loadUsersList={getSubjectsList}
                    />
                    <SubjectsListView
                        values={subjects}
                        addSubject={this.addSubjectItem}
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
        subjects   : store.subjects.list.values,
        page       : store.subjects.list.page,
        totalPages : store.subjects.list.totalPages,
        filters    : store.subjects.list.filters,
        toolbarVals: getFormValues('subjectsAllToolbar')(store)
    }),
    dispatch => (
        {
            getSubjectsList: (page, filters) => dispatch(loadSubjectsListSaga(page, filters)),
            addSubjectItem : (subject) => dispatch(addTeacherToSubjectSaga(subject)),
            clean          : () => dispatch(cleanData(constants.LOAD_SUBJECTS_LIST)),
            dispatch
        }
    ))(SubjectsList);

export default connectedSubjectsList;