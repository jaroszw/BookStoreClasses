import BookStore from './Book-store.js';
import BookArchive from './Book-archive.js';

class App {
  constructor() {
    this.bookStore = new BookStore();
    this.archive = new BookArchive();
  }
}

export class Init {
  static archive;
  static render() {
    const app = new App();
    this.archive = app.archive;
  }

  static sendToArchiveList(elementToCasch) {
    this.archive.addToArchiveContainer(elementToCasch);
  }
}

Init.render();
