var express = require('express');
var router = express.Router();

const FILMS = [
  {
    "id": 1,
    "title": "Inception",
    "duration": 148,
    "budget": 160,
    "link": "https://www.imdb.com/title/tt1375666/"
  },
  {
    "id": 2,
    "title": "The Dark Knight",
    "duration": 152,
    "budget": 185,
    "link": "https://www.imdb.com/title/tt0468569/"
  },
  {
    "id": 3,
    "title": "Avatar",
    "duration": 162,
    "budget": 237,
    "link": "https://www.imdb.com/title/tt0499549/"
  }
];

// Read all the film from the FILMS
router.get('/', (req, res, next) => {
  console.log('GET /films');
  res.json(FILMS);
});

module.exports = router;
