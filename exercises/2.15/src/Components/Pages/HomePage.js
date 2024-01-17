import { clearPage } from "../../utils/render";

const HomePage = () => {
  clearPage();
/* eslint-disable linebreak-style */
const main = document.querySelector('main');

// Fetch a joke from JokeAPI
fetch('https://v2.jokeapi.dev/joke/Any?type=single')
  .then((response) => response.json())
  .then((data) => {
    // Display the joke and its category
    const jokeText = document.createElement('p');
    jokeText.textContent = `Joke :${data.joke}`;
    main.appendChild(jokeText);

    const jokeCategory = document.createElement('p');
    jokeCategory.textContent = `Category: ${data.category}`;
    main.appendChild(jokeCategory);
  })
  .catch((error) => console.error('Error fetching joke:', error));

};

export default HomePage;