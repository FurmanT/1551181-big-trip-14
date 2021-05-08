import {render, RenderPosition} from '../utils/render';
import {generateTripInfo} from '../mock/trip-info';
import ContainerTripInfoView from '../view/container-trip-info.js';
import MainTripInfoView from '../view/trip-info-main.js';

export default class TripHeader {
  constructor(container) {
    this._container = container;
    this._tripInfoComponent = new ContainerTripInfoView();
  }

  init(points) {
    this._tripInfo = generateTripInfo(points);
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
