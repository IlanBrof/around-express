const express = require('express');

const router = express.Router();
const {
  getUsers, getUserById, createUser, patchUserData, patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:_id', getUserById);

router.post('/', createUser);

router.patch('/me', patchUserData);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
