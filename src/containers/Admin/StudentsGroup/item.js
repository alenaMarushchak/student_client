import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions/index';
import constants from "../../../constants/index";
import {push} from "react-router-redux";

import {Header, Button, Container, Image, Segment} from 'semantic-ui-react'

const {
    loadGroupSaga,
    showModal,
    cleanData
} = actions;


class GroupProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadGroup(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clean();
    }

    showEditModal = () => {
        let id = this.props.subject._id;
        this.props.showEditGroupModal(id);
    };

    goBack = () => {
        this.props.dispatch(push(`/subjects`));
    };

    render() {
        const {
            subject: {
                name
            } = {}
        } = this.props;

        let content = name ? <React.Fragment>
                <Container>
                    <Header as={'h2'} content={'Group Information'}/>

                    <Segment>
                        <Header as='h5' attached='top'>
                            Name
                        </Header>

                        <Segment attached color='teal'>{name}</Segment>


                    </Segment>
                </Container>
                <Button content='Edit' primary onClick={this.showEditModal}/>
            </React.Fragment> :
            <Header as={'h2'} content={'Not found subject...'}/>;

        return (<React.Fragment>

                {content}

                <Button content='Go back' secondary onClick={this.goBack}/>

            </React.Fragment>
        );
    }
}

const connectedGroupProfile = connect(
    store => ({
        subject: store.subjects.selected.value,
    }),
    dispatch => (
        {
            loadGroup         : (id) => dispatch(loadGroupSaga(id)),
            showEditGroupModal: (id) => dispatch(showModal(constants.modal.type.EDIT_GROUP, {id})),
            clean             : () => dispatch(cleanData(constants.LOAD_SUBJECT)),
            dispatch
        }
    ))(GroupProfile);

export default connectedGroupProfile;