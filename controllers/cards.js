const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Backend server error' });
  }
};

const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (card) {
      res.status(200).send(card);
    } else {
      res.send('Cannot find card');
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'castError') {
      res.status(404).json({ message: 'Cannot find card' });
      return;
    }
    console.log(err);
    res.status(500).json({ message: '1Backend server error' });
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
    if (newCard) {
      res.status(200).send(newCard);
    } else {
      res.json('Cannot create card');
    }
  } catch (err) {
    res.status(500).json({ message: '2Backend server error' });
  }
};

const likeCard = async (req, res) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true },
    );
    if (like) {
      res.status(200).send(like);
    } else {
      res.send('Cannot set like');
    }
  } catch (err) {
    res.status(500).json({ message: '3Backend server error' });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true },
    );
    if (like) {
      res.status(200).send(like);
    } else {
      res.send('Cannot set dislike');
    }
  } catch (err) {
    res.status(500).json({ message: '4Backend server error' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (card) {
      res.status(200).json(`Card ${card.name} deleted successfully`);
    } else {
      res.send('Cannot delete card');
    }
  } catch (err) {
    res.status(500).json({ message: '5Backend server error' });
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
