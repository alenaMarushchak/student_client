import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions/index';
import constants from "../../../constants/index";

import StudentsTable from '../../../components/Student/StudentsGroup'

import {Header,Container, Segment} from 'semantic-ui-react'

const {
    loadGroupSaga,
    cleanData
} = actions;


class GroupProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadGroup();
    }

    componentWillUnmount() {
        this.props.clean();
    }

    render() {
        const {
            group: {
                name,
                students,
            } = {}
        } = this.props;

        let content = name ? <React.Fragment>
                <Container style={{marginBottom: '50px'}}>
                    <Header as={'h2'} content={'My group'}/>
                    <Segment>
                        <Header as='h5' attached='top'>
                            Name
                        </Header>

                        <Segment attached color='teal'>{name}</Segment>
                    </Segment>
                    <Segment>
                        {students ? <StudentsTable
                            students={students}
                        /> : null}
                    </Segment>
                </Container>
            </React.Fragment> :

            <Header as={'h2'} content={'Not found group...'}/>;

        return (<React.Fragment>

                {content}

            </React.Fragment>
        );
    }
}

const connectedGroupProfile = connect(
    store => ({
        group: store.groups.selected.value,
    }),
    dispatch => (
        {
            loadGroup         : () => dispatch(loadGroupSaga()),
            clean             : () => dispatch(cleanData(constants.LOAD_GROUP)),
            dispatch
        }
    ))(GroupProfile);

export default connectedGroupProfile;