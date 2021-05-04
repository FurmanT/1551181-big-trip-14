import {createElement} from '../utils';

const createContainerTripInfo = () => {
  return '<section class="trip-main__trip-info  trip-info"></section>';
};

export default class ContainerTripInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createContainerTripInfo();
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
