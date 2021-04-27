import {CITIES, TYPES, OPTIONS} from '../const';

const createPointEditOptionsTemplate = (currentOptions) => {
  return OPTIONS.map((option)=>
    `<div class="event__offer-selector">
     <input class="event__offer-checkbox  visually-hidden" id="event-offer-${option.name}-1" type="checkbox"
           name="event-offer-${option.name}" ${(currentOptions.indexOf(option.id) === -1 ? '' : 'checked')}>
      <label class="event__offer-label" htmlFor="event-offer-${option.name}-1">
        <span class="event__offer-title">${option.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${option.price}</span>
      </label>
  </div>` ).join('');
};

const createEventTypeTemplate = (current) => {
  return TYPES.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
           value="${type.toLowerCase()}" ${current === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" htmlFor="event-type-${type}-1">${type}</label>
    </div>`).join('');
};

const createCityTemplate = (current) => {
  return `<input class="event__input  event__input--destination" id="event-destination-1" type="text"
           name="event-destination" value="${current}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${CITIES.map((city) => {
    return `<option value="${city}"></option>`;
  }).join('')}
          </datalist>`;
};

export const createPointEditTemplate = (point = {}) => {
  const {
    type = '',
    options = [],
    destination = {
      name: '',
      description: [],
      photo: [],
    },
    startDate = '',
    endDate = '',
    price = 0,
  } = point;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
              ${createEventTypeTemplate(type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type ? type : ''}
        </label>
          ${createCityTemplate(destination.name)}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
        value="${startDate ? startDate.format('DD/MM/YY HH:mm') : ''}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate ? endDate.format('DD/MM/YY HH:mm') : ''}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
            ${createPointEditOptionsTemplate(options)}
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
      </section>
    </section>

    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${destination.photos ?
    (destination.photos.map((photo) =>
      `<img class="event__photo" src="${photo}" alt="Event photo">`)) : ''}
      </div>
    </div>
   </form>
</li>`;
};
