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

export const generateTripInfo = (points) => {
  if (points.length === 0 ) return {};
  const title = (points.length <= 3) ?
    points.map((point)=> point.destination.name).join('-') :
    points[0].destination.name + '- ... -' + points[points.length - 1].destination.name;

  const price = points.reduce((sum , point) => {
    const offersPrice = point.options.reduce((accumulator , option) => {
      return accumulator  + Number(option.price);
    }, 0);
    return sum  + Number(point.price) + Number(offersPrice);
  }, 0);

  const date =  dayjs(points[0].startDate).format('DD MMM') +'-' +  dayjs(points[points.length - 1].endDate).format('DD MMM');

  return {
    title,
    date,
    price,
  };
};


export const isCheckDate = (dateA, dateB) => {
  return dayjs(dateA).isBefore(dayjs(dateB));
};
