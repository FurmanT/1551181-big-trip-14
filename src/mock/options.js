import {getRandomInteger} from '../utils/common';
import {OPTIONS} from '../const';

export const generateRandomOptions = (OPTIONBYTYPE) => {
  const countOptions = getRandomInteger(0, OPTIONBYTYPE.length - 1  );
  if (!countOptions) {return [];}
  const resultOptions = [];
  for (let i = 0; i < countOptions; i++) {
    let result = false;
    do {
      const index = getRandomInteger(1, countOptions );
      if ( !resultOptions.includes(OPTIONBYTYPE[index])) {
        resultOptions.push(OPTIONBYTYPE[index]);
        result = true;
      }
    } while (result === false);
  }
  return resultOptions;
};

export const getOptionsByType = (type) => {
  for (let i = 0; i < OPTIONS.length; i++) {
    if ( OPTIONS[i].type === type) {
      return OPTIONS[i].offers;
    }
  }
  return [];
};
