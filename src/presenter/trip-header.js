import {remove, render, RenderPosition, replace} from '../utils/render';
import {generateTripInfo} from '../mock/trip-info';
import ContainerTripInfoView from '../view/container-trip-info.js';
import MainTripInfoView from '../view/trip-info-main.js';
import NewEventButtonView from '../view/new-event-button';


export default class TripHeader {
  constructor(container, pointsModel, callbackAddEvent) {
    this._pointsModel = pointsModel;
    this._container = container;
    this._tripInfoComponent = new ContainerTripInfoView();
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
    this._tripInfo = generateTripInfo(this._pointsModel.getPoints());
    if (!this._tripInfo){
      return;
    }

    const prevComponent = this._tripMainInfoComponent;
    this._tripMainInfoComponent = new MainTripInfoView(this._tripInfo);

    if (prevComponent === null) {
      render(this._container, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
      render(this._tripInfoComponent, this._tripMainInfoComponent, RenderPosition.BEFOREEND);
      render(this._container, this._newEventComponent, RenderPosition.BEFOREEND);
      this._newEventComponent.setClickHandler(this._callbackAddEvent);
      return;
    }

    replace(this._tripMainInfoComponent, prevComponent);
    remove(prevComponent);
  }

}
