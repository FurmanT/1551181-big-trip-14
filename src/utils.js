import dayjs from 'dayjs';
// eslint-disable-next-line no-undef
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);
export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getDuration = (start, end) => {
  const min = end.diff(start, 'minute');
  const day = end.diff(start, 'day');
  const dateTime = dayjs.duration(end.diff(start));
  if (min < 60) {
    return `${min}M` ;
  }
  if (day < 1 ) {
    return `${dateTime.hours()}H ${dateTime.minutes()}M`;
  }
  if  (day >= 1 ) {
    return `${day}D ${dateTime.hours('HH')}H ${dateTime.minutes()}M`;
  }
  return '';
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template;
  return newElement.firstChild;
};
