import constants from '../constants';

const {
    LOAD_BLOG_LIST,
    CREATE_BLOG,
    EDIT_BLOG,
    DELETE_BLOG,
    CLEAN_DATA
} = constants;

const blog = (blogs = {
    list: {
        values    : [],
        page      : 0,
        filters   : {},
        totalPages: 0
    }
}, action) => {
    switch (action.type) {

        case LOAD_BLOG_LIST:
            const {
                values,
                page,
                totalPages
            } = action.payload;
            return {
                ...blogs,
                list: {
                    ...blogs.list,
                    values,
                    page,
                    totalPages
                },
            };

        case `${CLEAN_DATA}_${LOAD_BLOG_LIST}`:
            return {
                ...blogs,
                list: {
                    ...blogs.list,
                    values: [],
                },
            };

        case CREATE_BLOG:
            return {
                ...blogs,
                list: {
                    ...blogs.list,
                    values: blogs.list.values.concat(action.payload.blog)
                }
            };


        case DELETE_BLOG: {
            let index = blogs.list.values.findIndex(o => o._id === action.payload.blog._id);

            blogs.list.values.splice(index, 1);

            return {
                ...blogs,
                list: {
                    ...blogs.list,
                    values: [].concat(blogs.list.values)
                }
            };
        }

        default:
            return blogs;

    }
};

export {blog};

