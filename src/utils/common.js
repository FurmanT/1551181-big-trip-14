import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

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


export const isOnline = () => {
  return window.navigator.onLine;
};
