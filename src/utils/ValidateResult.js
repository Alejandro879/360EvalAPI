const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next()
    } catch (errors) {
        res.status(400).json({
            message: 'Error en los datos proporcionados.',
            status: 'failed',
            code: 400,
            data: errors.array()
        });
    }
}

module.exports = { validateResult }