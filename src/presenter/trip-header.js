import {remove, render, RenderPosition, replace} from '../utils/render';
import {generateTripInfo} from '../utils/point';
import MainTripInfoView from '../view/trip-info-main.js';
import NewEventButtonView from '../view/new-event-button';


export default class TripHeader {
  constructor(container, pointsModel, callbackAddEvent) {
    this._pointsModel = pointsModel;
    this._container = container;
    this._newEventComponent = new NewEventButtonView();
    this._tripMainInfoComponent = null;
    this._callbackAddEvent = callbackAddEvent;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  _handleModelEvent() {
    this.init();
  }

  init() {
    const prevComponent = this._tripMainInfoComponent;
    this._tripInfo = generateTripInfo(this._pointsModel.getPoints());
    if (Object.keys(this._tripInfo).length === 0){
      if (prevComponent !== null) {
        remove(prevComponent);
      }

      render(this._container, this._newEventComponent, RenderPosition.BEFOREEND);
      this._newEventComponent.setClickHandler(this._callbackAddEvent);
      return;
    }
    this._tripMainInfoComponent = new MainTripInfoView(this._tripInfo);
    if (prevComponent === null) {
      render(this._container, this._tripMainInfoComponent, RenderPosition.AFTERBEGIN);
      render(this._container, this._newEventComponent, RenderPosition.BEFOREEND);
      this._newEventComponent.setClickHandler(this._callbackAddEvent);
      return;
    }
    replace(this._tripMainInfoComponent, prevComponent);
    remove(prevComponent);
  }

  enableNewEventButton() {
    this._newEventComponent.enableButton();
  }
}
