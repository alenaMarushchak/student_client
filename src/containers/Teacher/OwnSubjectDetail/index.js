import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions/index';
import constants from "../../../constants/index";
import {push} from "react-router-redux";

import {Button, Header} from 'semantic-ui-react'
import Toolbar from "../../../components/Teacher/OwnSubjectDetail/toolbar";
import OwnSubjectDetail from "../../../components/Teacher/OwnSubjectDetail";
import Pagination from "../../../components/CustomElements/Pagination";

const {
    loadGroupsBySubjectSaga,
    cleanData
} = actions;


class GroupProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadGroupsBySubject(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clean();
    }

    goBack = () => {
        this.props.dispatch(push(`/`));
    };

    onPageChange = (page) => {
        const {filters} = this.props;
        this.props.loadGroupsBySubject(page.selected + 1, filters)
    };

    navigateTo = () => {

    };

    render() {
        const {
            groups,
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

                {content}

                <Button content='Go back' secondary onClick={this.goBack}/>

            </React.Fragment>
        );
    }
}

const connectedGroupProfile = connect(
    store => ({
        groups: store.subjects.selected,
    }),
    dispatch => (
        {
            loadGroupsBySubject         : (id) => dispatch(loadGroupsBySubjectSaga(id)),
            clean             : () => dispatch(cleanData(constants.LOAD_GROUPS_BY_SUBJECT)),
            dispatch
        }
    ))(GroupProfile);

export default connectedGroupProfile;