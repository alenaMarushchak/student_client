import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Header, Button, Container, Image, Icon, Label, Form} from 'semantic-ui-react'
import actions from '../../actions';

const {
    uploadAvatarSaga
} = actions;

class ProfileComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            avatar : null,
            preview: this.props.user.avatar,
        }
    }

    cleanAvatar = () => {
        this.setState({
            avatar : null,
            preview: null
        });
    };

    onAvatarChange = (event) => {
        const {target: {files: {0: file}}} = event;

        this.setState({
            avatar : file,
            preview: this.generatePreview(file)
        });
    };

    generatePreview = (blob) => {
        try {
            return URL.createObjectURL(blob);
        } catch (e) {
            return null;
        }
    };

    uploadAvatar = () => {
        const {avatar} = this.state;

        if (!avatar) {
            return;
        }

        this.props.updateUserAvatar({avatar});
    };

    render() {
        const {
            user: {
                firstName,
                lastName,
                email
            }
        } = this.props;

        const {preview} = this.state;

        return (
            <React.Fragment>
                <Container>

                    <Header as={'h2'} content={'My Profile'}/>

                    <div>


                        <Image src={preview || '/img/logo.jpg'} size='small' circular/>

                        <label className="btn-upload-file">

                            <span className="icon-file-upload"/>
                            <input type="file" onChange={this.onAvatarChange} accept="image/*"/>

                        </label>

                        <Button onClick={this.cleanAvatar} content='Clean' secondary/>
                        <Button onClick={this.uploadAvatar} content='Upload' primary/>
                    </div>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='First name' readOnly value={firstName}/>
                            <Form.Input fluid label='Last name' readOnly value={lastName}/>
                        </Form.Group>
                    </Form>

                    <Label>
                        <Icon name='mail'/> {email}
                    </Label>

                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (store) => ({
    user: store.session.user
});

const mapDispatchToProps = (dispatch) => ({
    dispatch        : dispatch,
    updateUserAvatar: (fields) => {
        dispatch(uploadAvatarSaga(fields))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);