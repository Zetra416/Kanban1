const router = require('express').Router();
const TC = require('../controllers/taskController');
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication);
router.get('/', TC.findAll);
router.post('/', TC.create);

router.use(authorization);
router.get('/:id', TC.findId);
router.put('/:id', TC.update);
router.delete('/:id', TC.destroy);


module.exports = router;
