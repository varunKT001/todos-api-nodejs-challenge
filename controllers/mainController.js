const CatchAsyncErrors = require('../middlewares/CatchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const Axios = require('axios');

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * @desc    Return list of todos without userId
 * @route   GET /todos
 * @access  public
 */
exports.getTodos = CatchAsyncErrors(async (req, res, next) => {
  // Get the list of todos
  const { data: todos } = await Axios.get(TODOS_URL);

  // Remove userId from todos
  const todosWithoutUserId = todos.map((todo) => {
    const { id, title, completed } = todo;
    return { id, title, completed };
  });

  return res.status(200).json(todosWithoutUserId);
});

/**
 * @desc    Return list of todos of particular user
 * @route   GET /user
 * @access  public
 */
exports.getUserAndTodos = CatchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  // Get the user
  const { data: user } = await Axios.get(`${USERS_URL}/${userId}`);

  // Get the todos
  const { data: todos } = await Axios.get(TODOS_URL);

  // Filter the todos by userId
  const userTodos = todos.filter((todo) => todo.userId === user.id);

  // Append the todos to the user Object
  user.todos = userTodos;

  return res.status(200).json(user);
});
