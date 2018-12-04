import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Header, Button} from 'semantic-ui-react'

import StudentsGroupDetail from '../../../components/Teacher/StudentsGroup/stundetsGroupDetail'

import actions from '../../../actions';
import constants from '../../../constants';

const {
    loadGroupSaga,
    cleanData
} = actions;

class GroupsList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            match: {
                params: {
                    id
                }
            }
        } = this.props;

        this.props.getGroup(id);
    }

    componentWillUnmount() {
        this.props.clean();
    }

    goBack = () => {
        this.props.dispatch(push(`/groups`));
    };

    navigateTo = (studentId) => {
        const {
            match: {
                params: {
                    id
                }
            }
        } = this.props;

        this.props.dispatch(push(`/groups/${id}/student/${studentId}`));
    };

    render() {
        const {
            group
        } = this.props;

        return (<React.Fragment>

                <StudentsGroupDetail
                    students={group.students}
                    navigateTo={this.navigateTo}
                />

                <Button onClick={this.goBack} content={'Go back'}/>
            </React.Fragment>
        );
    }
}

const connectedGroupsList = connect(
    store => ({
        group: store.groups.selected.value,
    }),
    dispatch => (
        {
            getGroup: (id) => dispatch(loadGroupSaga(id)),
            clean   : () => dispatch(cleanData(constants.LOAD_GROUP)),
            dispatch
        }
    ))(GroupsList);

export default connectedGroupsList;