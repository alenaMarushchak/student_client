import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';
import {push} from 'react-router-redux';
import {Header} from 'semantic-ui-react'

import UsersListView from '../../components/User/list';
import Toolbar from '../../components/User/list/toolbar';
import Pagination from '../../components/Pagination'
import actions from '../../actions';
import constants from '../../constants';

const {
    loadUsersListSaga,
    showModal,
    deleteUserItemSaga
} = actions;

class UsersList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            page,
            filters
        } = this.props;

        this.props.getUsersList(page === 0 ? 1 : page, filters);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.toolbarVals || {}).search !== (this.props.toolbarVals || {}).search) {
            this.search();
        }
    }

    search = () => {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.props.getUsersList(1);
        }, 500);
    };

    onPageChange = (page) => {
        const {filters} = this.props;
        this.props.getUsersList(page.selected + 1, filters)
    };

    deleteUserItem = (id) => {
        this.props.deleteUserItem(id);
    };

    navigateTo = (id) => {
        this.props.dispatch(push(`/users/${id}`));
    };

    showCreate = () => {
        this.props.showCreateUserModal();
    };

    render() {

        const {
            page = 1,
            totalPages,
            getUsersList,
            users,
        } = this.props;

        return (<React.Fragment>

                <Header as='h3' onClick={this.showCreate} style={{cursor: 'pointer'}}>Create user +</Header>

                <Toolbar
                    loadUsersList={getUsersList}
                />
                <UsersListView
                    values={users}
                    navigateTo={this.navigateTo}
                    deleteUser={this.deleteUserItem}
                />
                <Pagination
                    value={page}
                    totalPages={totalPages}
                    onChange={this.onPageChange}
                />

            </React.Fragment>
        );
    }
}

const connectedUsersList = connect(
    store => ({
        users      : store.users.list.values,
        page       : store.users.list.page,
        totalPages : store.users.list.totalPages,
        filters    : store.users.list.filters,
        toolbarVals: getFormValues('usersToolbar')(store)
    }),
    dispatch => (
        {
            getUsersList       : (page, filters) => dispatch(loadUsersListSaga(page, filters)),
            deleteUserItem     : (id) => dispatch(deleteUserItemSaga(id)),
            showCreateUserModal: () => dispatch(showModal(constants.modal.type.CREATE_USER)),
            dispatch
        }
    ))(UsersList);

export default connectedUsersList;