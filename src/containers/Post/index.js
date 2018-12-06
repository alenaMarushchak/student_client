import React, {Component} from 'react';
import queryString from 'query-string'
import connect from "react-redux/es/connect/connect";
import {getFormValues} from "redux-form";
import actions from '../../actions'
import {push} from "react-router-redux";
import constants from "../../constants";

import Toolbar from '../../components/Post/toolbar'
import PostComponent from '../../components/Post'
import Pagination from "../../components/CustomElements/Pagination";
import CreatePostForm from '../Teacher/Post/create'

import {ROLES} from "../../constants/custom";
import {Segment, Card, Label, Icon, Confirm, Button} from "semantic-ui-react";

const {
    loadPostListSaga,
    deletePostSaga,
    createPostSaga,
    cleanData
} = actions;

class PostContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    componentDidMount() {
        const {
            page,
            filters,
            match: {
                params: {id: blogId}
            }
        } = this.props;

        this.props.getPostList(blogId, page === 0 ? 1 : page, filters);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.toolbarVals || {}).search !== (this.props.toolbarVals || {}).search) {
            this.search();
        }
    }

    componentWillUnmount() {
        this.props.clean();
    }

    navigateTo = (postId) => {
        const {match: {params: {id: blogId}}} = this.props;

        this.props.dispatch(push(`/blog/${blogId}/posts/${postId}`));
    };

    search = () => {
        clearTimeout(this.timeoutId);

        const {
            match: {
                params: {id: blogId}
            }
        } = this.props;

        this.timeoutId = setTimeout(() => {
            this.props.getPostList(blogId, 1);
        }, 500);
    };

    deletePostItem = (blog) => {
        this.setState({open: false});

        this.props.deletePostItem(blog);
    };

    addPost = (tags) => {
        const {match: {params: {id: blogId}}} = this.props;

        this.props.createPost({blogId, tags});
    };

    onPageChange = (page) => {
        const {
            filters,
            match: {params: {id: blogId}}
        } = this.props;

        this.props.getBlogList(blogId, page.selected + 1, filters)
    };

    close = () => {
        this.setState({open: false})
    };

    open = () => {
        this.setState({open: true})
    };

    render() {
        const {
            user:{
                _id,
                role
            },
            page = 1,
            totalPages,
            getPostList,
            post,
        } = this.props;

        const values = queryString.parse(this.props.location.search);

        let isAuthor = values.author === _id;
        let content;

        switch (role) {
            case ROLES.ADMIN:
                content = (<React.Fragment>

                    <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.deletePostItem}/>

                    {post && post.length ? <React.Fragment>
                        <Toolbar
                            loadPostList={getPostList}
                        />
                        <Card>
                            <Label as='a' onClick={this.open}>
                                Delete
                                <Icon name='delete'/>
                            </Label>
                            <PostComponent
                                values={post}
                                navigateTo={this.navigateTo}
                            />
                        </Card>
                        <Pagination
                            value={page}
                            totalPages={totalPages}
                            onChange={this.onPageChange}
                        />
                    </React.Fragment> : <p>No data..</p>}
                </React.Fragment>);
                break;
            case ROLES.TEACHER:
                content = (<React.Fragment>
                    {isAuthor ? <Segment>
                        <CreatePostForm addPost={this.addPost}/>
                    </Segment> : null}
                    {post && post.length ? <React.Fragment>
                        <Toolbar
                            loadPostList={getPostList}
                        />
                        <Card>
                            <PostComponent
                                values={post}
                                navigateTo={this.navigateTo}
                            />
                        </Card>
                        <Pagination
                            value={page}
                            totalPages={totalPages}
                            onChange={this.onPageChange}
                        />
                    </React.Fragment> : <p>No data..</p>}
                </React.Fragment>);
                break;
            default:
                content = (<React.Fragment>
                    {post && post.length ? <React.Fragment>
                        <Toolbar
                            loadPostList={getPostList}
                        />
                        <Card>
                            <PostComponent
                                values={post}
                                navigateTo={this.navigateTo}
                            />
                        </Card>
                        <Pagination
                            value={page}
                            totalPages={totalPages}
                            onChange={this.onPageChange}
                        />
                    </React.Fragment> : <p>No data..</p>}
                </React.Fragment>);
                break;
        }

        return (<React.Fragment>{content}</React.Fragment>);
    }
}


const connectedPostContainer = connect(
    store => {
        return ({
            user       : store.session.user,
            post       : store.post.list.values,
            page       : store.post.list.page,
            totalPages : store.post.list.totalPages,
            filters    : store.post.list.filters,
            toolbarVals: getFormValues('postToolbar')(store)
        })
    },
    dispatch => (
        {
            getPostList   : (blogId, page, filters) => dispatch(loadPostListSaga(blogId, page, filters)),
            deletePostItem: (post) => dispatch(deletePostSaga({post})),
            createPost    : ({blogId, tags}) => dispatch(createPostSaga({blogId, tags})),
            clean         : () => dispatch(cleanData(constants.LOAD_POSTS)),
            dispatch
        }
    ))(PostContainer);

export default connectedPostContainer;


