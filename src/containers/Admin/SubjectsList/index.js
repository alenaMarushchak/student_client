import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';
import {push} from 'react-router-redux';
import {Header} from 'semantic-ui-react'

import SubjectsListView from '../../../components/Admin/Subject/list';
import Toolbar from '../../../components/Admin/Subject/list/toolbar';
import Pagination from '../../../components/Pagination'
import actions from '../../../actions';
import constants from '../../../constants';

const {
    loadSubjectsListSaga,
    showModal,
    deleteSubjectItemSaga
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

    deleteSubjectItem = (id) => {
        this.props.deleteSubjectItem(id);
    };

    navigateTo = (id) => {
        this.props.dispatch(push(`/subjects/${id}`));
    };

    showCreate = () => {
        this.props.showCreateSubjectModal();
    };

    render() {

        const {
            page = 1,
            totalPages,
            getSubjectsList,
            subjects,
        } = this.props;

        return (<React.Fragment>

                <Header as='h3' onClick={this.showCreate} style={{cursor: 'pointer'}}>Create subject +</Header>

                {subjects.length ? <React.Fragment>
                    <Toolbar
                        loadUsersList={getSubjectsList}
                    />
                    <SubjectsListView
                        values={subjects}
                        navigateTo={this.navigateTo}
                        deleteSubject={this.deleteSubjectItem}
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
        toolbarVals: getFormValues('subjectsToolbar')(store)
    }),
    dispatch => (
        {
            getSubjectsList       : (page, filters) => dispatch(loadSubjectsListSaga(page, filters)),
            deleteSubjectItem     : (id) => dispatch(deleteSubjectItemSaga(id)),
            showCreateSubjectModal: () => dispatch(showModal(constants.modal.type.CREATE_SUBJECT)),
            dispatch
        }
    ))(SubjectsList);

export default connectedSubjectsList;