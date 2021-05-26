import {render, RenderPosition, remove} from '../utils/render';
import NoPoints from '../view/no-points';
import SortView from '../view/sort';
import ContainerListView from '../view/container-list';
import PointPresenter from './point';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortPointUpPrice, sortPointUpTime, sortPointUpDate} from '../utils/point';
import {filter} from '../utils/filters.js';
import PointNewPresenter from './point-new';

export default class Trip {
  constructor(tripContainer, pointsModel, filterModel, offersModel, destinationsModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._tripContainer = tripContainer;
    this._sortComponent = null;
    this._pointListComponent = new ContainerListView();
    this._noPointsComponent = new NoPoints();
    this._pointPresenter = {};
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._currentSortType = SortType.DAY;
    this._pointNewPresenter = new PointNewPresenter(this._pointListComponent, this._handleViewAction);
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderTrip();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  hideTrip() {
    this._tripContainer.classList.add('trip-events--hidden');
  }

  showTrip(){
    this._tripContainer.classList.remove('trip-events--hidden');
  }

  destroy() {
    this._clearTrip({resetSortType: true});
    remove(this._pointListComponent);
    remove(this._tripContainer);
    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.PRICE:
        return filtredPoints.sort(sortPointUpPrice);
      case SortType.TIME:
        return filtredPoints.sort(sortPointUpTime);
      case SortType.DAY:
        return filtredPoints.sort(sortPointUpDate);
    }
    return filtredPoints;
  }

  createPoint() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init(this._offersModel, this._destinationsModel);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  checkSortType() {
    if (this._currentSortType === SortType.DAY) {
      return;
    }
    this._currentSortType = SortType.DAY;
    this._clearTrip();
    this._renderTrip();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange, this._offersModel, this._destinationsModel);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderPointList() {
    render(this._tripContainer, this._pointListComponent, RenderPosition.BEFOREEND);
  }

  _renderNoPoints() {
    render(this._tripContainer,this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    remove(this._sortComponent);
    remove(this._noPointsComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderTrip() {
    const points = this._getPoints();
    const pointsCount = points.length;

    if (pointsCount === 0 ){
      this._renderNoPoints();
      return;
    }
    this._renderSort();
    this._renderPointList();
    this._renderPoints(points);
  }

}
