import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../actions';
import constants from "../../constants";
import {push} from "react-router-redux";

import {Header, Button, Container, Image, Icon, Label, Form} from 'semantic-ui-react'

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
                role
            } = {}
        } = this.props;


        return (<React.Fragment>
                <Container>

                    <Header as={'h2'} content={'User Information'}/>

                    <Image src='/img/logo.jpg' size='small' circular/>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='First name' readOnly value={firstName}/>
                            <Form.Input fluid label='Last name' readOnly value={lastName}/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Role' readOnly value={role === 5 ? 'Teacher' : 'Student'}/>
                        </Form.Group>
                    </Form>

                    <Label>
                        <Icon name='mail'/> {email}
                    </Label>

                </Container>

                <Button content='Edit' primary onClick={this.showEditModal}/>
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