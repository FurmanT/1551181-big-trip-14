import AbstractView from './abstract.js';

const createMainTripInfoTemplate = (trip) => {
  return `<section class="trip-main__trip-info  trip-info">
             <div class="trip-info__main">
              <h1 class="trip-info__title">${trip.title}</h1>
              <p class="trip-info__dates">${trip.date}</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${trip.price}</span>
            </p>
          </section>`;
};

export default class MainTripInfoView extends AbstractView {
  constructor(trip) {
    super();
    this._trip = trip;
  }

  getTemplate() {
    return createMainTripInfoTemplate(this._trip);
  }


}
