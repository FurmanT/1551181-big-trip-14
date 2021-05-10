import SiteMenuView from './view/site-menu.js';
import NewEventButtonView from './view/new-event-button.js';
import {render, RenderPosition} from './utils/render.js';
import FilterView from './view/filter.js';
import {generatePoint} from './mock/point';
import Trip from './presenter/trip';
import TripHeader from './presenter/trip-header';

const POINT_COUNT = 4;
const points = Array(POINT_COUNT).fill().map(generatePoint);

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');

const tripHeader = new TripHeader(tripMainElement);
tripHeader.init(points);

const tripControlElements = tripMainElement.querySelector('.trip-controls');
const siteMenuElement = tripControlElements.querySelector('.trip-controls__navigation');
const siteFilterElement = tripControlElements.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(tripMainElement, new NewEventButtonView(), RenderPosition.BEFOREEND);
render(siteFilterElement, new FilterView(),RenderPosition.BEFOREEND);

const tripPresenter = new Trip(tripEventsElement);
tripPresenter.init(points);
