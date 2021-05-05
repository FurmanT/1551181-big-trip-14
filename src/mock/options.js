import {getRandomInteger} from '../utils/common';
import {OPTIONS} from '../const';

export const generateOptions = () => {
  const countOptions = getRandomInteger(0, 5);
  if (!countOptions) {return [];}
  const resultOptions = [];
  for (let i = 0; i < countOptions; i++) {
    let result = false;
    do {
      const index = getRandomInteger(0, OPTIONS.length - 1);
      if ( !resultOptions.includes(OPTIONS[index].id)) {
        resultOptions.push(OPTIONS[index].id);
        result = true;
      }
    } while (result === false);
  }
  return resultOptions;
};
