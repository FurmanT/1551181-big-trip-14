import {createElement} from '../utils';

const createContainerListTemplate = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class  ContainerList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createContainerListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
