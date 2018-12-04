import constants from '../constants';

const {
    LOAD_STUDENT_POINTS,
    LOAD_STUDENTS_LIST,
    CLEAN_DATA

} = constants;

const student = (student = {
    values: [],

    list: {
        values    : [],
        page      : 0,
        filters   : {},
        totalPages: 0
    }
}, action) => {
    switch (action.type) {

        case LOAD_STUDENT_POINTS: {
            const {
                values,
            } = action.payload;
            return {
                ...student,
                values: values
            };
        }

        case `${CLEAN_DATA}_${LOAD_STUDENT_POINTS}`:
            return {
                ...student,
                values: []
            };

        case LOAD_STUDENTS_LIST: {
            const {
                values,
                page,
                totalPages
            } = action.payload;
            return {
                ...student,
                list: {
                    ...student.list,
                    values,
                    page,
                    totalPages
                },
            };
        }

        case `${CLEAN_DATA}_${LOAD_STUDENTS_LIST}`: {
            return {
                ...student,
                list: {
                    ...student.list,
                    values: [],
                },
            };
        }

        default:
            return student;

    }
};

export {student};

