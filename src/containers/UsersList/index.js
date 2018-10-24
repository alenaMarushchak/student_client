import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';
import {Route} from 'react-router-dom';
import {push} from 'react-router-redux';

import UsersListView from '../../components/User/list';
import Toolbar from '../../components/User/list/toolbar';
import Pagination from '../../components/Pagination'
import actions from '../../actions';
import constants from '../../constants';

const {
    loadUsersListSaga,
    showModal
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

    navigateTo = (path) => {
        this.props.dispatch(push(path))
    };

    showEdit = (props) => {
        if (props.match.params.id) {
            this.props.showEditUserModal(props.match.params.id);
        }
        return null;
    };

    showCreate = () => {
        this.props.showCreateUserModal();
    };

    render() {

        const {
            page = 1,
            totalPages,
            getUsersList,
            users
        } = this.props;

        return (<div>
                <div>
                    <span onClick={this.showCreate}>Create user +</span>
                </div>
                <div>
                    <Toolbar
                        loadUsersList={getUsersList}
                    />
                    <React.Fragment>
                        <UsersListView
                            values={users}
                            navigateTo={this.navigateTo}
                        />
                        <Pagination
                            value={page}
                            totalPages={totalPages}
                            onChange={this.onPageChange}
                        />

                        <Route path="/users/:id" component={this.showEdit}/>
                    </React.Fragment>
                </div>
            </div>
        );
    }
}

const connectedUsersList = connect(
    store => ({
        errors     : store.errors[`${constants.CREATE_USER_SAGA}_FRONTEND`],
        users      : store.users.list.values,
        isLoading  : store.users.isLoading,
        page       : store.users.list.page,
        totalPages : store.users.list.totalPages,
        filters    : store.users.list.filters,
        toolbarVals: getFormValues('usersToolbar')(store)
    }),
    dispatch => (
        {
            getUsersList       : (page, filters) => dispatch(loadUsersListSaga(page, filters)),
            showEditUserModal  : (id) => dispatch(showModal(constants.modal.type.EDIT_USER, {id})),
            showCreateUserModal: () => dispatch(showModal(constants.modal.type.CREATE_USER)),
            dispatch
        }
    ))(UsersList);

export default connectedUsersList;