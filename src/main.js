import SiteMenuView from './view/site-menu.js';
import NewEventButtonView from './view/new-event-button.js';
import {render, RenderPosition} from './utils.js';
import ContainerListView from './view/container-list.js';
import SortView from './view/sort.js';
import FilterView from './view/filter.js';
import ContainerTripInfoView from './view/container-trip-info.js';
import MainTripInfoView from './view/trip-info-main.js';
import NoPoints from './view/no-points.js';
import {generateTripInfo} from './mock/trip-info';
import PointView from './view/point.js';
import PointEditView from './view/point-edit.js';
import {generatePoint} from './mock/point';

const POINT_COUNT = 40;
const points = Array(POINT_COUNT).fill().map(generatePoint);
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripControlElements = tripMainElement.querySelector('.trip-controls');
const siteMenuElement = tripControlElements.querySelector('.trip-controls__navigation');
const siteFilterElement = tripControlElements.querySelector('.trip-controls__filters');
let elementPoint;

const replaceElement = (container, newElement, curElement) => {
  container.replaceChild(newElement, curElement);
};

render(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(tripMainElement, new NewEventButtonView().getElement(), RenderPosition.BEFOREEND);
render(siteFilterElement, new FilterView().getElement(),RenderPosition.BEFOREEND);

if (points.length === 0 ){
  render(tripEventsElement, new NoPoints().getElement(), RenderPosition.BEFOREEND);
} else {
  const tripMainInfo = generateTripInfo(points);
  render(tripMainElement, new ContainerTripInfoView().getElement(), RenderPosition.AFTERBEGIN);
  const tripInfoElement = tripMainElement.querySelector('.trip-info');
  render(tripInfoElement, new MainTripInfoView(tripMainInfo).getElement(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);
}

const containerList = new ContainerListView();
render(tripEventsElement , containerList.getElement(), RenderPosition.BEFOREEND);

const replaceToForm = () => {
  if (elementPoint) {
    const form = containerList.getElement().querySelector('form');
    const li = form.closest('.trip-events__item');
    replaceElement(containerList.getElement(), elementPoint , li);
    elementPoint = null;
  }
};

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    replaceToForm();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const renderPoint = (poinListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceToForm();
    elementPoint = pointComponent.getElement();
    replaceElement(poinListElement, pointEditComponent.getElement(), pointComponent.getElement());
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    replaceElement(poinListElement, pointComponent.getElement(), pointEditComponent.getElement());
    elementPoint = null;
  });

  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceElement(poinListElement, pointComponent.getElement(), pointEditComponent.getElement());
    elementPoint = null;
    document.removeEventListener('keydown', onEscKeyDown);
  });
  render(poinListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 0; i <= POINT_COUNT - 1; i++) {
  renderPoint(containerList.getElement(), points[i]);
}

