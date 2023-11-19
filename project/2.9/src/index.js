import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import grootImage from './img/groot.jpg';



document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour générer le contenu de la HomePage
    function generateHomePage() {
        const homeContent = document.createElement('div');
        homeContent.id = 'homeContent';

        const title = document.createElement('h1');
        title.textContent = "Bienvenue sur la HomePage";
        homeContent.appendChild(title);

        const aboutButton = document.createElement('button');
        aboutButton.textContent = "About";
        aboutButton.addEventListener('click', showAbout);
        homeContent.appendChild(aboutButton);

        document.querySelector('main').appendChild(homeContent);
        renderPageImage(grootImage); // Appelle directement la fonction pour ajouter l'image
    }

    // Fonction pour générer le contenu "About"
    function generateAboutContent() {
        const aboutContent = document.createElement('div');
        aboutContent.id = 'aboutContent';
        aboutContent.style.display = 'none';

        const title = document.createElement('h1');
        title.textContent = "À propos de l'application";
        aboutContent.appendChild(title);

        const aboutText = document.createElement('p');
        aboutText.textContent = "Ce projet a été développé par [Nom de l'auteur] et [Nom du deuxième auteur].";
        aboutContent.appendChild(aboutText);

        const backButton = document.createElement('button');
        backButton.textContent = "Back";
        backButton.addEventListener('click', showHome);
        aboutContent.appendChild(backButton);

        document.querySelector('main').appendChild(aboutContent);
    }

    // Fonction pour afficher le contenu "About"
    function showAbout() {
        document.getElementById('homeContent').style.display = 'none';
        document.getElementById('aboutContent').style.display = 'block';
    }

    // Fonction pour afficher le contenu de la HomePage
    function showHome() {
        document.getElementById('homeContent').style.display = 'block';
        document.getElementById('aboutContent').style.display = 'none';
    }

    function renderPageImage(urlImage) {
        const image = new Image();
        image.src = urlImage;
        image.height = 750;
        image.classList.add('bottom-image'); // Ajoute la classe 'bottom-image'
        const main = document.querySelector('main');
        main.appendChild(image);
    }

    // Appel des fonctions pour générer le DOM initial
    generateHomePage();
    generateAboutContent();
});
