import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Button, Header, Input, Segment} from 'semantic-ui-react'

import constants from "../../../constants";
import CreatePostForm from "../../../components/Post/createPost";
import TagsInput from "../../CustomElements/TagsInput";

class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const tags = this.state.tags;

        this.props.addPost(tags);

        this.setState({
            tags: []
        });
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

    render() {
        const {
            errors,
        } = this.props;

        return (
            <React.Fragment>
                <CreatePostForm errors={errors}/>
                <TagsInput
                    selectedOptions={this.state.tags}
                    addItem={this.handelAddItem}
                    deleteItem={this.handelDeleteItem}
                />
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content="Save"
                    onClick={this.onSubmit}
                />
            </React.Fragment>
        );
    }
}

const connectedCreatePost = connect(
    store => ({
        errors: store.errors[`${constants.CREATE_POST}_FRONTEND`],
    }),
    null)(CreatePost);

export default connectedCreatePost;
