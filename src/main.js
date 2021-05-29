import SiteMenuView from './view/site-menu.js';
import StatisticsView from './view/statistics.js';
import {render, RenderPosition} from './utils/render.js';
import Trip from './presenter/trip';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations.js';
import FilterPresenter from './presenter/filter.js';
import Api from './api.js';
import { makeID } from './utils/common';
import {MenuItem, UpdateType} from './const';

const AUTHORIZATION = `Basic ${makeID(12)}`;
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripControlElements = tripMainElement.querySelector('.trip-controls');
const siteMenuElement = tripControlElements.querySelector('.trip-controls__navigation');
const siteFilterElement = tripControlElements.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const pageBodyContainer = siteMainElement.querySelector('.page-body__container');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const api = new Api(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel();

const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();
const siteMenuComponent = new SiteMenuView();
siteMenuComponent.setMenuItem(MenuItem.TABLE);

const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
const tripPresenter = new Trip(tripEventsElement, tripMainElement, pointsModel, filterModel, offersModel, destinationsModel, api);
tripPresenter.init();
const statisticsComponent = new StatisticsView(pointsModel.getPoints());

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      statisticsComponent.hide();
      tripPresenter.checkSortType();
      tripPresenter.showTrip();
      break;
    case MenuItem.STATS:
      statisticsComponent.show();
      tripPresenter.hideTrip();
      break;
  }
};

render(pageBodyContainer, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();


api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(destinations);
  })
  .catch(() => {
    alert('Произошла ошибка загрузку...');
  });

api.getOffers()
  .then((offers) => {
    offersModel.setOffers(offers);
  })
  .catch(() => {
    alert('Произошла ошибка загрузку...');
  });


api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    render(siteMenuElement, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    filterPresenter.init();
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    render(siteMenuElement, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    filterPresenter.init();
  });


