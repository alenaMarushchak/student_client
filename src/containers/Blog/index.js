import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {getFormValues} from "redux-form";
import actions from '../../actions'
import {push} from "react-router-redux";
import constants from "../../constants";

import Toolbar from "../../components/Blog/toolbar";
import BlogComponent from "../../components/Blog";
import Pagination from "../../components/CustomElements/Pagination";
import {ROLES} from "../../constants/custom";
import {Header, Card, Label, Icon, Confirm} from "semantic-ui-react";

const {
    loadBlogListSaga,
    showModal,
    deleteBlogSaga,
    cleanData,
    addAuthor
} = actions;

class BlogContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            selectedBlog: null
        }
    }

    componentDidMount() {
        const {
            page,
            filters
        } = this.props;

        this.props.getBlogList(page === 0 ? 1 : page, filters);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.toolbarVals || {}).search !== (this.props.toolbarVals || {}).search) {
            this.search();
        }
    }

    componentWillUnmount() {
        this.props.clean();
    }

    navigateTo = (blogId) => {
        const {blog} = this.props;

        const author = blog.find(item => item._id === blogId).author;

        this.props.dispatch(push(`/blog/${blogId}/posts?author=${author._id}`));
    };

    search = () => {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.props.getBlogList(1);
        }, 500);
    };

    deleteBlogItem = () => {
        this.setState({open: false});
        this.props.deleteBlogItem(this.state.selectedBlog);
    };

    showCreate = () => {
        this.props.showCreateBlogModal();
    };

    onPageChange = (page) => {
        const {filters} = this.props;
        this.props.getBlogList(page.selected + 1, filters)
    };

    close = () => {
        this.setState({open: false, selectedBlog: null})
    };

    open = (item) => {
        this.setState({open: true, selectedBlog: item})
    };

    render() {
        const {
            user: {
                role
            },
            page = 1,
            totalPages,
            getBlogList,
            blog,
        } = this.props;

        let content;

        switch (role) {
            case ROLES.ADMIN:
                content = (<React.Fragment>

                    <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.deleteBlogItem}/>


                    {blog && blog.length ? <React.Fragment>
                        <Toolbar
                            loadBlogList={getBlogList}
                        />
                        <BlogComponent
                            canDeleted
                            deleteItem={this.open}
                            values={blog}
                            navigateTo={this.navigateTo}
                        />

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
                    <Header as='h3' onClick={this.showCreate} style={{cursor: 'pointer'}}>Create blog +</Header>

                    {blog && blog.length ? <React.Fragment>
                        <Toolbar
                            loadBlogList={getBlogList}
                        />
                        <BlogComponent
                            values={blog}
                            navigateTo={this.navigateTo}
                        />
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
                    {blog && blog.length ? <React.Fragment>
                        <Toolbar
                            loadBlogList={getBlogList}
                        />

                        <BlogComponent
                                values={blog}
                                navigateTo={this.navigateTo}
                        />
                        <Pagination
                            value={page}
                            totalPages={totalPages}
                            onChange={this.onPageChange}
                        />
                    </React.Fragment> : <p>No data..</p>}
                </React.Fragment>);
                break;
        }

        return (<React.Fragment>
            {content}
        </React.Fragment>);
    }
}


const connectedBlogContainer = connect(
    store => ({
        user       : store.session.user,
        blog       : store.blog.list.values,
        page       : store.blog.list.page,
        totalPages : store.blog.list.totalPages,
        filters    : store.blog.list.filters,
        toolbarVals: getFormValues('blogToolbar')(store)
    }),
    dispatch => (
        {
            getBlogList        : (page, filters) => dispatch(loadBlogListSaga(page, filters)),
            deleteBlogItem     : (blogId) => dispatch(deleteBlogSaga(blogId)),
            showCreateBlogModal: () => dispatch(showModal(constants.modal.type.CREATE_BLOG)),
            clean              : () => dispatch(cleanData(constants.LOAD_BLOG_LIST)),
            dispatch
        }
    ))(BlogContainer);

export default connectedBlogContainer;


