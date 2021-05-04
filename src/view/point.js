import {OPTIONS} from '../const';
import { createOptionTemplate} from '../view/options.js';
import {createElement, getDuration} from '../utils';

const createPointTemplate = (point) => {
  const { startDate, endDate, type, destination , price,  options, isFavorite } = point;
  const currentOptions = OPTIONS.filter((value )=>(options.indexOf(value.id) !== -1), options);
  const templateOptions = currentOptions.reduce((result, currentValue) =>  {
    return result + createOptionTemplate(currentValue);
  }, '');
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active': '';
  const duration = getDuration(startDate, endDate);

  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="${startDate.format('YYYY-MM-DD')}">${startDate.format('MMM DD')}</time>
              <div class="event__type">
              ${(destination.photos) ? `<img class="event__type-icon" width="42" height="42" src="${destination.photos[0]}" alt="Event type icon">`: '' }
              </div>
              <h3 class="event__title">${type} ${destination.name}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${startDate.format('DD/MM/YYYY H:mm')}">${startDate.format('HH:mm')}</time>
                   &mdash;
                  <time class="event__end-time" datetime="${endDate.format('DD/MM/YYYY H:mm')}">${endDate.format('HH:mm')}</time>
                </p>
                <p class="event__duration">${duration}</p>
              </div>
              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${price}</span>
              </p>
              <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${templateOptions}
                </ul>
                <button class="event__favorite-btn ${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class PointView {
  constructor(point) {
    this._element = null;
    this._point = point;
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
