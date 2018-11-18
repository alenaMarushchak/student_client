import constants from '../constants';

const {
    LOAD_SELECT,
} = constants;

const selectOptions = (selectOptions = {
    list    : {
        values    : [],
        page      : 0,
        filters   : {},
        totalPages: 0
    }
}, action) => {
    switch (action.type) {

        case LOAD_SELECT: {
            const {
                values,
                page,
                totalPages
            } = action.payload;
            return {
                ...selectOptions,
                list: {
                    ...selectOptions.list,
                    values,
                    page,
                    totalPages
                },
            };
        }

        default:
            return selectOptions;

    }
};

export {selectOptions};

