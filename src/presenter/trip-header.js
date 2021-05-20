import {render, RenderPosition} from '../utils/render';
import {generateTripInfo} from '../mock/trip-info';
import ContainerTripInfoView from '../view/container-trip-info.js';
import MainTripInfoView from '../view/trip-info-main.js';

export default class TripHeader {
  constructor(container, pointsModel) {
    this._pointsModel = pointsModel;
    this._container = container;
    this._tripInfoComponent = new ContainerTripInfoView();
  }

  init() {
    this._tripInfo = generateTripInfo(this._pointsModel.getPoints());
    this._render();
  }

  _render() {
    if (!this._tripInfo){
      return;
    }
    render(this._container, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, new MainTripInfoView(this._tripInfo), RenderPosition.BEFOREEND);
  }
}
