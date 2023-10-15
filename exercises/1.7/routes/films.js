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
  const minimumDuration = req?.query?.['minimum-duration']
    ? Number(req.query['minimum-duration'])
    : undefined;
  if (minimumDuration === undefined) {
    return res.json(FILMS);
  }
  if (typeof minimumDuration !== 'number' || minimumDuration <= 0)
    return res.json('Wrong minimum duration');
  let result = [...FILMS].filter(film => film.duration >= minimumDuration);
  return res.json(result);
});

router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);
  const indexOfFilmFound = FILMS.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  res.json(FILMS[indexOfFilmFound]);
});

router.post('/', (req, res) => {
  console.log('POST /pizzas');
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link)
    return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };

  const existingFilm = FILMS.some(
    (film) => {
      return film.title.toLowerCase() == newFilm.title.toLowerCase()
    }
  );

  if (existingFilm) return res.sendStatus(409); // error code '409 Conflict'


  FILMS.push(newFilm);
  return res.json(newFilm);
});

router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);
  const foundIndex = FILMS.findIndex(film => film.id == req.params.id);
  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromFilms = FILMS.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromFilms[0];

  res.json(itemRemoved);
});

router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  console.log('POST /pizzas');
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link)
    return res.sendStatus(400); // error code '400 Bad request'

  const foundIndex = FILMS.findIndex(film => film.id == req.params.id);
  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = { ...FILMS[foundIndex], ...req.body };
  FILMS[foundIndex] = updatedFilm;
  res.json(updatedFilm);
});

router.put('/:id', (req, res) => {
  console.log(`PUT /films/${req.params.id}`);

  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
  if (!title || !duration || !budget || !link)
    return res.sendStatus(400); // error code '400 Bad request'
  
  const id = req.params.id;
  const indexOfFilmFound = FILMS.findIndex((film) => film.id == id);

  if (indexOfFilmFound < 0) {
    const newFilm = { id, title, link, duration, budget };
    FILMS.push(newFilm);
    return res.json(newFilm);
  }

  const updatedFilm = { ...FILMS[indexOfFilmFound], ...req.body };

  FILMS[indexOfFilmFound] = updatedFilm;
  return res.json(updatedFilm);
});

module.exports = router;
