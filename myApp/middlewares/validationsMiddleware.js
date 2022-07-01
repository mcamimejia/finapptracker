const {body} = require('express-validator');

module.exports = [
    body('name').notEmpty().withMessage("Required"),
    body('email')
        .notEmpty().withMessage("Required").bail()
        .isEmail().withMessage("Invalid email"),
    body('password')
        .notEmpty().withMessage("Required"),
    body('confirmPassword').custom((value, {req})=>{
        if(req.body.password != req.body.confirmPassword){
            throw new Error("Password doesn't match");
        }
        return true;
    }),
    body('terms')
        .notEmpty().withMessage("Required")
]