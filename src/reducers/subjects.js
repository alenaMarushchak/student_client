import constants from '../constants';

const {
    LOAD_SUBJECT,
    LOAD_SUBJECTS_LIST,
    CLEAN_DATA,
    CREATE_SUBJECT,
    EDIT_SUBJECT,
    DELETE_SUBJECT,

    ADD_TEACHER_TO_SUBJECT,
    REMOVE_TEACHER_FROM_SUBJECT,
    LOAD_OWN_TEACHER_SUBJECT,

    LOAD_GROUPS_BY_SUBJECT
} = constants;

const subjects = (subjects = {
    list: {
        values    : [],
        page      : 0,
        filters   : {},
        totalPages: 0
    },

    selected: {
        values    : [],
        page      : 0,
        filters   : {},
        totalPages: 0
    },

    teachersSubject: {
        list: {
            values    : [],
            page      : 0,
            filters   : {},
            totalPages: 0
        }
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

        case ADD_TEACHER_TO_SUBJECT: {
            return {
                ...subjects,
                teachersSubject: {
                    list: {
                        ...subjects.teachersSubject.list,
                        values: subjects.teachersSubject.list.values.concat(action.payload)
                    }
                }
            };
        }

        case REMOVE_TEACHER_FROM_SUBJECT: {
            let index = subjects.teachersSubject.list.values.findIndex(o => o._id === action.payload);

            subjects.teachersSubject.list.values.splice(index, 1);

            return {
                ...subjects,
                teachersSubject: {
                    list: {
                        ...subjects.teachersSubject.list,
                        values: [].concat(subjects.teachersSubject.list.values)
                    }
                }
            };
        }

        case LOAD_OWN_TEACHER_SUBJECT: {
            const {
                values,
                page,
                totalPages
            } = action.payload;
            return {
                ...subjects,
                teachersSubject: {
                    list: {
                        ...subjects.teachersSubject.list,
                        values,
                        page,
                        totalPages
                    }
                }
            };
        }

        case `${CLEAN_DATA}_${LOAD_OWN_TEACHER_SUBJECT}`:
            return {
                ...subjects,
                teachersSubject: {
                    list: {
                        ...subjects.teachersSubject.list,
                        values: [],
                    }
                },
            };

        case `${CLEAN_DATA}_${LOAD_GROUPS_BY_SUBJECT}`: {
            return {
                ...subjects,
                selected: {
                    list: {
                        ...subjects.selected.list,
                        values: [],
                    }
                },
            };
        }

        case LOAD_GROUPS_BY_SUBJECT: {
            const {
                values,
                page,
                totalPages
            } = action.payload;

            return {
                ...subjects,
                selected: {
                    list: {
                        ...subjects.selected.list,
                        values,
                        page,
                        totalPages
                    }
                }

            }
        }

        default:
            return subjects;

    }
};

export {subjects};

