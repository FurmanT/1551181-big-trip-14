import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

export const sortPointUpPrice = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

export const sortPointUpTime = (pointA, pointB) => {
  return dayjs(pointB.endDate).diff(dayjs(pointB.startDate)) - dayjs(pointA.endDate).diff(dayjs(pointA.startDate));
};

export const sortPointDownDate = (pointA, pointB) => {
  if (pointA === pointB ){
    return 0;
  }
  return dayjs(pointA.startDate).diff(dayjs(pointB.startDate));
};

export const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');
};

export const isPointExpired = (date) => {
  return date === null ? false : dayjs().isAfter(date, 'D');
};

export const generateTripInfo = (points) => {
  const pointsSort = points.sort(sortPointDownDate);

  if (pointsSort.length === 0 ) {
    return {};
  }

  const title = (pointsSort.length > 3) ?
    pointsSort[0].destination.name + '- ... -' + pointsSort[points.length - 1].destination.name:
    pointsSort.map((point)=> point.destination.name).join('-');

  const price = pointsSort.reduce((sum , point) => {
    const offersPrice = point.options.reduce((accumulator , option) => {
      return accumulator  + Number(option.price);
    }, 0);
    return sum  + Number(point.price) + Number(offersPrice);
  }, 0);
  const date =  dayjs(pointsSort[0].startDate).format('DD MMM') +'-' +  dayjs(pointsSort[points.length - 1].endDate).format('DD MMM');

  return {
    title,
    date,
    price,
  };
};

export const isCheckDate = (dateA, dateB) => {
  return dayjs(dateA).isBefore(dayjs(dateB));
};

export const isPointFuture = (date) => {
  return date === null ? false : dayjs().isSameOrBefore(date, 'D');
};
