import AbstractView from './abstract.js';

const createContainerListTemplate = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class ContainerList extends AbstractView {
  getTemplate() {
    return createContainerListTemplate();
  }
}
