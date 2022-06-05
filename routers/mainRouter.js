const router = require('express').Router();
const mainController = require('../controllers/mainController');

router.route('/todos').get(mainController.getTodos);
router.route('/user/:userId').get(mainController.getUserAndTodos);

module.exports = router;
