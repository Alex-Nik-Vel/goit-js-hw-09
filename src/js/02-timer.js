// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
// импорт библиотеки уведомлений
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {dataTimeInputEl: document.querySelector('#datetime-picker'),
 dataBtnStartEl:  document.querySelector('[data-start]'),
 daysEl: document.querySelector('[data-days]'),
 hoursEl: document.querySelector('[data-hours]'),
 minutesEl: document.querySelector('[data-minutes]'),
 secondsEl: document.querySelector('[data-seconds]'),
}
 
// variable to write the selected date in ms
let finishTimeCount = 0;
// countdown record
let countDown = null;
// record time difference
let difference = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        //  приводимо обрану дату в ms та записуємо у змінну
        finishTimeCount = selectedDates[0].getTime();
        refs.dataBtnStartEl.disabled = false;
        //   if data corrected => btn START disabled and show notice
        if (finishTimeCount < Date.now()) {
            refs.dataBtnStartEl.setAttribute('disabled', true);
            Notify.failure('Please choose a date in the future');
        }
    },
};
 
refs.dataBtnStartEl.addEventListener('click', onBtnStart);

updateCountValue();
flatpickr( refs.dataTimeInputEl, options);

// to start and record the countdown time
function onBtnStart(evt) {
    console.log('onBtnStart', evt);
  countDown = setInterval(updateCountValue, 1000);
  refs.dataBtnStartEl.setAttribute('disabled', true);
  Notify.success('The countdown has begun!');
};

//  calculate time difference and output per page
function updateCountValue() {
  const nowTime = new Date().getTime();
  difference = finishTimeCount - nowTime;

  if (difference < 0) {
    refs.dataBtnStartEl.setAttribute('disabled', true);
    clearInterval(countDown);
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(difference);

  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

// функція конвертаціЇ дати
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//якщо число < 2-х знаків, приймає число, призводить до рядка і додає на початок 0
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

