import constants from '../constants';

const {
    CLEAN_DATA,
    LOAD_POSTS,
    LOAD_POST_ITEM,
    CREATE_POST,
    DELETE_POST,

} = constants;

const post = (posts = {
    list    : {
        values    : [],
        page      : 0,
        filters   : {},
        totalPages: 0
    },
    author  : '',
    selected: {
        value: {}
    }
}, action) => {
    switch (action.type) {

        case LOAD_POSTS:
            const {
                values,
                page,
                totalPages
            } = action.payload;

            return {
                ...posts,
                list: {
                    ...posts.list,
                    values,
                    page,
                    totalPages
                }
            };

        case `${CLEAN_DATA}_${LOAD_POSTS}`:
            return {
                ...posts,
                list  : {
                    ...posts.list,
                    values: [],
                }
            };

        case LOAD_POST_ITEM:
            return {
                ...posts,
                selected: {
                    value: action.payload.post
                },
            };

        case `${CLEAN_DATA}_${LOAD_POST_ITEM}`:
            return {
                ...posts,
                selected: {
                    value: {}
                },
            };

        case CREATE_POST:
            return {
                ...posts,
                list: {
                    ...posts.list,
                    values: posts.list.values.concat(action.payload.post)
                }
            };

        case DELETE_POST: {
            let index = posts.list.values.findIndex(o => o._id === action.payload.postId);

            posts.list.values.splice(index, 1);

            return {
                ...posts,
                list    : {
                    ...posts.list,
                    values: [].concat(posts.list.values)
                },
                selected: {
                    value: {}
                }
            };
        }
        default:
            return posts;

    }
};

export {post};

