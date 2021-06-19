const User = require('../models/userModel');

const userController = {
  getUsers: (req, res) => {
    // Gets all users
    User.find((e, allUsers) => {
      if (e) {
        console.log(e);
        res.status(500).json({
          message: 'Error in DB Registration: ' + e,
        });
      } else {
        allUsers.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        console.log('All users sent');
        res.status(200).json({
          allUsers: allUsers,
        });
      }
    });
  },
  addUser: (req, res) => {
    // Creates new user with validation for each field
    const newUser = new User(req.body);

    newUser.save((e, newUser) => {
      if (e) {
        console.log(e);
        res.status(500).json({
          message: 'Error in DB Registration: ' + e,
        });
      } else {
        console.log('User saved!');
        res.status(200).json({
          message: `Successfully created new user, ${JSON.stringify(
            newUser,
            null,
            2
          )}`,
        });
      }
    });
  },

  // Delete route to remove users
  deleteUser: (req, res) => {
    // Delete first that matches body sent
    User.deleteOne(req.body, (e) => {
      if (e) {
        console.log(e);
        res.status(500).json({
          message:
            `Error deleting user with the id of ${req.body._id} DB Registration: ` +
            e,
        });
      } else {
        console.log('User deleted!');
        res.status(200).json({
          message: `Successfully deleted User`,
        });
      }
    });
  },
};

module.exports = userController;
