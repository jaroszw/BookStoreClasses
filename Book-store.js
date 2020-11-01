import BookItem from './Book-item.js';
import BookList from './Book-list.js';

class BookStore {
  constructor() {
    this.book = new BookList(this.render);
    this.title = document.getElementById('title');
    this.type = document.getElementById('type');
    this.btn = document.getElementById('search-btn');
    this.form = document
      .getElementById('form')
      .addEventListener('submit', this.addNewBook.bind(this));
  }

  addNewBook(e) {
    e.preventDefault();
    if (this.title.value === '' || this.type.value === '') return;
    const bookItem = new BookItem(this.title.value, this.type.value);

    this.clearInputsValue();
    this.book.addBookToStore(bookItem);
  }

  clearInputsValue() {
    this.title.value = '';
    this.type.value = '';
  }

  render(arg) {
    const renderHook = document.getElementById('book-list');
    renderHook.innerHTML = '';

    arg.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-item');
      listItem.dataset.id = item.id;
      listItem.innerHTML = `
        <p>${item.id}</p>
        <p>${item.title}</p>
        <p>${item.type}</p>
      <button class='cashBtn'>&#10004;</button>
      <button class='delBtn'>&#10006;</button>
    `;

      const delBtn = listItem.querySelector('.delBtn');
      const cashBtn = listItem.querySelector('.cashBtn');
      delBtn.addEventListener('click', this.reDirectBooks.bind(this));
      cashBtn.addEventListener('click', this.reDirectBooks.bind(this));
      renderHook.append(listItem);
    });
  }
}

export default BookStore;
