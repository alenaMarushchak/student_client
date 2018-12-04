import constants from '../constants';

const {
    LOAD_STUDENT_POINTS,
    CLEAN_DATA

} = constants;

const student = (student = {
    values: []
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

        default:
            return student;

    }
};

export {student};

