/* ====================================================================
* Importaciones de módulos principales de Node.js y librerías externas
* ==================================================================== */
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const YAML = require('yamljs');
const morgan = require('morgan');  // Importa morgan

/* ====================================================================
* Configuración y utilidades
* ==================================================================== */
require('module-alias/register'); 
const mongoSanitize = require('express-mongo-sanitize');
const { limiter } = require('@config/RateLimit.conf');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

/* ====================================================================
* Cargar el archivo de documentación de Swagger
* ==================================================================== */
const swaggerDocument = YAML.load(`${path.join(__dirname, "./documents/swagger.yaml")}`);

/* ====================================================================
* Rutas
* ==================================================================== */
const authRoutes = require('@routes/Auth.routes');
const employeRoutes = require('@routes/Empleado.routes');
const evaluacionRoutes = require('@routes/evaluacion.routes');
const evaluadoresRoutes = require('@routes/Evaluador.routes');
const competenciaRoutes = require('@routes/Competencia.routes');
const preguntaRoutes = require('@routes/Pregunta.routes');
const reporteRoutes = require('@routes/Reporte.routes');
const notificacionRoutes = require('@routes/Notificacion.routes');

// Inicializar aplicación
dotenv.config();
const app = express();

// Conexión a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Aplicar el rate limiter a todas las solicitudes
app.use(limiter);

// Previene la inyección NoSQL
app.use(mongoSanitize());

// Agregar morgan para logging de peticiones HTTP
app.use(morgan('combined'));  

// Middleware para servir la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Definición de rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeRoutes);
app.use('/api/evaluations', evaluacionRoutes);
app.use('/api/evaluador', evaluadoresRoutes);
app.use('/api/competencia', competenciaRoutes);
app.use('/api/questions', preguntaRoutes);
app.use('/api/reports', reporteRoutes);
app.use('/api/notificacion', notificacionRoutes);

// Ruta base para verificar el estado de la API
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Middleware de manejo de errores
app.use(errorHandler); 

// Inicialización del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
