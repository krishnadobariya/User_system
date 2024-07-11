const Joi = require('joi');

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(3).required().messages({
            'string.base': `"name" should be a type of 'text'`,
            'string.empty': `"name" is not allowed to be empty`,
            'string.min': `"name" should have a minimum length of {#limit}`,
            'any.required': `"name" is a required field`
        }),
        email: Joi.string().min(6).required().email().messages({
            'string.base': `"email" should be a type of 'text'`,
            'string.empty': `"email" is not allowed to be empty`,
            'string.min': `"email" should have a minimum length of {#limit}`,
            'string.email': `"email" must be a valid email`,
            'any.required': `"email" is a required field`
        }),
        password: Joi.string().min(6).required().messages({
            'string.base': `"password" should be a type of 'text'`,
            'string.empty': `"password" is not allowed to be empty`,
            'string.min': `"password" should have a minimum length of {#limit}`,
            'any.required': `"password" is a required field`
        }),
        role: Joi.string().valid('user', 'admin').optional().messages({
            'string.base': `"role" should be a type of 'text'`,
            'any.only': `"role" must be one of [user, admin]`
        }),
    });
    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email().messages({
            'string.base': `"email" should be a type of 'text'`,
            'string.empty': `"email" is not allowed to be empty`,
            'string.min': `"email" should have a minimum length of {#limit}`,
            'string.email': `"email" must be a valid email`,
            'any.required': `"email" is a required field`
        }),
        password: Joi.string().min(6).required().messages({
            'string.base': `"password" should be a type of 'text'`,
            'string.empty': `"password" is not allowed to be empty`,
            'string.min': `"password" should have a minimum length of {#limit}`,
            'any.required': `"password" is a required field`
        }),
    });
    return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
