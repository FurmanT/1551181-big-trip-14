import Observer from '../utils/observer.js';

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);

  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        price: point.base_price,
        isFavorite: point.is_favorite,
        options: point.offers,
        startDate: point.date_from,
        endDate: point.date_to,
      },
    );

    delete point.base_price;
    delete point.is_favorite;
    delete point.offers;
    delete point.date_from;
    delete point.date_to;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'base_price': Number(point.price),
        'is_favorite': point.isFavorite,
        'offers': point.options,
        'date_from': point.startDate,
        'date_to': point.endDate,
      },
    );
    delete adaptedPoint.price;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.options;
    delete adaptedPoint.startDate;
    delete adaptedPoint.endDate;
    return adaptedPoint;
  }
}
