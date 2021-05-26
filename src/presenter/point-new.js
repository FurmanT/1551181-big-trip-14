import PointEditView from '../view/point-edit.js';
import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';
import { TYPES } from '../const';

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._offersModel = null;
  }

  _handleModelEvent() {
    this.init(this._offersModel);
  }

  init(offersModel) {
    if (this._pointEditComponent !== null) {
      return;
    }
    this._offersModel  = offersModel;
    this._pointEditComponent = new PointEditView({
      type: TYPES[0],
      options: [],
      destination: {
        name: '',
        description: [],
        photo: [],
      },
      startDate: '',
      endDate: '',
      price: 0,
    },  this._offersModel);

    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._pointEditComponent.setCloseClickHandler(this._handleCloseClick);
    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._offersModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }
    this._offersModel.removeObserver(this._handleModelEvent);
    remove(this._pointEditComponent);
    this._pointEditComponent = null;
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      Object.assign({id: nanoid()}, point),
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _handleCloseClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
