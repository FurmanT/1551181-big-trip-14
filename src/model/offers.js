import Observer from '../utils/observer.js';

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = {};
  }

  setOffers(offers) {
    this._offers = offers.slice();
    this._notify(this._offers);
  }

  getOffers(type){
    if (!type) return [];
    for (let i = 0; i < this._offers.length; i++) {
      if ( this._offers[i].type === type) {
        return this._offers[i].offers;
      }
    }
    return [];
  }
}
