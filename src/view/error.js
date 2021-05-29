import AbstractView from './abstract.js';

const createErrorTemplate = () => {
  return '<p class="trip-events__msg">Приложение временно недоступно...</p>';
};

export default class Loading extends AbstractView {
  getTemplate() {
    return createErrorTemplate();
  }
}
