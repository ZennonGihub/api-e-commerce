# API RESTful de E-commerce

Esta es una **API RESTful** construida para gestionar un e-commerce. La cual permite a los clientes y administradores interactuar con productos, categorias y usuarios. La api esta diseñada para ser una base robusta para una aplicacion o e-commerce, manejando la logica de negocio y la persistencia de los datos

Características

**Gestión completa de productos**: Operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para productos, incluyendo detalles y precios.

**Organización por categorías**: Funcionalidad para categorizar productos y facilitar la navegación.

**Autenticación y autorización**: Seguridad robusta para usuarios y administradores utilizando JWT y Passport, garantizando que las acciones se realicen con los permisos correctos.s

**Validación de datos**: Implementación de Joi para asegurar la integridad de los datos en todas las peticiones.

**Generación de datos de prueba**: Incluye un seeder para poblar la base de datos con datos de ejemplo para pruebas rápidas.

Tecnologías utilizadas

**Backend**: Node.js, Express.js

**Base de datos**: PostgreSQL

**ORM**: Sequelize

**Autenticación**: JSON Web Token (JWT), Passport.js, bcrypt

**Validación**: Joi

**Manejo de errores**: @hapi/boom

**Generación de datos**: @faker-js/faker

**Herramienta de pruebas**: Insomnia

**Clonar el repositorio:**

```bash
Git Clone + url del repositorio
```

**Instalar las dependencias:**

```bash
cd + nombre del proyecto
npm install
```

**Configuracion de variables de entorno:**

Reemplaza los valores y/o agrega los valores faltantes con tu datos de correo y db en el archivo `.env-example`

```javascript
# Puerto en el que correrá la aplicación
PORT=3000

# Clave de API para algún servicio externo (si aplica)
API_KEY=

# --- Seguridad y JWT ---
# IMPORTANTE: Genera strings aleatorios y seguros para las siguientes claves.
# Puedes usar un generador online o la terminal (ej: openssl rand -hex 32)
JWT_SECRET=
JWT_RECOVERY=
REFRESH_TOKEN_SECRET=

# --- Configuración de la Base de Datos ---
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_NAME=
DB_PORT=5432

# --- Configuración para envío de emails con Nodemailer ---
USER_EMAIL=
EMAIL_PASSWORD=
```

**Ejecuta las migraciones y el seeder:**

Esto creara la estructura de la base de datos y la llenara con informacion:

```bash
npm run migrations:run
npm run seed:all
```

**Iniciar el servidor:**

```bash
npm run dev
```
