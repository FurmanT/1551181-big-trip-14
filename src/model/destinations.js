import Observer from '../utils/observer.js';

export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }

  set(destinations) {
    this._destinations = destinations.slice();
    this._notify(this._destinations);
  }

  get(){
    return this._destinations;
  }

}
