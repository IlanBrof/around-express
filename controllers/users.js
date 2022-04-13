const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Backend server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params._id });

    if (!user) {
      res.status(404).json({ message: 'Backend server error' });
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Backend server error' });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    if (newUser) {
      res.status(200).send(newUser);
    } else {
      console.log('Error in createUser');
      res.status(500).json({ message: 'Backend server error' });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json('Create user validation error');
    }
  }
};

const patchUserAvatar = async (req, res) => {
  try {
    const updateData = await User.findOneAndUpdate(req.user._id, req.body);
    if (updateData && req.body.avatar) {
      res.status(200).send('User avatar patched successfully');
    } else {
      console.log('Error in patchUserAvatar');
      res.send('Backend server error');
    }
  } catch (err) {
    res.status(500).json({ message: 'Backend server error' });
  }
};

const patchUserData = async (req, res) => {
  try {
    const updateData = await User.findOneAndUpdate(req.user._id, req.body);
    if (updateData && (req.body.name || req.body.about)) {
      res.status(200).send('User data patched successfully');
    } else {
      console.log('Error in patchUserData');
      res.send('Backend server error');
    }
  } catch (err) {
    res.status(500).json({ message: 'Backend server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteData = await User.findOneAndDelete(req.user._id);
    if (deleteData) {
      res.status(200).send(`User ${deleteData} deleted successfully`);
    } else {
      console.log('Error in deleteUser');
      res.send('Backend server error');
    }
  } catch (err) {
    res.status(500).json({ message: 'Backend server error' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchUserAvatar,
  patchUserData,
  deleteUser,
};
