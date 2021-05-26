import SiteMenuView from './view/site-menu.js';
import StatisticsView from './view/statistics.js';
import {render, RenderPosition} from './utils/render.js';
import {generatePoint} from './mock/point';
import Trip from './presenter/trip';
import TripHeader from './presenter/trip-header';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';
import FilterPresenter from './presenter/filter.js';
import {MenuItem, OPTIONS} from './const';

const POINT_COUNT = 2;
const points = Array(POINT_COUNT).fill().map(generatePoint);
const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const offersModel = new OffersModel();
setTimeout(() => offersModel.setOffers(OPTIONS), 10000);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripControlElements = tripMainElement.querySelector('.trip-controls');
const siteMenuElement = tripControlElements.querySelector('.trip-controls__navigation');
const siteFilterElement = tripControlElements.querySelector('.trip-controls__filters');

const siteMenuComponent = new SiteMenuView();
const siteMainElement = document.querySelector('.page-main');
const pageBodyContainer = siteMainElement.querySelector('.page-body__container');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(siteMenuElement, siteMenuComponent, RenderPosition.BEFOREEND);
siteMenuComponent.setMenuItem(MenuItem.TABLE);

const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
filterPresenter.init();
const tripPresenter = new Trip(tripEventsElement, pointsModel, filterModel, offersModel);
tripPresenter.init();

const tripHeader = new TripHeader(tripMainElement, pointsModel, () => tripPresenter.createPoint());
tripHeader.init();
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

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
render(pageBodyContainer, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();
