export const createUser = {
    firstName: {
        presence: {
            message: 'First name is required',
            allowEmpty: false
        },
        format: {
            pattern: "[A-z]+",
            flags: "i",
            message: "can only contain a-z "
        }
    },
    lastName: {
        presence: {
            message: 'Last name is required',
            allowEmpty: false
        },
        format: {
            pattern: "[A-z]+",
            flags: "i",
            message: "can only contain a-z "
        }
    },
    email: {
        presence: {
            message: 'Email is required',
            allowEmpty: false

        },
        email: {
            message: 'Email is invalid'
        }
    },
    role: {
        presence: {
            message: 'Role is required',
            allowEmpty: false
        },
        numericality: {
            onlyInteger: true,
            greaterThan: 1,
            lessThanOrEqualTo: 10,
        }
    }
};

export const editUser = {
    firstName: {
        format: {
            pattern: "[A-z]+",
            flags: "i",
            message: "can only contain a-z "
        }
    },
    lastName: {
        format: {
            pattern: "[A-z]+",
            flags: "i",
            message: "can only contain a-z "
        }
    },
    email: {
        email: {
            message: 'Email is invalid'
        }
    },
    role: {
        numericality: {
            onlyInteger: true,
            greaterThan: 1,
            lessThanOrEqualTo: 10,
        }
    }
};
