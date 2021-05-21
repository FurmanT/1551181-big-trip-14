import SiteMenuView from './view/site-menu.js';
import {render, RenderPosition} from './utils/render.js';
import {generatePoint} from './mock/point';
import Trip from './presenter/trip';
import TripHeader from './presenter/trip-header';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';

const POINT_COUNT = 40;
const points = Array(POINT_COUNT).fill().map(generatePoint);
const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');

const tripControlElements = tripMainElement.querySelector('.trip-controls');
const siteMenuElement = tripControlElements.querySelector('.trip-controls__navigation');
const siteFilterElement = tripControlElements.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
filterPresenter.init();
const tripPresenter = new Trip(tripEventsElement, pointsModel, filterModel);
tripPresenter.init();

const tripHeader = new TripHeader(tripMainElement, pointsModel, () => tripPresenter.createPoint());
tripHeader.init();
