const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).send('Cannot find card by this ID');
    }
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: '400 Bad request' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  try {
    const newCard = await Card.create({
      name,
      link,
      owner: userId,
    });
    if (!newCard) {
      res.json('Error while creating card');
    }
    res.status(200).send(newCard);
  } catch (err) {
    if (err.name = 'ValidationError') { // eslint-disable-line
      return res.status(400).send('400 Bad Request');
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const likeCard = async (req, res) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true },
    );
    if (!like) {
      return res.status(404).send('Cannot find card to set like');
    }
    res.status(200).send(like);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Wrong cardID syntax' });
    }
    res.status(500).json({ message: 'Backend server error' });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const dislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true },
    );
    if (!dislike) {
      return res.status(404).send('Cannot find card to set dislike');
    }
    res.status(200).send(dislike);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Wrong cardID syntax' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      res.status(404).send({ message: 'Cannot find card by this ID' });
    }
    res.status(200).json(`Card ${card.name} deleted successfully`);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Wrong cardID syntax' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCards,
  getCardById,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
};
