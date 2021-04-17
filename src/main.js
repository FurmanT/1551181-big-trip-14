import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createContainerTripInfo} from './view/container-trip-info.js';
import {createMainTripInfoTemplate} from './view/trip-info-main.js';
import {createTripCostTemplate} from './view/trip-cost-main.js';
import {createContainerListTemplate} from './view/container-list.js';
import {createPointEditTemplate} from './view/point-edit.js';
import {createPointTemplate} from './view/point.js';

const POINT_COUNT = 3;
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
const siteHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const tripControlElements = tripMainElement.querySelector(`.trip-controls`);
const siteMenuElement = tripControlElements.querySelector(`.trip-controls__navigation`);
const siteFilterElement = tripControlElements.querySelector(`.trip-controls__filters`);

render(siteMenuElement, createSiteMenuTemplate(), `beforeend`);

render(tripMainElement, createContainerTripInfo(), `afterbegin`);
const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
render(tripInfoElement, createMainTripInfoTemplate(), `beforeend`);
render(tripInfoElement, createTripCostTemplate(), `beforeend`);

render(siteFilterElement, createFilterTemplate(), `beforeend`);
render(tripEventsElement, createSortTemplate(), `beforeend`);
render(tripEventsElement, createContainerListTemplate(), `beforeend`);

const tripListElement = tripEventsElement.querySelector(`.trip-events__list`);
render(tripListElement, createPointEditTemplate(), `afterbegin`);
for (let i = 0; i < POINT_COUNT; i++) {
  render(tripListElement, createPointTemplate(), `beforeend`);
}
render(tripListElement, createPointAddTemplate(), `beforeend`);






