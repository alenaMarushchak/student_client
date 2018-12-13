import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions/index';
import constants from "../../../constants/index";
import {push} from "react-router-redux";

import {Button, Header, Segment} from 'semantic-ui-react'
import Toolbar from "../../../components/Teacher/OwnSubjectDetail/toolbar";
import OwnSubjectDetail from "../../../components/Teacher/OwnSubjectDetail";
import Pagination from "../../../components/CustomElements/Pagination";
import {getFormValues} from "redux-form";

const {
    loadGroupsBySubjectSaga,
    cleanData
} = actions;


class GroupProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            page
        } = this.props;

        this.props.loadGroupsBySubject(page === 0 ? 1 : page, this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.toolbarVals || {}).search !== (this.props.toolbarVals || {}).search) {
            this.search();
        }
    }

    search = () => {
        clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
            this.props.loadGroupsBySubject(1, this.props.match.params.id);
        }, 500);
    };

    componentWillUnmount() {
        this.props.clean();
    }

    goBack = () => {
        this.props.dispatch(push(`/`));
    };

    onPageChange = (page) => {
        this.props.loadGroupsBySubject(page.selected + 1, this.props.match.params.id)
    };

    navigateTo = (groupId) => {
        const {match: {params: {id}}} = this.props;

        this.props.dispatch(push(`/subjects/${id}/groups/${groupId}`));
    };

    render() {
        const {
            groups,
            page,
            totalPages,
            loadGroupsBySubject
        } = this.props;


        let content = groups.length ? <React.Fragment>
                <Toolbar
                    loadSubjectsList={loadGroupsBySubject}
                />
                <OwnSubjectDetail
                    values={groups}
                    navigateTo={this.navigateTo}
                />
                <Pagination
                    value={page}
                    totalPages={totalPages}
                    onChange={this.onPageChange}
                />
            </React.Fragment> :
            <Header as={'h2'} content={'No group is listening to this item...'}/>;

        return (<React.Fragment>

                <Segment>
                    {content}
                </Segment>

                <Button content='Go back' secondary onClick={this.goBack}
                        style={{marginTop: '40px'}}
                />

            </React.Fragment>
        );
    }
}

const connectedGroupProfile = connect(
    store => ({
        groups     : store.subjects.selected.list.values,
        page       : store.subjects.selected.list.page,
        totalPages : store.subjects.selected.list.totalPages,
        filters    : store.subjects.selected.list.filters,
        toolbarVals: getFormValues('groupsOfSubjectToolbar')(store)
    }),
    dispatch => (
        {
            loadGroupsBySubject: (page, id) => dispatch(loadGroupsBySubjectSaga(page, id)),
            clean              : () => dispatch(cleanData(constants.LOAD_GROUPS_BY_SUBJECT)),
            dispatch
        }
    ))(GroupProfile);

export default connectedGroupProfile;