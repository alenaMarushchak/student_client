import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions/index';
import constants from "../../../constants/index";
import {push} from "react-router-redux";

import {Header, Button, Container, Image, Icon, Label, Segment} from 'semantic-ui-react'

const {
    loadUserSaga,
    showModal,
    cleanData
} = actions;


class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadUser(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clean();
    }

    showEditModal = () => {
        let id = this.props.user._id;
        this.props.showEditUserModal(id);
    };

    goBack = () => {
        this.props.dispatch(push(`/users`));
    };

    render() {
        const {
            user: {
                firstName,
                lastName,
                email,
                role,
                _id
            } = {}
        } = this.props;

        let content = _id ? <React.Fragment>
                <Container>

                    <Header as={'h2'} content={'User Information'}/>

                    <Segment.Group horizontal>

                        <Segment>
                            <Image src='/img/logo.jpg' size='small' circular/>
                        </Segment>

                        <Segment>
                            <Header as='h5' attached='top'>
                                First name
                            </Header>

                            <Segment attached color='teal'>{firstName}</Segment>

                            <Header as='h5' attached='top'>
                                Last name
                            </Header>

                            <Segment attached color='teal'>{lastName}</Segment>
                        </Segment>

                    </Segment.Group>

                    <Header as='h5' attached='top'>
                        Role
                    </Header>

                    <Segment attached color='teal'>{role === 5 ? 'Teacher' : 'Student'}</Segment>

                    <Header as='h5' attached='top'>
                        Email
                    </Header>

                    <Segment attached color='teal'>
                        <Label>
                            <Icon name='mail'/> {email}
                        </Label>
                    </Segment>

                </Container>
                <Button content='Edit' primary onClick={this.showEditModal}/>
            </React.Fragment> :
            <Header as={'h2'} content={'Not found user...'}/>;

        return (<React.Fragment>

                {content}

                <Button content='Go back' secondary onClick={this.goBack}/>

            </React.Fragment>
        );
    }
}

const connectedUserProfile = connect(
    store => ({
        user: store.users.selected.value,
    }),
    dispatch => (
        {
            loadUser         : (id) => dispatch(loadUserSaga(id)),
            showEditUserModal: (id) => dispatch(showModal(constants.modal.type.EDIT_USER, {id})),
            clean            : () => dispatch(cleanData(constants.LOAD_USER)),
            dispatch
        }
    ))(UserProfile);

export default connectedUserProfile;