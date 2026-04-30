require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const { PORT } = require('./config/env');
const swaggerSpec = require('./config/swagger');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'CANTINE 221 API',
  swaggerOptions: { persistAuthorization: true },
}));

// Routes API
app.use('/api', routes);

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API CANTINE 221 v2 (Docker) — Mouhamed Diop',
    version: '2.0.0',
    documentation: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      cuisiniers: `/api/cuisiniers`,
      eleves: `/api/eleves`,
      menus: `/api/menus`,
      repas: `/api/repas`,
    },
  });
});

// Middleware 404
app.use(notFound);

// Middleware de gestion des erreurs
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🍽️  CANTINE 221 API démarrée`);
  console.log(`   Serveur    : http://localhost:${PORT}`);
  console.log(`   API        : http://localhost:${PORT}/api`);
  console.log(`   Swagger    : http://localhost:${PORT}/api-docs`);
  console.log(`   Environnement : ${process.env.NODE_ENV}\n`);
});

module.exports = app;
