import {createElement} from '../utils';

const createMainTripInfoTemplate = (trip) => {
  return `<div class="trip-info__main">
            <h1 class="trip-info__title">${trip.title}</h1>
            <p class="trip-info__dates">${trip.date}</p>
          </div>
          <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${trip.price}</span>
          </p>`;
};

export default class MainTripInfoView {
  constructor(trip) {
    this._trip = trip;
    this._element = null;
  }

  getTemplate() {
    return createMainTripInfoTemplate(this._trip);
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
