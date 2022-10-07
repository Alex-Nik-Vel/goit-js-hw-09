//Напиши скрипт, который после нажатия кнопки «Start», 
// раз в секунду меняет цвет фона < body > на случайное значение используя инлайн стиль. 
// При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

const refs =  { bodyEl: document.querySelector('body'),
 startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
}
 
const TIME_BGRC = 1000;
let timerId = null;

// button event listeners
refs.startBtn.addEventListener('click', onClickStartBtn);
refs.stopBtn.addEventListener('click', onClickStopBtn);

// Button Stop -- disabled active
refs.stopBtn.setAttribute('disabled', true);

function onClickStartBtn() {
  console.log('start');
  // change color body
  timerId = setInterval(() => { refs.bodyEl.style.backgroundColor = getRandomHexColor() },
    TIME_BGRC); 
  refs.stopBtn.removeAttribute('disabled');
  refs.startBtn.setAttribute('disabled', true);  
}

function onClickStopBtn() {
  console.log('stop');
  clearInterval(timerId);
  refs.stopBtn.setAttribute('disabled', true);
  refs.startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}