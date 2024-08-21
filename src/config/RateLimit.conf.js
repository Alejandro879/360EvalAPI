const rateLimit = require('express-rate-limit');
// Configuración de rate limiting
const limiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 1 minutos
    max: 50, // Limita cada IP a 50 solicitudes por 'windowMs'
    message: {
        message: 'Demasiadas solicitudes desde esta IP, inténtelo nuevamente después de 3 minutos',
        status: 'error',
        code: 500,
        data: null
    },
    headers: true, 
});

module.exports = { limiter }