import {render, RenderPosition, remove} from '../utils/render';
import NoPoints from '../view/no-points';
import SortView from '../view/sort-view';
import ContainerListView from '../view/container-list';
import PointPresenter , {State as PointPresenterViewState} from './point';
import {sortPointUpPrice, sortPointUpTime, sortPointDownDate} from '../utils/point';
import {filter} from '../utils/filters.js';
import PointNewPresenter from './point-new';
import TripHeader from './trip-header';
import LoadingView from '../view/loading.js';
import {toast} from '../utils/toast.js';
import {isOnline} from '../utils/common.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';

export default class Trip {
  constructor(tripContainer, tripHeaderContainer, pointsModel, filterModel, offersModel, destinationsModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._tripHeaderContainer = tripHeaderContainer;
    this._destinationsModel = destinationsModel;
    this._tripContainer = tripContainer;
    this._sortComponent = null;
    this._pointListComponent = new ContainerListView();
    this._noPointsComponent = new NoPoints();
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;
    this._headerPresenter = new TripHeader(tripHeaderContainer, pointsModel, () => this.createPoint());
    this._isLoading = true;
    this._loadingComponent = new LoadingView();
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._pointNewPresenter = new PointNewPresenter(
      this._pointListComponent,
      this._handleViewAction,
      this._offersModel,
      this._destinationsModel);
    this._api = api;
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._headerPresenter.init();
    this._renderTrip();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.update(updateType, response);
          })
          .catch(()=>{
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.add(updateType, response);
          })
          .catch(() => {
            this._pointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.delete(updateType, update);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
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
    remove(this._tripHeaderContainer);
    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getPoints() {
    const filterType = this._filterModel.get();
    const points = this._pointsModel.get();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.PRICE:
        return filtredPoints.sort(sortPointUpPrice);
      case SortType.TIME:
        return filtredPoints.sort(sortPointUpTime);
      case SortType.DAY:
        return filtredPoints.sort(sortPointDownDate);
    }
    return filtredPoints;
  }

  createPoint() {
    if (!isOnline()) {
      toast('You can\'t create new point offline');
      return ;
    }
    this._handleModeChange();
    remove(this._noPointsComponent);
    this._currentSortType = SortType.DAY;
    this._filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init(() => this._headerPresenter.enableNewEventButton());
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();

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

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    const pointsCount = this._pointsModel.get().length;
    if (pointsCount === 0 ){
      this._renderNoPoints();
      this._renderPointList();

      return;
    }
    this._renderSort();
    this._renderPointList();
    this._renderPoints(points);
  }
}
