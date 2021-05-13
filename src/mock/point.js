import {getOptionsByType, generateRandomOptions} from './options.js';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {TYPES, DESTINATIONS} from '../const';
import {getRandomInteger} from '../utils/common';

// const generateDescription = () => {
//   const randomCount = getRandomInteger(1, 5);
//   const resultDesciption = [];
//   for (let i = 0; i < randomCount; i++) {
//     let result = false;
//     do {
//       const index = getRandomInteger(0, DESCRIPTION.length - 1);
//       if (resultDesciption.indexOf(DESCRIPTION[index]) === -1) {
//         resultDesciption.push(DESCRIPTION[index]);
//         result = true;
//       }
//     } while (result === false);
//   }
//   return resultDesciption;
// };

const getDestination = () => {
  const randomIndex = getRandomInteger(0, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndex];
};

const generateType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

export const generatePoint = () => {
  const startDate =  dayjs(+(dayjs()) - Math.floor(Math.random()*10000000000)).format('YYYY-MM-DD HH:mm');
  const endDate =  dayjs(+(dayjs()) + Math.floor(Math.random()*10000000000)).format('YYYY-MM-DD HH:mm');
  const type =  generateType();
  const optionType = getOptionsByType(type);
  const options = generateRandomOptions(optionType);

  return {
    id: nanoid(),
    type,
    options ,
    destination: getDestination(),
    startDate,
    endDate,
    isFavorite: Boolean(getRandomInteger(1, 0)),
    price: getRandomInteger(1, 1000),
  };
};
