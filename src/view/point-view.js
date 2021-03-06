import OptionsView from '../view/options.js';
import {getDuration} from '../utils/common';
import AbstractView from './abstract.js';
import dayjs from 'dayjs';

const createPointTemplate = (point) => {
  const { startDate, endDate, type, destination , price,  options, isFavorite } = point;
  const templateOptions = options.reduce((result, currentValue) =>  {
    return result + new OptionsView(currentValue).getTemplate();
  }, '');
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active': '';
  const duration = getDuration(startDate, endDate);

  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="${dayjs(startDate).format('YYYY-MM-DD')}">${dayjs(startDate).format('MMM DD')}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42"  src="img/icons/${type}.png"  alt="Event type icon">
              </div>
              <h3 class="event__title">${type} ${destination.name}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${dayjs(startDate).format('DD/MM/YYYY HH:mm')}">${dayjs(startDate).format('HH:mm')}</time>
                   &mdash;
                  <time class="event__end-time" datetime="${dayjs(endDate).format('DD/MM/YYYY HH:mm')}">${dayjs(endDate).format('HH:mm')}</time>
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

export default class PointView extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
    this._pointEditClickHandler = this._pointEditClickHandler.bind(this);
    this._pointFavoriteClickHandler = this._pointFavoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  _pointEditClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._pointEditClickHandler);
  }

  _pointFavoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._pointFavoriteClickHandler);
  }
}
