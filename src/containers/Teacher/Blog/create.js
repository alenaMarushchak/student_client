import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions';
import constants from "../../../constants";

import {Button, Header, Input, Modal} from 'semantic-ui-react'
import TagsInput from "../../CustomElements/TagsInput";

const {
    createBlogSaga
} = actions;


class CreateBlog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            name: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {tags, name} = this.state;

        let blog = {name, tags};

        this.props.createBlog(blog);
    };

    handelAddItem = (option) => {
        const selected = this.state.tags;

        selected.push(option);

        this.setState({
            tags: [].concat(selected),
        });
    };

    handelDeleteItem = (option) => {
        const selected = this.state.tags;

        const index = selected.findIndex(item => item === option);

        selected.splice(index, 1);

        this.setState({tags: [].concat(selected)});
    };

    onChange = (event) => {
        this.setState({
            name: event.target.value
        })
    };

    render() {
        const {
            closeModal,
            errors,
        } = this.props;

        return (
            <React.Fragment>

                <Modal.Header>Create blog</Modal.Header>

                <Modal.Content>
                    {errors && errors.name ? <span>{errors.name}</span> : null}
                    <Input
                        placeholder="Enter name of blog..."
                        onChange={this.onChange}
                        value={this.state.name}
                    />

                    <Header as='h3' content={'Tags'}/>
                    <TagsInput
                        selectedOptions={this.state.tags}
                        addItem={this.handelAddItem}
                        deleteItem={this.handelDeleteItem}
                    />
                </Modal.Content>

                <Modal.Actions>
                    <Button color='black' onClick={closeModal}>
                        Close
                    </Button>
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content="Save"
                        onClick={this.onSubmit}
                    />
                </Modal.Actions>

            </React.Fragment>
        );
    }
}

const connectedCreateBlog = connect(
    store => ({
        errors: store.errors[`${constants.CREATE_BLOG}_FRONTEND`],
    }),
    dispatch => (
        {
            createBlog: (blog) => dispatch(createBlogSaga({blog})),
            dispatch
        }
    ))(CreateBlog);

export default connectedCreateBlog;




