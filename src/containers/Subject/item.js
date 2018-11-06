import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../actions';
import constants from "../../constants";
import {push} from "react-router-redux";

import {Header, Button, Container, Image, Segment} from 'semantic-ui-react'

const {
    loadSubjectSaga,
    showModal,
    cleanData
} = actions;


class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadSubject(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clean();
    }

    showEditModal = () => {
        let id = this.props.subject._id;
        this.props.showEditSubjectModal(id);
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


        return (<React.Fragment>
                <Container>

                    <Header as={'h2'} content={'User Information'}/>


                    <Segment>
                        <Image src='/img/logo.jpg' size='small' circular/>
                    </Segment>

                    <Segment>
                        <Header as='h5' attached='top'>
                            Name
                        </Header>

                        <Segment attached color='teal'>{name}</Segment>


                    </Segment>


                </Container>

                <Button content='Edit' primary onClick={this.showEditModal}/>
                <Button content='Go back' secondary onClick={this.goBack}/>

            </React.Fragment>
        );
    }
}

const connectedUserProfile = connect(
    store => ({
        subject: store.subjects.selected.value,
    }),
    dispatch => (
        {
            loadSubject         : (id) => dispatch(loadSubjectSaga(id)),
            showEditSubjectModal: (id) => dispatch(showModal(constants.modal.type.EDIT_SUBJECT, {id})),
            clean               : () => dispatch(cleanData(constants.LOAD_SUBJECT)),
            dispatch
        }
    ))(UserProfile);

export default connectedUserProfile;