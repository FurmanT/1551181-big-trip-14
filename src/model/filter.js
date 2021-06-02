import Observer from '../utils/observer.js';
import { FilterType } from '../const.js';

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  set(updateType, filter) {
    if (this._activeFilter === filter){
      return;
    }
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  get() {
    return this._activeFilter;
  }
}
