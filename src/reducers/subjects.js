import constants from '../constants';

const {
    LOAD_SUBJECT,
    LOAD_SUBJECTS_LIST,
    CLEAN_DATA,
    CREATE_SUBJECT,
    EDIT_SUBJECT,
    DELETE_SUBJECT
} = constants;

const subjects = (subjects = {
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

        case LOAD_SUBJECTS_LIST:
            const {
                values,
                page,
                totalPages
            } = action.payload;
            return {
                ...subjects,
                list: {
                    ...subjects.list,
                    values,
                    page,
                    totalPages
                },
            };

        case `${CLEAN_DATA}_${LOAD_SUBJECTS_LIST}`:
            return {
                ...subjects,
                list: {
                    ...subjects.list,
                    values: [],
                },
            };

        case LOAD_SUBJECT:
            return {
                ...subjects,
                selected: Object.assign({},
                    {
                        value: action.payload.value
                    })
            };

        case `${CLEAN_DATA}_${LOAD_SUBJECT}`:
            return {
                ...subjects,
                selected: {
                    value: {}
                },
            };

        case CREATE_SUBJECT:
            return {
                ...subjects,
                list: {
                    ...subjects.list,
                    values: subjects.list.values.concat(action.payload)
                }
            };
        case EDIT_SUBJECT: {
            let index = subjects.list.values.findIndex(o => o._id === action.payload._id);

            subjects.list.values[index] = action.payload;
            return {
                ...subjects,
                list: {
                    ...subjects.list,
                    values: [].concat(subjects.list.values)
                }
            };
        }
        case DELETE_SUBJECT: {
            let index = subjects.list.values.findIndex(o => o._id === action.payload);

            subjects.list.values.splice(index, 1);

            return {
                ...subjects,
                list: {
                    ...subjects.list,
                    values: [].concat(subjects.list.values)
                }
            };
        }
        default:
            return subjects;

    }
};

export {subjects};

