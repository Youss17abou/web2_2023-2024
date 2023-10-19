const express = require('express');
const {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updatePartiallyOneFilm,
  updateFullyOneFilm,
} = require('../models/films')


const router = express.Router();



// Read all the film from the films
router.get('/', (req, res) => {
  console.log('GET /films');

  const filmsPotentiallyFiltered = readAllFilms(req?.query?.['minimum-duration']);
  if (!filmsPotentiallyFiltered) {
    return res.sendStatus(400)
  }

  return res.json(filmsPotentiallyFiltered);
});

router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    return res.sendStatus(400); // error code '400 Bad request'
  }
  const result = readOneFilm(id);


  if (!result) return res.sendStatus(404);

  return res.json(result);
});

router.post('/', (req, res) => {
  console.log('POST /Films');

  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? Number(req.body.duration) : undefined;
  const budget = req?.body?.budget?.length !== 0 ? Number(req.body.budget) : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || Number.isNaN(duration) || !budget || Number.isNaN(budget) || !link)
    return res.sendStatus(400); // error code '400 Bad request'

  const createdFilm = createOneFilm(title, duration, budget, link);
  if (!createdFilm) return res.sendStatus(409);


  return res.json(createdFilm);
});

router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.sendStatus(400);

  const result = deleteOneFilm(id);
  if (!result) res.sendStatus(404);

  return res.json(result);
});

router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const id = Number(req.params.id);
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
  if (!id || Number.isNaN(id) || !title || !duration || Number.isNaN(duration) || !budget || Number.isNaN(budget) || !link)
    return res.sendStatus(400); // error code '400 Bad request'

  const result = updatePartiallyOneFilm(id, req.body)
  if (!result) return res.sendStatus(404);

  return res.json(result);
});

router.put('/:id', (req, res) => {
  console.log(`PUT /films/${req.params.id}`);

  const id = Number(req.params.id);
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
  if (!id || Number.isNaN(id) || !title || !duration || Number.isNaN(duration) || !budget || Number.isNaN(budget) || !link)
    return res.sendStatus(400); // error code '400 Bad request'
  const result = updateFullyOneFilm(id, title, duration, budget, link);
  return  res.json(result);
});

module.exports = router;
