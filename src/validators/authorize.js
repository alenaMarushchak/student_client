export const authorize = {
    email: {
        presence: {
            message: 'Email could not be empty',
            allowEmpty: false

        },
        email: {
            message: 'Email should be valid'
        }
    },

    password: {
        presence: {
            allowEmpty: false,
            message   : "is required"
        },
        length  : {
            minimum: 8,
            maximum: 50
        }
    }
};
