import constants from '../constants';

const {
    LOAD_USER,
    LOAD_USERS_LIST,
    CLEAN_DATA,
    CREATE_USER,
    EDIT_USER
} = constants;

const users = (users = {
    list    : {
        values    : [],
        page      : 0,
        filters   : {},
        totalPages: 0
    },
    selected: {
        value: {}
    }
}, action) => {
    switch (action.type) {

        case LOAD_USERS_LIST:
            const {
                values,
                page,
                totalPages
            } = action.payload;
            return {
                ...users,
                list: {
                    ...users.list,
                    values,
                    page,
                    totalPages
                },
            };

        case `${CLEAN_DATA}_${LOAD_USERS_LIST}`:
            return {
                ...users,
                list: {
                    ...users.list,
                    values: [],
                },
            };

        case LOAD_USER:
            return {
                ...users,
                selected: {
                    value: action.payload.value
                },
            };

        case `${CLEAN_DATA}_${LOAD_USER}`:
            return {
                ...users,
                selected: {
                    value: {}
                },
            };

        case CREATE_USER:
            return {
                ...users,
                list: {
                    ...users.list,
                    values: users.list.values.concat(action.payload)
                }
            };
        case EDIT_USER:
            let index = users.list.values.findIndex(o => o._id === action.payload._id);

            users.list.values[index] = action.payload;
            console.log(action.payload);
            return {
                ...users,
                list: {
                    ...users.list,
                    values: [].concat(users.list.values)
                }
            };
        default:
            return users;

    }
};

export {users};

