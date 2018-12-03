export const createGroup = {
    name: {
        format: {
            pattern: "[A-z]+[0-9]+",
            flags: "i",
            message: "can only contain a-z "
        },
        presence: {
            allowEmpty: true
        }
    }
};

export const editGroup = {
    name: {
        format: {
            pattern: "[A-z]+[0-9]+",
            flags: "i",
            message: "can only contain a-z "
        }
    }
};
