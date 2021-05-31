import SiteMenuView from './view/site-menu.js';
import {render, RenderPosition} from './utils/render.js';
import Trip from './presenter/trip';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations.js';
import FilterPresenter from './presenter/filter.js';
import StatisticsPresenter from './presenter/statistics.js';
import Api from './api/api.js';
import { makeID } from './utils/common';
import {MenuItem, UpdateType} from './const';
import Store from './api/store.js';
import Provider from './api/provider.js';

const AUTHORIZATION = `Basic ${makeID(12)}`;
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const STORE_PREFIX = 'bigtrip-localstorage';
const STORE_VER = 'v14';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripControlElements = tripMainElement.querySelector('.trip-controls');
const siteMenuElement = tripControlElements.querySelector('.trip-controls__navigation');
const siteFilterElement = tripControlElements.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const pageBodyContainer = siteMainElement.querySelector('.page-body__container');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const api = new Api(END_POINT, AUTHORIZATION);

const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();
const siteMenuComponent = new SiteMenuView();
siteMenuComponent.setMenuItem(MenuItem.TABLE);

const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
const tripPresenter = new Trip(tripEventsElement, tripMainElement, pointsModel, filterModel, offersModel, destinationsModel, apiWithProvider);
tripPresenter.init();

const statisticsPresenter = new StatisticsPresenter(pageBodyContainer, pointsModel);
statisticsPresenter.init();

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      statisticsPresenter.hide();
      tripPresenter.checkSortType();
      tripPresenter.showTrip();
      break;
    case MenuItem.STATS:
      statisticsPresenter.show();
      tripPresenter.hideTrip();
      break;
  }
};

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

apiWithProvider.getPoints()
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

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {

  document.title += ' [offline]';
});
