const express = require('express');
const router = express.Router();

const ToughtController = require('../controllers/ToughtController');

//_helpers
const checkAuth = require('../helpers/auth').checkAuth;

router.get('/add', checkAuth, ToughtController.createTought);
router.get('/add', checkAuth, ToughtController.createTought);
router.get('/edit/:id', checkAuth, ToughtController.updateTought);
router.post('/edit', checkAuth, ToughtController.updateToughtPost);


router.post('/remove', checkAuth, ToughtController.removeTought)
router.post('/add', checkAuth, ToughtController.createToughtSave);
router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.get('/', ToughtController.showToughts);

module.exports = router;
