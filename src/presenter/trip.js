import {render, RenderPosition} from '../utils/render';
import NoPoints from '../view/no-points';
import SortView from '../view/sort';
import ContainerListView from '../view/container-list';
import PointPresenter from './point';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';
import {sortPointUpPrice, sortPointUpTime} from '../utils/point';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._sortComponent = new SortView();
    this._pointListComponent = new ContainerListView();
    this._noPointsComponent = new NoPoints();
    this._pointPresenter = {};
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._currentSortType = SortType.DAY;
  }

  init(points) {
    this._points = points.slice();
    this._sourcedTripPoint = points.slice();
    this._renderTrip();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._points.sort(sortPointUpPrice);
        break;
      case SortType.TIME:
        this._points.sort(sortPointUpTime);
        break;
      case SortType.DAY:
        this._points = this._sourcedTripPoint;
        break;
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortTasks(sortType);
    this._clearPointList();
    this._renderPoints();
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    for (let i = 0; i <= this._points.length - 1; i++) {
      this._renderPoint(this._points[i]);
    }
  }

  _renderPointList() {
    render( this._tripContainer,  this._pointListComponent, RenderPosition.BEFOREEND);
  }

  _renderNoPoints() {
    render(this._tripContainer,this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._points.length === 0 ){
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPointList();
    this._renderPoints();
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }
}
