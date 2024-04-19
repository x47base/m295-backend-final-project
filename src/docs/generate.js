/* Swagger Auto Generation Package Import */
const swaggerAutogen = require('swagger-autogen')();

/* API Document Informations */
const doc = {
    info: {
        title: 'M295 Abschlussprojekt',
        description: 'Description',
    },
    host: 'localhost:3000',
};
/* Documentation Output File */
const outputFile = './swagger.json';
/* Array of all route files */
const routes = ['../main.js'];

/* Generation of the documentation */
swaggerAutogen(outputFile, routes, doc);
