import { body } from "express-validator";

export const registerUserValidator = [
    body('email', 'invalid, email cannot be empty').not().notEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('firstName', 'Invalid firstname').not().isEmpty().isLength({min : 3}),
    body('lastName', 'Invalid lastname').not().isEmpty().isLength({min : 3}),
    body('password', 'Invalid creds').not().isEmpty().isLength({min : 5}),
    body('mobile', 'Invalid mobile').not().isEmpty().isLength({min : 10, max : 10}),
]


export const loginUserValidator = [
    body('email', 'invalid, email cannot be empty').not().notEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Invalid creds').not().isEmpty().isLength({min : 5}),
]