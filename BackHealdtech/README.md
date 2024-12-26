# 🌐HealTech API
La solución definitiva para consultas médicas virtuales.\
🔗 Citas rápidas y seguras desde la comodidad de tu hogar.

✨ Características Principales\
🗓️ Programación de Citas Médicas en Línea:\
Agenda tus consultas virtuales con facilidad.

📂 Acceso a Historiales Médicos:\
Información completa para diagnósticos precisos.

🔄 Gestión de Citas:\
Los administradores tienen control total para asignar médicos disponibles.

🎯 User Stories\
👩‍⚕️ Paciente: Programa consultas virtuales sin salir de casa.

👨‍⚕️ Médico: Accede a historiales médicos de los pacientes durante las consultas.

👨‍💼 Administrador: Gestiona citas y asigna médicos según disponibilidad.


## Tecnologías Utilizadas

- **Express.js**: Framework web para Node.js.
- **JWT (JSON Web Tokens)**: Gestión de autenticación.
- **PostgreSQL**: Base de datos relacional.
- **Railway**: Plataforma de despliegue.
- **dotenv**: Gestión de variables de entorno.
- **Sequelize**: ORM para interactuar con PostgreSQL.
- **Bcrypt**: Encriptación de contraseñas.
- **Cookie-Parser**: Manejo de cookies en las solicitudes HTTP.
- **Swagger**: Documentacion de API.

## Instalación

1. Clona el repositorio:

   git clone https://github.com/No-Country-simulation/C22-27-ft-webapp.git

   cd healtech-api/server

**Instala las dependencias:**

npm install

**Crea un archivo .env en la raíz del proyecto y configura las siguientes variables de entorno:**

envs

DB_HOST=tu_db_host\
DB_PORT=5432\
DB_USER=tu_usuario\
DB_PASSWORD=tu_contraseña\
DB_NAME=healtech\
JWT_SECRET=tu_secreto\
PORT=3000\

**Inicia el servidor:**

npm start

**Endpoints**

Método----------Endpoint--------Descripción

**Autenticación**

POST	/auth/login	Inicia sesión y genera un token JWT.\
POST	/auth/register	Registra un nuevo usuario.

**Pacientes**

POST	/patients	Crea un nuevo paciente.\
PUT	/patients/:id	Actualiza la información de un paciente.\

**Citas Médicas**

GET	/appointments	Lista todas las citas médicas.\
POST	/appointments	Programa una nueva cita.\
PUT	/appointments/:id	Actualiza una cita existente.\
DELETE	/appointments/:id	Cancela una cita.

**Médicos**

POST	/doctors	Registra un nuevo médico.\
PUT	/doctors/:id	Actualiza la información de un médico.

**Admins**

GET	/admin	Lista todos los admin.\
GET	/admin/:id	Muestra información de un admin específico.\
POST	/admin	Registra un nuevo médico.\
PUT	/admin/:id	Actualiza la información de un admin.\
DELETE /admin/:id	Elimina un admin.

GET	/admin/doctors	Lista todos los médicos.\
GET	/admin/doctors/:id	Muestra información de un médico específico.\
DELETE	/doctors/:id	Elimina un médico.

GET	/admin/patients	Lista todos los pacientes.\
GET	/admin/patients/:id	Muestra información de un paciente específico.\
DELETE	/admin/patients/:id	Elimina un paciente.

**Swagger**

Para acceder a la documentacion:

GET /api-docs

**Testing**

Se utiliza Supertest para pruebas de integración. Ejecuta las pruebas con:

npm test

**Despliegue**

HealTech está desplegado en Railway. Configura las variables de entorno necesarias en la plataforma para que coincidan con las del archivo .env.

**Contribución**

Crea un fork del proyecto.
Crea una rama para tu funcionalidad: git checkout -b feature/nueva-funcionalidad.
Haz tus cambios y realiza un commit: git commit -m 'Añadir nueva funcionalidad'.
Sube tus cambios: git push origin feature/nueva-funcionalidad.
Abre un Pull Request.
Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

Contacto
Para más información o soporte, contacta a:

Email: zapatacamilo86@gmail.com -- valdesmartin@gmail.com
GitHub: https://github.com/Martin-Valdes -- https://github.com/ZapataCamilo

Este `README.md` está diseñado para ser claro y útil tanto para desarrolladores como para usuarios