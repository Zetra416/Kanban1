const router = require('express').Router();
const taskRouter = require('./taskRouter');
const UC = require('../controllers/userController');

router.post('/login', UC.login);
router.post('/register', UC.register);
router.post('/googlelogin', UC.googleLogin);

router.use('/tasks', taskRouter);

module.exports = router;
