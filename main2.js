class Book {
    constructor(title, author, pages,read){
        this.id = new Date().getTime();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class MyLibrary {
    constructor() {
        this.myBooks = [];
        this.load();
        this.formControl()
    }

    viewForm() {
        let addFormContainer = document.getElementById("addFormContainer");
        addFormContainer.classList.add("view");
    }
    closeForm() {
        let addFormContainer = document.getElementById("addFormContainer");
        addFormContainer.classList.remove("view");
    }

    formControl() {
        let addBook = document.getElementById('addBook');
        let close = document.getElementById("close");
        let add = document.getElementById("newBook");


        //Open and close Form
        addBook.addEventListener("click", this.viewForm);

        close.addEventListener("click",this.closeForm)
        window.addEventListener('keydown',(e) => {
            if(e.key === "Escape"){
                this.closeForm();
            }
        });

        //Submit form to create a book
        add.addEventListener("submit",(e) => {
            e.preventDefault();
            this.addNewBook();
            /* this.closeForm(); */
        });
    }

    addNewBook() {
        let title = document.getElementById('title').value;
        let author = document.getElementById('author').value;
        let pages = document.getElementById('pages').value;
        let read = document.getElementById('read');
        let readStatus = "";
        if(read.checked === true){
            readStatus = "Read";
        }else {
            readStatus = " Not Read";
        }

        let book = new Book(title,author,pages,readStatus);
        this.myBooks.push(book);
        this.createBookElement(book);
        this.save();
        this.closeForm();
    }

    createBookElement(book){
        //Create a Book card for each book
    
        //creating each element of bookcard
        let bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');

        let bookTitle = document.createElement('h2');
        bookTitle.classList.add('bookTitle');
        bookTitle.innerText = book.title;

        let bookAuthor = document.createElement('h3');
        bookAuthor.classList.add('bookAuthor');
        bookAuthor.innerText = book.author;
        let authorI = document.createElement('span');
        authorI.innerText = "Author : ";

        let bookPages = document.createElement('h4');
        bookPages.classList.add('bookPages');
        bookPages.innerText = book.pages;
        let pageI = document.createElement('span');
        pageI.innerText = " Pages";

        let readStatus = document.createElement('button');
        readStatus.setAttribute("type", "button");
        readStatus.innerText = book.read;
        readStatus.classList.add("readStatus");

        if(book.read === "Read"){
            readStatus.classList.add("read");
            readStatus.classList.remove("notRead");
        }else{
            readStatus.classList.add("notRead");
            readStatus.classList.remove("read");
        }//Checking and Updating read status accordingly

        let remove = document.createElement('button');
        remove.setAttribute("type","button");
        remove.innerText = "REMOVE";
        remove.classList.add('remove');

        let bookContainer = document.getElementById("bookContainer");
        //Adding book card to page
        bookContainer.appendChild(bookCard);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookAuthor.prepend(authorI)
        bookCard.appendChild(bookPages);
        bookPages.appendChild(pageI);
        bookCard.appendChild(readStatus);
        bookCard.appendChild(remove);

        readStatus.addEventListener("click", () => {
            this.changeReadStatus(book,readStatus);
        });

        remove.addEventListener("click",() => {
            this.removeBook(book,bookCard);
        })

    }

    save() {
        const myBooks = JSON.stringify(this.myBooks);
        localStorage.setItem('My_Books', myBooks);
    }
    load() {
        const data = localStorage.getItem('My_Books');
        if (data) {
            this.myBooks = JSON.parse(data);
            for (let i = 0; i < this.myBooks.length; i++) {
                this.createBookElement(this.myBooks[i]);
            }
        }
    }

    changeReadStatus(book,readStatus){
        if(book.read === "Read"){
            book.read = "Not Read";
            readStatus.innerText = book.read;
            readStatus.classList.add("notRead");
            readStatus.classList.remove("read");
        }else {
            book.read = "Read";
            readStatus.innerText = book.read;
            readStatus.classList.add("read");
            readStatus.classList.remove("notRead");
        }
        this.save();
    }
    removeBook(book,bookCard){
        this.myBooks = this.myBooks.filter(b => b.id !== book.id);
        bookCard.remove();
        this.save();
    }


}

const library = new MyLibrary()