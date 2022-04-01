const path = require('path');
const { getJsonFromFile } = require('../helpers/fsHandler');

const cardsFilePath = path.join(__dirname, '..', 'data', 'cards.json');
const getCards = async (req, res) => {
  try {
    const cards = await getJsonFromFile(cardsFilePath);
    res.send(cards);
  } catch (err) {
    console.log(err);
    res.status(500).send('Backend server error');
  }
};

module.exports = {
  getCards,
};
