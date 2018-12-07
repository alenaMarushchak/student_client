import constants from '../constants';

const {
    LOAD_ADMIN_STATISTIC,
    LOAD_STUDENT_STATISTIC,
    CLEAN_DATA
} = constants;

const statistic = (statistic = {
    admin  : {
        values: []
    },
    student: {
        groups  : [],
        subjects: []
    }
}, action) => {
    switch (action.type) {

        case LOAD_ADMIN_STATISTIC: {
            const {
                value
            } = action.payload;
            return {
                ...statistic,
                admin: {
                    values: value
                },
            };
        }

        case `${CLEAN_DATA}_${LOAD_ADMIN_STATISTIC}`:
            return {
                ...statistic,
                admin: {
                    values: [],
                },
            };

        case LOAD_STUDENT_STATISTIC: {
            const {
                value
            } = action.payload;
            return {
                ...statistic,
                student: {
                    groups: value
                },
            };
        }

        case `${CLEAN_DATA}_${LOAD_STUDENT_STATISTIC}`:
            return {
                ...statistic,
                student: {
                    groups: []
                },
            };

        default:
            return statistic;

    }
};

export {statistic};

