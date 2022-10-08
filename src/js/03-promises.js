// Напиши скрипт, который при сабмите формы вызывает функцию 
// createPromise(position, delay) столько раз, сколько ввели в поле amount.
// При каждом вызове передай ей номер создаваемого промиса(position)
// и задержку учитывая введенную пользователем первую задержку(delay) и шаг(step).

import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  formEl: document.querySelector('.form'),
  inputDelay: document.querySelector('[name=delay]'),
  inputStep: document.querySelector('[name=step]'),
  inputAmount: document.querySelector('[name=amount]'),
}

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('EVT', evt);
  // console.log('EVT Target', evt.target);
  // console.log('evt.currentTarget', evt.currentTarget);
  // console.log('refs.inputStep.value', refs.inputStep.value);
  // console.log('refs.inputDelay.value', refs.inputDelay.value);

  // let delay = Number(evt.currentTarget.delay.value);
  // const step = Number(evt.currentTarget.step.value);
  // const amount = Number(evt.currentTarget.amount.value);

  let delay = Number(refs.inputDelay.value);
  const step = Number(refs.inputStep.value);
  const amount = Number(refs.inputAmount.value);
  
  console.log('delay', delay)
  console.log('step', step)
  console.log('amount', amount)

  for (let position = 1; position <= amount; position+=1) {
    delay += step;
    createPromise(position, delay)
      .then(({ position, delay }) =>
      setTimeout(() => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }, delay))
      .catch(({ position, delay }) =>
      setTimeout(() => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,
          { useIcon: false });
      }, delay));
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objectPromise = { position, delay };

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(objectPromise);
    }
    reject(objectPromise);
  });  
}