const express = require('express');
const path = require('path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();
const jsonDbPath = path.join(__dirname, '/../data/films.json');

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

// Read all the film from the films
router.get('/', (req, res) => {
  console.log('GET /films');

  const films = parse(jsonDbPath, FILMS);
  const minimumDuration = req?.query?.['minimum-duration']
    ? Number(req.query['minimum-duration'])
    : undefined;
  if (minimumDuration === undefined) {
    return res.json(films);
  }
  if (typeof minimumDuration !== 'number' || minimumDuration <= 0)
    return res.json('Wrong minimum duration');
  const result = [...films].filter(film => film.duration >= minimumDuration);
  return res.json(result);
});

router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);
  const films = parse(jsonDbPath, FILMS);
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    return res.sendStatus(400); // error code '400 Bad request'
  }

  const indexOfFilmFound = films.findIndex((film) => film.id === id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  return res.json(films[indexOfFilmFound]);
});

router.post('/', (req, res) => {
  console.log('POST /pizzas');
  const films = parse(jsonDbPath, FILMS);

  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? Number(req.body.duration) : undefined;
  const budget = req?.body?.budget?.length !== 0 ? Number(req.body.budget) : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || Number.isNaN(duration) || !budget || Number.isNaN(budget) || !link)
    return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };

  const existingFilm = films.some(
    (film) => film.title.toLowerCase() === newFilm.title.toLowerCase()
  );

  if (existingFilm) return res.sendStatus(409); // error code '409 Conflict'


  films.push(newFilm);
  serialize(jsonDbPath, films);
  return res.json(newFilm);
});

router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);
  const films = parse(jsonDbPath, FILMS);

  const foundIndex = films.findIndex(film => film.id === Number(req.params.id));
  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromFilms = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromFilms[0];

  serialize(jsonDbPath, films);
  return res.json(itemRemoved);
});

router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);
  const films = parse(jsonDbPath, FILMS);

  console.log('POST /pizzas');
  const id = Number(req.params.id);
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
  if (!id || Number.isNaN(id) || !title || !duration || Number.isNaN(duration) || !budget || Number.isNaN(budget) || !link)
    return res.sendStatus(400); // error code '400 Bad request'

  const foundIndex = films.findIndex((film) => film.id === id);
  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = { ...films[foundIndex], ...req.body };
  films[foundIndex] = updatedFilm;
  serialize(jsonDbPath, films);
  return res.json(updatedFilm);
});

router.put('/:id', (req, res) => {
  console.log(`PUT /films/${req.params.id}`);
  const films = parse(jsonDbPath, FILMS);

  const id = Number(req.params.id);
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
  if (!id || Number.isNaN(id) || !title || !duration || Number.isNaN(duration) || !budget || Number.isNaN(budget) || !link)
    return res.sendStatus(400); // error code '400 Bad request'

  const indexOfFilmFound = films.findIndex((film) => film.id === id);

  if (indexOfFilmFound < 0) {
    const newFilm = { id, title, link, duration, budget };
    films.push(newFilm);
    serialize(jsonDbPath, films);
    res.json(newFilm);
  }

  const updatedFilm = { ...films[indexOfFilmFound], ...req.body };

  films[indexOfFilmFound] = updatedFilm;
  serialize(jsonDbPath, films);
  return res.json(updatedFilm);
});

module.exports = router;
