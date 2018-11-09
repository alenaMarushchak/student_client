import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';
import {push} from 'react-router-redux';
import {Header} from 'semantic-ui-react'

import GroupsListView from '../../../components/Admin/StudentsGroup/list';
import Toolbar from '../../../components/Admin/StudentsGroup/list/toolbar';
import Pagination from '../../../components/Pagination'
import actions from '../../../actions';
import constants from '../../../constants';

const {
    loadGroupsListSaga,
    showModal,
    deleteGroupItemSaga
} = actions;

class GroupsList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            page
        } = this.props;

        this.props.getGroupsList(page === 0 ? 1 : page);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.toolbarVals || {}).search !== (this.props.toolbarVals || {}).search) {
            this.search();
        }
    }

    search = () => {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.props.getGroupsList(1);
        }, 500);
    };

    onPageChange = (page) => {
        const {filters} = this.props;
        this.props.getGroupsList(page.selected + 1, filters)
    };

    deleteGroupItem = (id) => {
        this.props.deleteGroupItem(id);
    };

    navigateTo = (id) => {
        this.props.dispatch(push(`/subjects/${id}`));
    };

    showCreate = () => {
        this.props.showCreateGroupModal();
    };

    render() {

        const {
            page = 1,
            totalPages,
            getGroupsList,
            groups,
        } = this.props;

        return (<React.Fragment>

                <Header as='h3' onClick={this.showCreate} style={{cursor: 'pointer'}}>Create group +</Header>

                {groups.length ? <React.Fragment>
                    <Toolbar
                        loadUsersList={getGroupsList}
                    />
                    <GroupsListView
                        values={groups}
                        navigateTo={this.navigateTo}
                        deleteGroup={this.deleteGroupItem}
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

const connectedGroupsList = connect(
    store => ({
        groups     : store.groups.list.values,
        page       : store.groups.list.page,
        totalPages : store.groups.list.totalPages,
        filters    : store.groups.list.filters,
        toolbarVals: getFormValues('groupsToolbar')(store)
    }),
    dispatch => (
        {
            getGroupsList       : (page) => dispatch(loadGroupsListSaga(page)),
            deleteGroupItem     : (id) => dispatch(deleteGroupItemSaga(id)),
            showCreateGroupModal: () => dispatch(showModal(constants.modal.type.CREATE_GROUP)),
            dispatch
        }
    ))(GroupsList);

export default connectedGroupsList;