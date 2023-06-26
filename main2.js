class Library {
  constructor() {
    this.myLibrary = [];
    this.bookContainer = document.getElementById('bookContainer');
    this.addBookForm = document.getElementById('addFormContainer');
    this.load();
    this.formControl();
  }

  load() {
    const data = localStorage.getItem('My_Books');
    if (data) {
      this.myLibrary = JSON.parse(data);
    }
    for (let i = 0; i < this.myLibrary.length; i++) {
      this.createBookElement(this.myLibrary[i]);
    }
  }

  save() {
    const myBooks = JSON.stringify(this.myLibrary);
    localStorage.setItem('My_Books', myBooks);
  }

  createBookElement(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('bookCard');

    const bookTitle = document.createElement('h2');
    bookTitle.classList.add('bookTitle');
    bookTitle.innerText = book.title;

    const bookAuthor = document.createElement('h3');
    bookAuthor.classList.add('bookAuthor');
    bookAuthor.innerText = book.author;
    const authorI = document.createElement('span');
    authorI.innerText = 'Author: ';

    const bookPages = document.createElement('h4');
    bookPages.classList.add('bookPages');
    bookPages.innerText = book.pages;
    const pageI = document.createElement('span');
    pageI.innerText = ' Pages';

    const readStatus = document.createElement('button');
    readStatus.setAttribute('type', 'button');
    readStatus.innerText = book.read;
    readStatus.classList.add('readStatus');
    if (book.read === 'Read') {
      readStatus.classList.add('read');
      readStatus.classList.remove('notRead');
    } else {
      readStatus.classList.add('notRead');
      readStatus.classList.remove('read');
    }

    const remove = document.createElement('button');
    remove.setAttribute('type', 'button');
    remove.innerText = 'REMOVE';
    remove.classList.add('remove');

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookAuthor.prepend(authorI);
    bookCard.appendChild(bookPages);
    bookPages.appendChild(pageI);
    bookCard.appendChild(readStatus);
    bookCard.appendChild(remove);

    this.bookContainer.appendChild(bookCard);

    readStatus.addEventListener('click', () => {
      this.changeReadStatus(book, readStatus);
    });

    remove.addEventListener('click', () => {
      this.removeBook(book, bookCard);
    });
  }

  changeReadStatus(book, readStatus) {
    if (readStatus.innerText === 'Read') {
      readStatus.innerText = 'Not Read';
      book.read = 'Not Read';
      readStatus.classList.add('notRead');
      readStatus.classList.remove('read');
    } else if (readStatus.innerText === 'Not Read') {
      readStatus.innerText = 'Read';
      book.read = 'Read';
      readStatus.classList.add('read');
      readStatus.classList.remove('notRead');
    }
    this.save();
  }

  removeBook(book, bookCard) {
    this.myLibrary = this.myLibrary.filter((b) => b.id !== book.id);
    bookCard.remove();
    this.save();
  }

  addNewBook(title, author, pages, read) {
    let readStatus = read.checked ? 'Read' : 'Not Read';
    const book = new Book(title, author, pages, readStatus);
    this.myLibrary.push(book);
    this.createBookElement(book);
    this.save();
    this.closeForm();
  }

  viewForm() {
    this.addBookForm.classList.add('view');
  }

  closeForm() {
    this.addBookForm.classList.remove('view');
  }

  formControl() {
    const close = document.getElementById('close');
    const addBook = document.getElementById('addBook');
    const add = document.getElementById('newBook');

    addBook.addEventListener('click', () => {
      this.viewForm();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeForm();
      }
    });

    close.addEventListener('click', () => {
      this.closeForm();
    });

    add.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const pages = document.getElementById('pages').value;
      const read = document.getElementById('read');
      this.addNewBook(title, author, pages, read);
    });
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.id = new Date().getTime();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

new Library();
