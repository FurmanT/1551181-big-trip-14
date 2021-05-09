import dayjs from 'dayjs';

export const sortPointUpPrice = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

export const sortPointUpTime = (pointA, pointB) => {
  return dayjs(pointB.endDate).diff(dayjs(pointB.startDate)) - dayjs(pointA.endDate).diff(dayjs(pointA.startDate));
};

