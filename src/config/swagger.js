const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CANTINE 221 API',
      version: '1.0.0',
      description: 'API de gestion de la cantine scolaire CANTINE 221 — Mouhamed Diop',
      contact: {
        name: 'Mouhamed Diop',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Serveur de développement',
      },
    ],
    components: {
      schemas: {
        Cuisinier: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            prenom: { type: 'string', example: 'Mamadou' },
            nom: { type: 'string', example: 'Diallo' },
            email: { type: 'string', example: 'mamadou@cantine221.sn' },
            telephone: { type: 'string', example: '+221771234567' },
            specialite: { type: 'string', example: 'cuisine africaine' },
          },
        },
        Eleve: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            prenom: { type: 'string', example: 'Fatou' },
            nom: { type: 'string', example: 'Ndiaye' },
            classe: { type: 'string', example: '6ème A' },
            regimeAlimentaire: { type: 'string', enum: ['NORMAL', 'VEGETARIEN', 'SANS_GLUTEN'] },
            telephoneParent: { type: 'string', example: '+221770000000' },
          },
        },
        Menu: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            date: { type: 'string', format: 'date', example: '2024-12-01' },
            intitule: { type: 'string', example: 'Thieboudienne' },
            type: { type: 'string', enum: ['DEJEUNER', 'GOUTER'] },
            cuisinierId: { type: 'integer', example: 1 },
            portionsPrevues: { type: 'integer', example: 100 },
          },
        },
        Repas: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            eleveId: { type: 'integer', example: 1 },
            menuId: { type: 'integer', example: 1 },
            dateService: { type: 'string', format: 'date', example: '2024-12-01' },
            statut: { type: 'string', enum: ['SERVI', 'ABSENT'] },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/config/swagger-annotation.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
