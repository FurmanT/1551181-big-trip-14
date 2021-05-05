import AbstractView from './abstract.js';

const createContainerTripInfo = () => {
  return '<section class="trip-main__trip-info  trip-info"></section>';
};

export default class ContainerTripInfo extends AbstractView {

  getTemplate() {
    return createContainerTripInfo();
  }
}
