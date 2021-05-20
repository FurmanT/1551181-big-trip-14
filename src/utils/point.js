import dayjs from 'dayjs';

export const sortPointUpPrice = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

export const sortPointUpTime = (pointA, pointB) => {
  return dayjs(pointB.endDate).diff(dayjs(pointB.startDate)) - dayjs(pointA.endDate).diff(dayjs(pointA.startDate));
};

export const sortPointUpDate = (pointA, pointB) => {
  if (pointB === pointA ){
    return 0;
  }
  return dayjs(pointB.startDate).diff(dayjs(pointA.startDate));
};

export const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');
};

export const isPointExpired = (date) => {
  return date === null ? false : dayjs().isAfter(date, 'D');
};
