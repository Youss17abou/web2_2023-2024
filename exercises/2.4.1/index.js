const counterSpan = document.querySelector('span');
const button = document.querySelector('button');
const message = document.querySelector('div');
const maxTime = 5;
let startTime;
let timeReference;

let counter = 0;
let timeOutId;

button.addEventListener('mouseenter', () => {
    startTime = new Date();
    timeReference = setTimeout(printLoss, maxTime * 1000);
})

button.addEventListener('click', (e) => {
    ++counter;
    counterSpan.innerText = counter;
    if (counter === 10) {
        clearTimeout(timeReference);
        win();
    }
})

function printLoss() {
    button.style.display = 'none';
    message.innerHTML = `Game over, you did not click 10 times within ${maxTime}s!
    You clicked ${counter} times`;
}

function win() {
    const timeSpent = new Date().getTime() - startTime.getTime();
    button.style.display = 'none';
    message.innerHTML = `You win ! you clicked 10 times within ${timeSpent}s!`;
}

