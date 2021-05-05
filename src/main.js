import SiteMenuView from './view/site-menu.js';
import NewEventButtonView from './view/new-event-button.js';
import {render, RenderPosition, replace} from './utils/render.js';
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

render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(tripMainElement, new NewEventButtonView(), RenderPosition.BEFOREEND);
render(siteFilterElement, new FilterView(),RenderPosition.BEFOREEND);

if (points.length === 0 ){
  render(tripEventsElement, new NoPoints(), RenderPosition.BEFOREEND);
} else {
  const tripMainInfo = generateTripInfo(points);
  render(tripMainElement, new ContainerTripInfoView(), RenderPosition.AFTERBEGIN);
  const tripInfoElement = tripMainElement.querySelector('.trip-info');
  render(tripInfoElement, new MainTripInfoView(tripMainInfo), RenderPosition.BEFOREEND);
  render(tripEventsElement, new SortView(), RenderPosition.BEFOREEND);
}

const containerList = new ContainerListView();
render(tripEventsElement, containerList, RenderPosition.BEFOREEND);

const closeAnotherForm = () => {
  if (elementPoint) {
    const form = containerList.getElement().querySelector('form');
    const li = form.closest('.trip-events__item');
    replace(elementPoint, li);
    elementPoint = null;
  }
};

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeAnotherForm();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const renderPoint = (poinListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  pointComponent.setEditClickHandler(() => {
    closeAnotherForm();
    elementPoint = pointComponent.getElement();
    replace(pointEditComponent, pointComponent);
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setCloseClickHandler(() => {
    replace(pointComponent, pointEditComponent);
    elementPoint = null;
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replace(pointComponent, pointEditComponent);
    elementPoint = null;
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(poinListElement, pointComponent, RenderPosition.BEFOREEND);
};

for (let i = 0; i <= POINT_COUNT - 1; i++) {
  renderPoint(containerList.getElement(), points[i]);
}

