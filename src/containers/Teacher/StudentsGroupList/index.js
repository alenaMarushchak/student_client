import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';
import {push} from 'react-router-redux';

import GroupsListView from '../../../components/Teacher/StudentsGroup/list';
import Toolbar from '../../../components/Teacher/StudentsGroup/list/toolbar';
import Pagination from '../../../components/CustomElements/Pagination'
import actions from '../../../actions';
import constants from '../../../constants';

const {
    loadGroupsListSaga,
    cleanData
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

    componentWillUnmount() {
        this.props.clean();
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

    navigateTo = (id) => {
        this.props.dispatch(push(`/groups/${id}`));
    };

    render() {

        const {
            page = 1,
            totalPages,
            getGroupsList,
            groups,
        } = this.props;

        return (<React.Fragment>

                {groups.length ? <React.Fragment>
                    <Toolbar
                        loadUsersList={getGroupsList}
                    />
                    <GroupsListView
                        values={groups}
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
            getGroupsList: (page) => dispatch(loadGroupsListSaga(page)),
            clean        : () => dispatch(cleanData(constants.LOAD_GROUPS_LIST_SAGA)),
            dispatch
        }
    ))(GroupsList);

export default connectedGroupsList;