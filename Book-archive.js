class BookArchive {
  constructor() {
    this.archiveContainer = [];
    this.finishedDisplay = document.querySelector('.finished-count + span');
    this.getArchiveFromLocalStore();
    this.render();
  }

  sendArchiveToLocalStore() {
    localStorage.setItem('archive', JSON.stringify(this.archiveContainer));
  }

  getArchiveFromLocalStore() {
    JSON.parse(localStorage.getItem('archive'))
      ? (this.archiveContainer = JSON.parse(localStorage.getItem('archive')))
      : (this.archiveContainer = []);
  }

  addToArchiveContainer(bookToArchive) {
    this.archiveContainer.push(bookToArchive);
    this.archiveContainer = this.archiveContainer.map((book, idx) => {
      return Object.assign({}, book, { id: idx });
    });
    this.sendArchiveToLocalStore();
    this.render();
  }

  deleteFromArchiveContainer(e) {
    const idx = parseInt(e.target.parentElement.dataset.id);
    this.archiveContainer = this.archiveContainer
      .filter((item) => {
        return item.id !== idx;
      })
      .map((book, idx) => {
        return Object.assign({}, book, { id: idx });
      });

    this.sendArchiveToLocalStore();
    this.render();
  }

  render() {
    console.log(this.archiveContainer);
    this.finishedDisplay.textContent = `${this.archiveContainer.length}`;

    const renderHook = document.getElementById('cach-list');
    renderHook.innerHTML = '';

    this.archiveContainer.forEach((item, idx) => {
      const listItem = document.createElement('li');
      listItem.dataset.id = idx;
      listItem.classList.add('list-item');
      listItem.innerHTML = `
      <p>${item.id}</p>
      <p>${item.title}</p>
      <p>${item.type}</p>
      <button class='delBtn'>&#10006;</button>
    `;
      const delBtn = listItem.querySelector('.delBtn');
      delBtn.addEventListener(
        'click',
        this.deleteFromArchiveContainer.bind(this)
      );
      renderHook.append(listItem);
    });
  }
}

export default BookArchive;
