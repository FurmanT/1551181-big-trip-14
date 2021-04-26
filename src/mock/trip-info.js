import dayjs from 'dayjs';

export const generateTripInfo = (points) => {
  const title = (points.length <= 3) ?
    points.map((point)=> point.city).join('-') :
    points[0].city + '- ... -' + points[points.length - 1].city;


  const price = points.reduce((sum , point) => {
    return sum  + point.price;
  }, 0);

  const date =  dayjs(points[0].startDate).format('DD MMM') +'-' +  dayjs(points[points.length - 1].endDate).format('DD MMM');

  return {
    title,
    date,
    price,
  };
};
