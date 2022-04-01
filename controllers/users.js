const path = require('path');
const { getJsonFromFile } = require('../helpers/fsHandler');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const getUsers = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send('Backend server error');
  }
};

const getUserById = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath);
    const user = users.find((data) => data._id === req.params._id);

    if (!user) {
      res.status(404).send('User not found');
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('Backend server error');
  }
};

module.exports = {
  getUsers,
  getUserById,
};
