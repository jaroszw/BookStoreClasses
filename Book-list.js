import { Init } from './app.js';

class BookList {
  constructor(providedMethod) {
    this.proxyMethod = providedMethod;
    this.bookStore = [];
    this.getBookStoreFromLocalStore();
    this.toReadDisplay = document.querySelector('.toRead-count + span');
    this.sendBooksToRender();
  }

  sendBookStoreToLocalStore() {
    localStorage.setItem('bookStore', JSON.stringify(this.bookStore));
  }

  getBookStoreFromLocalStore() {
    JSON.parse(localStorage.getItem('bookStore'))
      ? (this.bookStore = JSON.parse(localStorage.getItem('bookStore')))
      : (this.bookStore = []);
  }

  addBookToStore(item) {
    this.bookStore.push(item);
    this.bookStore.forEach((item, index) => (item.id = index));
    this.sendBookStoreToLocalStore();
    this.sendBooksToRender(this.bookStore);
  }

  sendBooksToRender() {
    this.proxyMethod(this.bookStore);
    this.totalValue = this.bookStore;
  }

  set totalValue(value) {
    this.toReadDisplay.textContent = `${this.totalNumberOfBooks}`;
  }

  get totalNumberOfBooks() {
    const value = this.bookStore.length;
    return value;
  }

  reDirectBooks(e) {
    this.toReadDisplay.textContent = `<span>${
      this.bookStore.length + 1
    }</span>`;

    const idx = parseInt(e.target.parentElement.dataset.id);

    if (e.target.classList.contains('cashBtn')) {
      const archivedElement = this.bookStore.filter((item) => item.id === idx);
      Init.sendToArchiveList(...archivedElement);
    }

    this.bookStore = this.bookStore
      .filter((item) => {
        return item.id !== idx;
      })
      .map((book, idx) => {
        return Object.assign({}, book, { id: idx });
      });

    this.sendBookStoreToLocalStore();
    this.sendBooksToRender();
  }
}

export default BookList;
