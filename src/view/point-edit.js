import {TYPES, BLANK_POINT} from '../const';
import SmartView from './smart.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import he from 'he';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import {isCheckDate} from '../utils/point';

const createPointEditOptionsTemplate = (selectedOptions, typeOptions,  isDisabled  ) => {
  return typeOptions.map((option) => {
    const name = option.title.toLowerCase().replace(/\s/g, '-');
    const isChecked = (selectedOptions.length !== 0) ? ((selectedOptions.findIndex((item) => (
      item.title === option.title))) === -1 ? '' : 'checked') : ('');
    return `<div class="event__offer-selector" ${isDisabled ? 'disabled' : ''}>
     <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-1" type="checkbox"
           name="event-offer-${name}" ${isChecked}>
      <label class="event__offer-label" htmlFor="event-offer-${name}-1">
        <span class="event__offer-title">${option.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${option.price}</span>
      </label>
  </div>`;}).join('');
};

const createEventTypeTemplate = (current, isDisabled) => {
  return TYPES.map((type) =>
    `<div class="event__type-item" ${isDisabled ? 'disabled' : ''}>
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
           value="${type.toLowerCase()}" ${current === type ? 'checked' : ''}>
      <label data-type='${type}'  class="event__type-label  event__type-label--${type.toLowerCase()}" htmlFor="event-type-${type}-1">${type}</label>
    </div>`).join('');
};

const createDestinationTemplate = (current, destinations, isDisabled) => {
  return `<input class="event__input  event__input--destination" id="event-destination-1" type="text"
           name="event-destination" value="${current}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
          ${ (destinations.length !== 0) ? (
    `<datalist id="destination-list-1">
                  ${destinations.map((destination) => {
      return `<option value="${destination.name}"></option>`;
    }).join('')}
               </datalist>`) : ''
}
`;
};

const createPointEditTemplate = (point, optionsType, destinations) => {


  const {
    type,
    destination,
    startDate,
    endDate,
    price,
    options,
    isDisabled,
    isSaving,
    isDeleting,
  } = point;

  const isSubmitDisabled = !isCheckDate(startDate, endDate );

  const dateTo =  endDate ? dayjs(endDate).format('DD/MM/YY HH:mm') : '';
  const dateFrom = startDate ? dayjs(startDate).format('DD/MM/YY HH:mm') : '';
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1" ${isDisabled ? 'disabled' : ''}>
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
              ${createEventTypeTemplate(type, isDisabled)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type ? type : ''}
        </label>
          ${createDestinationTemplate(destination.name, destinations, isDisabled)}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time event-start-time-1" id="event-start-time-1" type="text" name="event-start-time"
        value="${he.encode(dateFrom)}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time event-end-time-1" id="event-end-time-1" type="text" name="event-end-time"
        value="${he.encode(dateTo)}" ${isDisabled ? 'disabled' : ''}>
      </div>

      <div class="event__field-group  event__field-group--price" ${isDisabled ? 'disabled' : ''}>
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit"  ${isSubmitDisabled || isDisabled ? 'disabled' : ''} >
        ${isSaving ? 'Saving...' : 'Save'}
      </button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
        ${isDeleting ? 'Deleting...' : 'Delete'}
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">

    ${(optionsType.length !== 0) ?
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${createPointEditOptionsTemplate(options, optionsType,isDisabled)}
        </div>
    </section>`: ''}

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
  constructor(point = BLANK_POINT, offersModel, destinationsModel) {
    super();
    this._state = PointEdit.parsePointToState(point);
    this._initialSelect = point.options;
    this._datepickerFrom = null;
    this._datepickerTo = null;
    this._offersModel = offersModel;
    this._destinations = destinationsModel.getDestinations();
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteHandler = this._formDeleteHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._destinationClickHandler = this._destinationClickHandler.bind(this);
    this._typeClickHandler = this._typeClickHandler.bind(this);
    this._priceClickHandler = this._priceClickHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._setInnerHandlers();
    this._setDatepicker();
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      startDate: dayjs(userDate).format('YYYY-MM-DDTHH:mm') ,
    });
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      endDate: dayjs(userDate).format('YYYY-MM-DDTHH:mm') ,
    });
  }

  _setDatepicker() {
    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }

    if (this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
    }

    this._datepickerFrom = flatpickr(
      this.getElement().querySelector('.event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: (this._state.startDate) ? dayjs(this._state.startDate).toDate() : '',
        onChange: this._startDateChangeHandler,
      },
    );

    this._datepickerTo = flatpickr(
      this.getElement().querySelector('.event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: (this._state.endDate) ? dayjs(this._state.endDate).toDate() : '',
        onChange: this._endDateChangeHandler,
      },
    );

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
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseStateToPoint(state) {
    state = Object.assign({}, state);
    delete state.isDisabled;
    delete state.isSaving;
    delete state.isDeleting;
    return state;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseClickHandler(this._callback.closeClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
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

    if (this._offersModel.getOffers(this._state.type).length !== 0 ){
      this.getElement()
        .querySelector('.event__available-offers')
        .addEventListener('click', this._offersChangeHandler);
    }
  }

  _offersChangeHandler(evt) {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    evt.preventDefault();
    this.optionType = this._offersModel.getOffers(this._state.type);
    const selectTitleOption = evt.target.firstElementChild.outerText;
    const selectOption = this.optionType.filter((element) => {
      return element.title === selectTitleOption;
    });

    const findInInitialOption = this._initialSelect.find((element) => {
      return element.title === selectTitleOption;
    });

    if (findInInitialOption) {
      if (evt.target.previousElementSibling.checked === false  && findInInitialOption){
        return;
      }
    } else {
      this._initialSelect.push( selectOption[0]);
    }

    const cloneOptionsState = [];
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
    const selectedDestination = this._destinations.find((destination) => destination.name === evt.target.value);
    if (!selectedDestination) {
      evt.target.setCustomValidity('Выберите город из списка');
      return;
    }
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
    return createPointEditTemplate(this._state, this._offersModel.getOffers(this._state.type), this._destinations);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseStateToPoint(this._state));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _formDeleteHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEdit.parseStateToPoint(this._state));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteHandler );
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeClickHandler);
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }
}
