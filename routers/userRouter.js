const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const validation = require('../validation/validation');

// Route for the admin request
userRouter.get('/', userController.getUsers);

// Route first to validation middleware then to userController
userRouter.post('/', validation.validate, userController.addUser);

// Route to delete user
userRouter.delete('/', userController.deleteUser);

module.exports = userRouter;
