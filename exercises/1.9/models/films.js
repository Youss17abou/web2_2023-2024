const path = require('path');
const { serialize, parse } = require('../utils/json');

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

function readAllFilms(duration) {
    const films = parse(jsonDbPath, FILMS);
    const minimumDuration = duration
        ? Number(duration)
        : undefined;
    if (minimumDuration === undefined) {
        return films;
    }
    if (typeof minimumDuration !== 'number' || minimumDuration <= 0)
        return undefined;
    const result = [...films].filter(film => film.duration >= minimumDuration);
    return result;
}

function readOneFilm(idFilm) {
    const films = parse(jsonDbPath, FILMS);

    const id = Number(idFilm)
    const indexOfFilmFound = films.findIndex((film) => film.id === id);

    if (indexOfFilmFound < 0) return undefined;

    return films[indexOfFilmFound]
};

function createOneFilm(title, duration, budget, link) {
    const films = parse(jsonDbPath, FILMS);
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
    if (existingFilm) return undefined;

    films.push(newFilm);
    serialize(jsonDbPath, films);
    return newFilm;
}

function deleteOneFilm(id) {
    const films = parse(jsonDbPath, FILMS);

    const foundIndex = films.findIndex(film => film.id === id);
    if (foundIndex < 0) return undefined;

    const itemsRemovedFromFilms = films.splice(foundIndex, 1);
    const itemRemoved = itemsRemovedFromFilms[0];

    serialize(jsonDbPath, films);
    return itemRemoved;
}

function updatePartiallyOneFilm(id, updatedFilm) {
    const films = parse(jsonDbPath, FILMS);

    const foundIndex = films.findIndex((film) => film.id === id);
    if (foundIndex < 0) return undefined;

    const result = { ...films[foundIndex], ...updatedFilm };
    films[foundIndex] = result;
    serialize(jsonDbPath, films);
    return result;
}

function updateFullyOneFilm(id, title, duration, budget, link) {
    const films = parse(jsonDbPath, FILMS);
    const newFilm = { id, title, duration, budget, link };

    const indexOfFilmFound = films.findIndex((film) => film.id === id);
    if (indexOfFilmFound < 0) {
        films.push(newFilm);
    } else {
        films[indexOfFilmFound] = newFilm;
    }

    serialize(jsonDbPath, films);
    return newFilm;
}

module.exports = {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updatePartiallyOneFilm,
    updateFullyOneFilm,

};