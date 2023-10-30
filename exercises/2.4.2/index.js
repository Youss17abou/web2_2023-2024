const rouge = document.querySelector('#rouge');
const jaune = document.querySelector('#jaune');
const vert  = document.querySelector('#vert');
let currentColor = 0;

setInterval(printCurrentColor, 2000);
function printCurrentColor() {
    const color = currentColor % 4;
    if (color === 0) {
        console.log('🟥');
        rouge.style.backgroundColor = 'red';
        jaune.style.backgroundColor = '';
    }
    if (color === 1) {
        console.log('🟨');
        jaune.style.backgroundColor = 'yellow';
        rouge.style.backgroundColor = '';
    }
    if (color === 2) {
        console.log('🟩');
        vert.style.backgroundColor = 'green';
        jaune.style.backgroundColor = '';
    }
    if (color === 3) {
        console.log('🟨');
        jaune.style.backgroundColor = 'yellow';
        vert.style.backgroundColor = '';
    }
    currentColor++;
}