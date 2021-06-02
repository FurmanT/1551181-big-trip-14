import {remove, render, RenderPosition, replace} from '../utils/render';
import StatisticsView from '../view/statistics';

export default class Statistics {
  constructor(container, pointsModel) {
    this._pointsModel = pointsModel;
    this._container = container;
    this._statisticsComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  _handleModelEvent() {
    this.init();
    this.hide();
  }

  init() {
    const prevComponent = this._statisticsComponent;
    const points =  this._pointsModel.get().slice();
    if (Object.keys(points).length === 0){
      if (prevComponent !== null) {
        remove(prevComponent);
        this._statisticsComponent = null;
      }
      return;
    }

    this._statisticsComponent = new StatisticsView(points);
    if (prevComponent === null) {
      render(this._container, this._statisticsComponent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._statisticsComponent, prevComponent);
    remove(prevComponent);
  }

  show() {
    if (this._statisticsComponent!== null)  {
      this._statisticsComponent.show();
    }
  }

  hide() {
    if (this._statisticsComponent !== null)  {
      this._statisticsComponent.hide();
    }
  }
}
