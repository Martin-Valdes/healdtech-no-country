const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MediConnect API',
            version: '1.0.0',
            description: 'Al inicilizar el sevidor se crear un superAdmin, el cual tendras que loguearte con las credenciales que esta en el .env,' +
                ' después de loguearte con el superAdmin podrás crear mas usuarios con diferentes roles tanto como admin, doctor, paciente. Tener en cuenta ' +
                'que una vez se cree un usuario el superAdmin se eliminará y te tendrás que loguear con el usuario creado',
        }
    },
    apis: ['src/routes/*.js']
};

const specs = swaggerJsdoc(options);
const swaggerDocs = (app, port) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = { swaggerDocs }