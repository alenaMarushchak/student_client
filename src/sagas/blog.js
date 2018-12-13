import {call, put, select, takeLatest} from 'redux-saga/effects';
import validator from '../services/validator'
import {getFormValues} from 'redux-form';
import axios from 'axios';
import constants from '../constants';
import actions from '../actions';

const {
    API_BLOG,
    LOAD_BLOG_LIST_SAGA,
    CREATE_BLOG_SAGA,
    DELETE_BLOG_SAGA,
    CREATE_POST_SAGA,
    LOAD_POSTS_SAGA,
    LOAD_POST_ITEM_SAGA,
    DELETE_POST_SAGA,

} = constants;

const {
    toast,
    hideModal,
    addErrorsSaga,
    addValidateError,
    cleanErrors,
    addRequestError,

    loadBlogList,
    createBlog,
    deleteBlog,
    createPost,
    loadPostItem,
    deletePost,
    loadPostList
} = actions;

function* validateUser(data, type, action) {
    const errors = validator.validate(data, type);

    if (errors) {
        yield put(addValidateError(action, errors));
        return false;
    } else {
        yield put(cleanErrors(action));
        return true;
    }
}

const getSearchValueBlog = (store) => (
    (getFormValues('blogToolbar')(store) || {search: ''}).search
);

const getSearchValuePost = (store) => (
    (getFormValues('postToolbar')(store) || {search: ''}).search
);

function* _loadBlogListSaga({filters = {}, page = 0}) {
    try {
        const [oldPage, oldFilters] = yield select(store => [
            store.blog.list.page, store.blog.list.filters
        ]);

        const search = yield select(getSearchValueBlog);
        const newPage = (page > 0 ? page : oldPage);

        const apiFilters = {
            page: newPage,
            search,
            ...oldFilters,
            ...filters,
        };

        const response = yield call(() => axios.get(API_BLOG, {
            params: {
                ...apiFilters
            }
        }));

        const blog = response.data.data;

        const {
            pages,

        } = response.data.meta;

        yield put(loadBlogList(blog, newPage, {...oldFilters, search, ...filters}, pages));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _createBlogSaga({blog}) {
    try {
        const jsonData = {
            ...blog
        };

        const isValid = yield call(validateUser, jsonData, 'createBlog', 'CREATE_BLOG');

        if (!isValid) return;

        const response = yield call(() => axios.post(API_BLOG, jsonData));
        const blogResponse = response.data;

        yield put(createBlog({blogResponse}));

        yield put(toast.success('Blog was created successfully'));

        yield put(hideModal());
    } catch (e) {

        yield put(addErrorsSaga(CREATE_BLOG_SAGA, e.response));
    }
}

function* _deleteBlogSaga({blogId}) {
    try {
        yield call(() => axios.delete(`${API_BLOG}/${blogId}`));

        yield put(deleteBlog(blogId));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _loadPostListSaga({blogId, filters = {}, page = 0}) {
    try {
        const [oldPage, oldFilters] = yield select(store => [
            store.post.list.page, store.post.list.filters
        ]);

        const search = yield select(getSearchValuePost);
        const newPage = (page > 0 ? page : oldPage);

        const apiFilters = {
            page: newPage,
            search,
            ...oldFilters,
            ...filters,
        };

        const response = yield call(() => axios.get(`${API_BLOG}/${blogId}/post`, {
            params: {
                ...apiFilters
            }
        }));

        const post = response.data.data;

        const {
            pages,

        } = response.data.meta;

        yield put(loadPostList(post, newPage, {...oldFilters, search, ...filters}, pages));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _loadPostItemSaga({post}) {
    try {
        const postId = post._id;

        const response = yield call(() => axios.get(`${API_BLOG}/post/${postId}`));

        const postData = response.data;

        yield put(loadPostItem({post: postData}));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _createPostSaga({blogId, tags}) {
    try {
        const generatedFields = yield select(store => (getFormValues('createPost')(store)));
        const {title, description} = generatedFields;

        const jsonData = {
            title,
            description,
            tags
        };

        const isValid = yield call(validateUser, jsonData, 'createPost', 'CREATE_POST');

        if (!isValid) {
            return;
        }

        const response = yield call(() => axios.post(`${API_BLOG}/${blogId}/post`, jsonData));

        const post = response.data;

        yield put(createPost({post}));

        yield put(toast.success('Post was created successfully'));
    } catch (e) {
        yield put(addErrorsSaga(CREATE_POST_SAGA, e.response));
    }
}

function* _deletePostSaga({postId}) {
    try {
        yield call(() => axios.delete(`${API_BLOG}/post/${postId}`));

        yield put(deletePost(postId));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* loadBlogListSaga() {
    yield takeLatest(LOAD_BLOG_LIST_SAGA, _loadBlogListSaga);
}

function* createBlogSaga() {
    yield takeLatest(CREATE_BLOG_SAGA, _createBlogSaga);
}

function* deleteBlogSaga() {
    yield takeLatest(DELETE_BLOG_SAGA, _deleteBlogSaga)
}

function* loadPostListSaga() {
    yield takeLatest(LOAD_POSTS_SAGA, _loadPostListSaga);
}

function* loadPostItemSaga() {
    yield takeLatest(LOAD_POST_ITEM_SAGA, _loadPostItemSaga)
}

function* createPostSaga() {
    yield takeLatest(CREATE_POST_SAGA, _createPostSaga)
}

function* deletePostSaga() {
    yield takeLatest(DELETE_POST_SAGA, _deletePostSaga)
}


export {
    loadBlogListSaga,
    createBlogSaga,
    deleteBlogSaga,
    createPostSaga,
    loadPostItemSaga,
    deletePostSaga,
    loadPostListSaga
};