import Observer from '../utils/observer.js';
import {UpdateType} from '../const';

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = {};
  }

  setOffers(offers) {
    this._offers = offers.slice();
    this._notify(UpdateType.MINOR, this._offers);
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
