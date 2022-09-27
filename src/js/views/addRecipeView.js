import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was succesfully uploaded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    // Since this is a child class, 'this' only works after calling super()
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    // Here we had to manually set the this keyword inside this function, or else 'this' pointed to the btn instead of the current object that we want.
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //Instead of selecting and reading form elements one by one, there is a modern way called form data. A modern browser API
      //This points to the form in this case, becuase we are inside of a handler function, so this points to the upload form. The result needs to be spread into an array
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr); // Takes an array of entries and converts to an object. The opp of Entries()
      handler(data);
      //API calls happen in the model, so we need a way of getting this data to the model, again using a controller function which will be the handler for this event
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
