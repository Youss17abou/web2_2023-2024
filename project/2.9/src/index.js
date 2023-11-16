import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import grootImage from './img/groot.jpg'

renderPageImage(grootImage);

function renderPageImage(urlImage) {
    const image = new Image();
    image.src = urlImage;
    image.height = 750;
    const main = document.querySelector('main');
    main.appendChild(image);
}
