import {generateOptions} from './options.js';
import dayjs from 'dayjs';
import {TYPES, CITIES, DESCRIPTION} from '../const';
import {getRandomInteger} from '../utils';

const generateDescription = () => {
  const randomCount = getRandomInteger(1, 5);
  const resultDesciption = [];
  for (let i = 0; i < randomCount; i++) {
    let result = false;
    do {
      const index = getRandomInteger(0, DESCRIPTION.length - 1);
      if (resultDesciption.indexOf(DESCRIPTION[index]) === -1) {
        resultDesciption.push(DESCRIPTION[index]);
        result = true;
      }
    } while (result === false);
  }
  return resultDesciption;
};

const generateCity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);
  return CITIES[randomIndex];
};

const generateType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

const getPhotos = () => {
  return `http://picsum.photos/248/152?r=${Math.random()}`;
};

export const generatePoint = () => {
  const startDate =  dayjs(+(dayjs()) - Math.floor(Math.random()*10000000000));
  const endDate =  dayjs(+(dayjs()) + Math.floor(Math.random()*10000000000));

  return {
    type: generateType(),
    city: generateCity(),
    options: generateOptions(),
    description: generateDescription(),
    photo: getPhotos(),
    startDate,
    endDate,
    isFavorite: Boolean(getRandomInteger(1, 0)),
    price: getRandomInteger(1, 1000),
  };
};
