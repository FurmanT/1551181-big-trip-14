import AbstractView from './abstract.js';
import {MenuItem} from '../const';

const createSiteMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn" data-type= "${MenuItem.TABLE}" href="#">${MenuItem.TABLE}</a>
            <a class="trip-tabs__btn" data-type= "${MenuItem.STATS}" href="#">${MenuItem.STATS}</a>
          </nav>`;
};

export default class SiteMenu extends AbstractView {

  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.menuClick(evt.target.innerHTML);
    const menuNode = this.getElement().querySelectorAll('a');
    menuNode.forEach((node) => {
      if (node.dataset.type === evt.target.innerHTML ) {
        node.classList.add('trip-tabs__btn--active');
      }
      else {
        node.classList.remove('trip-tabs__btn--active');
      }
    });
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`a[data-type=${menuItem}]`);
    if (item !== null) {
      item.classList.add('trip-tabs__btn--active');
    }
  }
}
