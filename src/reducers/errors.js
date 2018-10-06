import constants from '../constants';

const {
    ADD_ERRORS,
    CLEAN_ERRORS
} = constants;

const errors = (errorsState = {}, {
    type, requestType, errors
}) => {
    switch (type) {
        case ADD_ERRORS:
            return {
                ...errorsState,
                ...{[requestType]: errors}
            };
        case CLEAN_ERRORS:
            return {
                ...errorsState,
                ...{[requestType]: {}},
                ...{[`${requestType}_FRONTEND`]: {}}
            };
        default:
            return errorsState;
    }
};

export {errors};

