const express = require('express');
const router = express.Router();

const cuisinierRoutes = require('./cuisinier.routes');
const eleveRoutes = require('./eleve.routes');
const menuRoutes = require('./menu.routes');
const repasRoutes = require('./repas.routes');

router.use('/cuisiniers', cuisinierRoutes);
router.use('/eleves', eleveRoutes);
router.use('/menus', menuRoutes);
router.use('/repas', repasRoutes);

module.exports = router;
