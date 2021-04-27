import dayjs from 'dayjs';

export const generateTripInfo = (points) => {
  const title = (points.length <= 3) ?
    points.map((point)=> point.destination.name).join('-') :
    points[0].destination.name + '- ... -' + points[points.length - 1].destination.name;


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
