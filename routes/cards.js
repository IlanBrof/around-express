const express = require('express');

const router = express.Router();
const {
  getCards, getCardById, createCard, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.get('/:_id', getCardById);

router.post('/', createCard);

router.put('/:_id/likes', likeCard);

router.delete('/:_id/likes', dislikeCard);
router.delete('/:_id', deleteCard);

module.exports = router;
