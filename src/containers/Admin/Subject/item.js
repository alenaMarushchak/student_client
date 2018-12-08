import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions/index';
import constants from "../../../constants/index";
import {push} from "react-router-redux";

import {Header, Button, Container, Image, Segment, Card, Label, Icon} from 'semantic-ui-react'

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
                name,
                teacher,
                groups
            } = {}
        } = this.props;

        let content = name ? <React.Fragment>
                <Container>
                    <Header as={'h2'} content={'Subject Information'}/>

                    <Segment>
                        <Header as='h5' attached='top'>
                            Name
                        </Header>

                        <Segment attached color='teal'>{name}</Segment>

                        {teacher && teacher._id ? <Card>
                            <Image src={teacher.avatar}/>
                            <Card.Content>
                                <Card.Header>{teacher.name}</Card.Header>
                                <Card.Meta>{teacher.email}</Card.Meta>
                            </Card.Content>
                        </Card> : null}

                        <Segment>
                            {groups && groups.length ? groups.map(item => <Label key={item._id}>
                                <Icon name='group'/> {item.name}
                            </Label>) : null}
                        </Segment>

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