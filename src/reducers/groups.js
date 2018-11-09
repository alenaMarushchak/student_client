import constants from '../constants';

const {
    LOAD_GROUP,
    LOAD_GROUPS_LIST,
    CLEAN_DATA,
    CREATE_GROUP,
    EDIT_GROUP,
    DELETE_GROUP
} = constants;

const groups = (groups = {
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

        case LOAD_GROUPS_LIST:
            const {
                values,
                page,
                totalPages
            } = action.payload;
            return {
                ...groups,
                list: {
                    ...groups.list,
                    values,
                    page,
                    totalPages
                },
            };

        case `${CLEAN_DATA}_${LOAD_GROUPS_LIST}`:
            return {
                ...groups,
                list: {
                    ...groups.list,
                    values: [],
                },
            };

        case LOAD_GROUP:
            return {
                ...groups,
                selected: Object.assign({},
                    {
                        value: action.payload.value
                    })
            };

        case `${CLEAN_DATA}_${LOAD_GROUP}`:
            return {
                ...groups,
                selected: {
                    value: {}
                },
            };

        case CREATE_GROUP:
            return {
                ...groups,
                list: {
                    ...groups.list,
                    values: groups.list.values.concat(action.payload)
                }
            };
        case EDIT_GROUP: {
            let index = groups.list.values.findIndex(o => o._id === action.payload._id);

            groups.list.values[index] = action.payload;
            return {
                ...groups,
                list: {
                    ...groups.list,
                    values: [].concat(groups.list.values)
                }
            };
        }

        case DELETE_GROUP: {
            let index = groups.list.values.findIndex(o => o._id === action.payload);

            groups.list.values.splice(index, 1);

            return {
                ...groups,
                list: {
                    ...groups.list,
                    values: [].concat(groups.list.values)
                }
            };
        }

        default:
            return groups;

    }
};

export {groups};

