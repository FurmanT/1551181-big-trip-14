import dayjs from 'dayjs';
// eslint-disable-next-line no-undef
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getDuration = (start, end) => {
  start = dayjs(start);
  end = dayjs(end);
  const min = end.diff(start, 'minute');
  const day = end.diff(start, 'day');
  const dateTime = dayjs.duration(end.diff(start));

  if  (day >= 1 ) {
    return `${day}D ${dateTime.hours('HH')}H ${dateTime.minutes()}M`;
  }
  if (day < 1 ) {
    return `${dateTime.hours()}H ${dateTime.minutes()}M`;
  }
  if (min < 60) {
    return `${min}M` ;
  }

  return '';
};

export const getDurationbyMilisec = (milisec) => {
  const dateObject = dayjs.duration(milisec);
  const day = dateObject.days();
  const min = dateObject.minutes();

  if  (day >= 1 ) {
    return `${day} D ${dateObject.hours('HH')}H ${min}M`;
  }
  if (day < 1 ) {
    return `${dateObject.hours()}H ${dateObject.minutes()}M`;
  }
  if (min < 60) {
    return `${min}M` ;
  }
  return '';
};

export const makeID = (length) => {
  let result  = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const isOnline = () => {
  return window.navigator.onLine;
};
