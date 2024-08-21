# 360EvalAPI

API RESTful para un sistema de evaluaciones 360 grados, construida con Node.js, Express y Mongoose.

## Requisitos previos

- Node.js (versión 22 o superior)
- MongoDB

## Configuración del proyecto

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Alejandro879/360EvalAPI.git
   cd 360evalapi
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Copia el archivo `.env.example` y renómbralo a `.env`:
   ```bash
   cp .env.example .env
   ```

   O tambien crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/360evalapi
   JWT_SECRET=tu_secret_key
   ```
    Se puede ocupar el URI de MongoAtlas de desarrollo configurada para este proyecto: 

    mongodb+srv://360EvalUser:us7xJAhZKnbrmp2y@360evaldb.yr2ul.mongodb.net/?retryWrites=true&w=majority&appName=360EvalDB

4. **Ejecutar el proyecto en desarrollo**

   ```bash
   npm run dev
   ```

   Esto iniciará el servidor en modo de desarrollo utilizando Nodemon.

5. **Ejecutar el proyecto en producción**

   ```bash
   npm start
   ```

   Esto iniciará el servidor en modo producción.

## Estructura del proyecto

La estructura del proyecto está organizada de la siguiente manera:

```plaintext
.
├── src
│   ├── config          # Configuraciones de la aplicación
│   ├── controllers     # Controladores para manejar las rutas
│   ├── middlewares     # Middlewares personalizados
│   ├── models          # Modelos de Mongoose para las entidades
│   ├── routes          # Definición de rutas de la API
│   ├── services        # Lógica de negocio y servicios
│   ├── tests           # Pruebas unitarias e integración
│   └── utils           # Utilidades y funciones auxiliares
├── index.js            # Punto de entrada de la aplicación
├── package.json        # Dependencias y scripts del proyecto
└── README.md           # Documentación del proyecto
```

### Decisiones de diseño

- **Modularidad**: El proyecto está dividido en módulos claros como controladores, modelos, servicios, etc., para mantener un código limpio y manejable.
- **Uso de Mongoose**: Se utiliza Mongoose como ODM para interactuar con MongoDB, lo que permite manejar las relaciones y validaciones de los datos de manera eficiente.
- **JWT para autenticación**: Se utiliza JSON Web Tokens (JWT) para la autenticación de los usuarios, lo que asegura las rutas y funcionalidades sensibles.
- **Documentación con Swagger**: La API está documentada utilizando Swagger, permitiendo a los desarrolladores visualizar y probar las rutas disponibles fácilmente.

## Documentación

### Swagger

La documentación completa de la API está disponible en Swagger. Puedes acceder a ella visitando la siguiente URL en tu navegador:

[Documentacion Swagger 360EvalAPI](http://localhost:3000/api-docs/)

### Postman

Además, puedes interactuar con la API utilizando el workspace de Postman. La API está documentada y accesible a través del siguiente enlace:

[Workspace de Postman - 360EvalAPI](https://www.postman.com/360evalapi/workspace/360eval360/api/9ff631da-8bd0-4db3-bd59-20d4fef7d597?action=share&creator=4714534&active-environment=4714534-f4cea524-a598-4e8f-914c-c1526a57fd9e)


## Modelos

Algunos de los modelos clave utilizados en la API incluyen:

- **Usuario**

  ```javascript
  const UsuarioSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, trim: true, lowercase: true },
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    usuario: { type: String, required: true, trim: true, unique: true },
    contraseña: { type: String, required: true },
    rol: { type: String, enum: ["admin", "manager", "employee"], required: true },
    estado: { type: Boolean, default: true },
    verificado: { type: Boolean, default: false },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now }
  });
  ```

- **Empleado**

  ```javascript
  const EmpleadoSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, trim: true, lowercase: true },
    nombres: { type: String, required: true, trim: true },
    apellidos: { type: String, required: true, trim: true },
    puesto: { type: String, required: true, trim: true },
    departamento: { type: String, required: true, trim: true },
    salario: { type: Number, required: true },
    fechaContrato: { type: Date, default: Date.now },
    evaluaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Evaluacion", default: [] }],
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now }
  });
  ```

## Ejecutar los tests

El proyecto utiliza [Jest](https://jestjs.io/) para las pruebas unitarias e integración. Para ejecutar los tests, utiliza el siguiente comando:

```bash
npm test
```

Este comando ejecutará todas las pruebas y generará un informe de cobertura.

## Dependencias principales

- **Express**: Framework de Node.js para la creación de servidores web.
- **Mongoose**: ODM para MongoDB, que facilita la gestión de datos en la base de datos.
- **bcryptjs**: Utilizado para el hash de contraseñas.
- **jsonwebtoken**: Para la creación y verificación de JSON Web Tokens.
- **express-validator**: Middleware para la validación de datos de entrada en las rutas.
- **swagger-jsdoc y swagger-ui-express**: Utilizados para generar y servir la documentación de la API.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un `issue` para discutir cualquier cambio importante antes de enviar un `pull request`.

## Licencia

Este proyecto está licenciado bajo la [Licencia ISC](LICENSE).
 