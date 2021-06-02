import {generateTripInfo} from '../utils/point';
import MainTripInfoView from '../view/trip-info-main-view.js';
import NewEventButtonView from '../view/new-event-button';
import {remove, render, RenderPosition, replace} from '../utils/render';


export default class TripHeader {
  constructor(container, pointsModel, callbackAddEvent) {
    this._pointsModel = pointsModel;
    this._container = container;
    this._newEventComponent = null;
    this._tripMainInfoComponent = null;
    this._callbackAddEvent = callbackAddEvent;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  _handleModelEvent() {
    this.init();
  }

  init() {
    if (this._newEventComponent === null) {
      this._newEventComponent = new NewEventButtonView();
      render(this._container, this._newEventComponent, RenderPosition.BEFOREEND);
      this._newEventComponent.setClickHandler(this._callbackAddEvent);
    }

    this._tripInfo = generateTripInfo(this._pointsModel.get().slice());
    const prevComponent = this._tripMainInfoComponent;
    if (Object.keys(this._tripInfo).length === 0){
      if (prevComponent !== null) {
        remove(prevComponent);
        this._tripMainInfoComponent = null;
      }
      return;
    }

    this._tripMainInfoComponent = new MainTripInfoView(this._tripInfo);
    if (prevComponent === null) {
      render(this._container, this._tripMainInfoComponent, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this._tripMainInfoComponent, prevComponent);
    remove(prevComponent);
  }

  enableNewEventButton() {
    this._newEventComponent.enableButton();
  }
}
