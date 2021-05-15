import {DESTINATIONS, TYPES } from '../const';
import SmartView from './smart.js';
import dayjs from 'dayjs';
import {getOptionsByType} from '../mock/options';

const BLANK_POINT = {
  type: '',
  options: [],
  destination: {
    name: '',
    description: [],
    photo: [],
  },
  startDate: '',
  endDate: '',
  price: 0,
};

const createPointEditOptionsTemplate = (selectedOptions, typeOptions) => {
  return typeOptions.map((option) => {
    const name = option.title.toLowerCase().replace(/ /g, '-');

    const isChecked = (selectedOptions.findIndex((item) => (
      item.title === option.title))) === -1 ? '' : 'checked';

    return `<div class="event__offer-selector">
     <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-1" type="checkbox"
           name="event-offer-${name}" ${isChecked}>
      <label class="event__offer-label" htmlFor="event-offer-${name}-1">
        <span class="event__offer-title">${option.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${option.price}</span>
      </label>
  </div>`;}).join('');
};

const createEventTypeTemplate = (current) => {
  return TYPES.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
           value="${type.toLowerCase()}" ${current === type ? 'checked' : ''}>
      <label data-type='${type}'  class="event__type-label  event__type-label--${type.toLowerCase()}" htmlFor="event-type-${type}-1">${type}</label>
    </div>`).join('');
};

const createCityTemplate = (current) => {
  return `<input class="event__input  event__input--destination" id="event-destination-1" type="text"
           name="event-destination" value="${current}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${DESTINATIONS.map((destination) => {
    return `<option value="${destination.name}"></option>`;
  }).join('')}
          </datalist>`;
};

const createPointEditTemplate = (point) => {
  const {type, destination, startDate, endDate, price, options, isOption} = point;
  const optionType = getOptionsByType(type);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
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
        value="${startDate ? dayjs(startDate).format('DD/MM/YY HH:mm') : ''}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
        value="${endDate ? dayjs(endDate).format('DD/MM/YY HH:mm') : ''}">
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

    ${isOption ?
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${createPointEditOptionsTemplate(options, optionType)}
        </div>
      </section>` : ''}

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
      </section>
    </section>

    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${destination.pictures ?
    (destination.pictures.map((photo) =>
      `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)) : ''}
      </div>
    </div>
   </form>
</li>`;
};

export default class PointEdit extends SmartView {
  constructor(point = BLANK_POINT) {
    super();
    this._state = PointEdit.parsePointToState(point);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._destinationClickHandler = this._destinationClickHandler.bind(this);
    this._typeClickHandler = this._typeClickHandler.bind(this);
    this._priceClickHandler = this._priceClickHandler.bind(this);
    this._optionChangeHandler = this._optionChangeHandler.bind(this);
    this._setInnerHandlers();
  }

  reset(point) {
    this.updateData(
      PointEdit.parsePointToState(point),
    );
  }

  static parsePointToState(point) {
    return Object.assign(
      {},
      point,
      {
        isOption: point.options.length !== 0,
      },
    );
  }

  static parseStateToPoint(state) {
    state = Object.assign({}, state);
    return state;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseClickHandler(this._callback.closeClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('click', this._typeClickHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._destinationClickHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('change', this._priceClickHandler);
    if (this._state.isOption) {
      this.getElement()
        .querySelector('.event__available-offers')
        .addEventListener('click', this._optionChangeHandler);
    }
  }

  _optionChangeHandler(evt) {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    evt.preventDefault();
    this.optionType = getOptionsByType(this._state.type);
    const selectTitleOption = evt.target.firstElementChild.outerText;
    const selectOption = this.optionType.filter((element) => {
      return element.title === selectTitleOption;
    });
    const cloneOptionsState = []; // новый пустой объект
    const options = Object.assign({}, this._state.options);
    for (const key in options) {
      cloneOptionsState[key] = Object.assign({}, options[key]);
    }
    if (cloneOptionsState.length !== 0){
      const search = cloneOptionsState.findIndex((option) =>(
        option.title === selectOption[0].title));
      if (search === -1) {
        cloneOptionsState.push(selectOption[0]);
      } else {
        cloneOptionsState.splice(search, 1);
      }
    }  else {
      cloneOptionsState.push(selectOption[0]);
    }

    this.updateData({
      options: cloneOptionsState,
    });
  }

  _destinationClickHandler(evt) {
    evt.preventDefault();
    const selectedDestination = DESTINATIONS.find((destination) => destination.name === evt.target.value);
    this.updateData({
      destination: selectedDestination,
    });
  }

  _typeClickHandler(evt) {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    evt.preventDefault();
    this.updateData({
      type: evt.target.dataset.type,
      options: [],
    });
  }

  _priceClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  getTemplate() {
    return createPointEditTemplate(this._state);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseStateToPoint(this._state));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeClickHandler);
  }
}
