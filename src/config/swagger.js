// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
// Configuración de Swagger JSDoc
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Evaluación 360 Grados',
      version: '1.0.0',
      description: 'Documentación de la API para el sistema de evaluación 360 grados',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  // Rutas de los archivos que contienen comentarios JSDoc para Swagger
  apis: [`${path.join(__dirname, "../routes/*.routes.js")}`], // Ajusta la ruta según la estructura de tu proyecto
};

// Crear especificación Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec };

