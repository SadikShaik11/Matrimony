import joi from 'joi'
/**
 * signup a user
 */
const userValidationSchema = {
    body: joi.object().keys({
        email: joi.string().required().regex(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/),
        mobileNumber: joi.number().required().min(1111111111).max(9999999999),
        password: joi.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'))
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.',
            }),
        confirmPassword: joi.string().required(),
        code: joi.string(),
        name: joi.string().required()

    })
}

const login = {
    body: joi.object().keys({
        email: joi.string().required().regex(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/),
        password: joi.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'))
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.',
            }),
        region: joi.string().required()
    })
}

export {
    userValidationSchema,
    login
}