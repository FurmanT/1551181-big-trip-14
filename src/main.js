import SiteMenuView from './view/site-menu.js';
import NewEventButtonView from './view/new-event-button.js';
import {render, RenderPosition} from './utils.js';
import ContainerListView from './view/container-list.js';
import SortView from './view/sort.js';
import FilterView from './view/filter.js';
import ContainerTripInfoView from './view/container-trip-info.js';
import MainTripInfoView from './view/trip-info-main.js';
import {generateTripInfo} from './mock/trip-info';
import PointView from './view/point.js';
import PointEditView from './view/point-edit.js';
import {generatePoint} from './mock/point';

const POINT_COUNT = 4;
const points = Array(POINT_COUNT).fill().map(generatePoint);

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripControlElements = tripMainElement.querySelector('.trip-controls');
const siteMenuElement = tripControlElements.querySelector('.trip-controls__navigation');
const siteFilterElement = tripControlElements.querySelector('.trip-controls__filters');


const renderPoint = (poinListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replaceCardToForm = () => {
    poinListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToCard = () => {
    poinListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };
  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
  });
  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });
  render(poinListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

const tripMainInfo = generateTripInfo(points);
render(tripMainElement, new ContainerTripInfoView().getElement(), RenderPosition.AFTERBEGIN);
const tripInfoElement = tripMainElement.querySelector('.trip-info');

render(tripInfoElement, new MainTripInfoView(tripMainInfo).getElement(), RenderPosition.BEFOREEND);
render(tripMainElement, new NewEventButtonView().getElement(), RenderPosition.BEFOREEND);
render(siteFilterElement, new FilterView().getElement(),RenderPosition.BEFOREEND);
render(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const containerList = new ContainerListView();
render(tripEventsElement , containerList.getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < POINT_COUNT; i++) {
  renderPoint(containerList.getElement(), points[i]);
}

