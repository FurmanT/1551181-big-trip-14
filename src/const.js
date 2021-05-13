export const DESTINATIONS = [
  { description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      }],
  },
  { description: 'Barcelona, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Barcelona',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.111111111111111',
        description: 'Barcelona parliament building',
      }],
  },
  { description: 'Santorini, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Santorini',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.222222222222222',
        description: 'Santorini parliament building',
      }],
  },
  { description: 'Heraklion, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Heraklion',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.231334444444444',
        description: 'Heraklion parliament building',
      }],
  },
  { description: 'Rim, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Rim',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.2313342344444444',
        description: 'Rim parliament building',
      }],
  },
];

export const OPTIONS =[
  {
    'type': 'taxi',
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 120,
      },
      {
        'title': 'Choose the radio station',
        'price': 60,
      },
      {
        'title': 'Add luggage',
        'price': 30,
      },
    ],
  },
  {
    'type': 'flight',
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 120,
      },
      {
        'title': 'Switch to comfort',
        'price': 120,
      },
      {
        'title': 'Add meal',
        'price': 15,
      },
    ],
  },
  {
    'type': 'ship',
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 80,
      },
      {
        'title': 'Add luggage',
        'price': 30,
      },
    ],
  },
  {
    'type': 'bus',
    'offers': [
      {
        'title': 'Choose seats',
        'price': 5 ,
      },
      {
        'title': 'Add luggage',
        'price': 30 ,
      },
    ],
  },
  {
    'type': 'train',
    'offers': [
      {
        'title': 'Choose seats',
        'price': 5,
      },
      {
        'title': 'Add meals',
        'price': 15,
      },
      {
        'title': 'Add luggage',
        'price': 30,
      },
    ],
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'title': 'Choose seats',
        'price': 5,
      },
    ],
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'title': 'Travel by train',
        'price': 40,
      },
    ],
  },
  {
    'type': 'drive',
    'offers': [
      {
        'title': 'Choose seats',
        'price': 5,
      },
      {
        'title': 'Add luggage',
        'price': 30,
      },
    ],
  },
];

export const TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
export const  DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ' ,
  'Sed sed nisi sed augue convallis suscipit in sed felis. ',
  'Aliquam erat volutpat. ',
  'Nunc fermentum tortor ac porta dapibus. ' ,
  'In rutrum ac purus sit amet tempus.',
];

export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};
