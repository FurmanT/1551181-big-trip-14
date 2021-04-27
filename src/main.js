import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createContainerTripInfo} from './view/container-trip-info.js';
import {createMainTripInfoTemplate} from './view/trip-info-main.js';
import {createContainerListTemplate} from './view/container-list.js';
import {createPointEditTemplate} from './view/point-edit.js';
import {createPointTemplate} from './view/point.js';
import {generatePoint} from './mock/point';
import {generateTripInfo} from './mock/trip-info';

const POINT_COUNT = 40;
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const points = Array(POINT_COUNT).fill().map(generatePoint);

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripControlElements = tripMainElement.querySelector('.trip-controls');
const siteMenuElement = tripControlElements.querySelector('.trip-controls__navigation');
const siteFilterElement = tripControlElements.querySelector('.trip-controls__filters');

render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');

const tripInfo = generateTripInfo(points);
render(tripMainElement, createContainerTripInfo(), 'afterbegin');
const tripInfoElement = tripMainElement.querySelector('.trip-info');
render(tripInfoElement, createMainTripInfoTemplate(tripInfo), 'beforeend');

render(siteFilterElement, createFilterTemplate(), 'beforeend');
render(tripEventsElement, createSortTemplate(), 'beforeend');
render(tripEventsElement, createContainerListTemplate(), 'beforeend');

const tripListElement = tripEventsElement.querySelector('.trip-events__list');
render(tripListElement, createPointEditTemplate(points[0]), 'afterbegin');

for (let i = 1; i < POINT_COUNT; i++) {
  render(tripListElement, createPointTemplate(points[i]), 'beforeend');
}

render(tripListElement, createPointEditTemplate({}), 'beforeend');
