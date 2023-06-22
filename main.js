(function () {
    let myLibrary = [];

    function Book(title, author, pages,read) {//Constructor for book object
        this.id = new Date().getTime();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    let bookContainer = document.getElementById('bookContainer');//Container element that store book cards
    let addBookForm = document.getElementById('addFormContainer');//Form to add Book

    //
    load();
    formControl();

    function creatBookElement(book) {//Create a Book card for each book
    
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
        pageI.innerText = " Pages"

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
        
        
        //Adding book card to page
        bookContainer.appendChild(bookCard);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookAuthor.prepend(authorI)
        bookCard.appendChild(bookPages);
        bookPages.appendChild(pageI);
        bookCard.appendChild(readStatus);
        bookCard.appendChild(remove);

        function changeReadStatus() {//Change read status on click
            if(readStatus.innerText === "Read"){
                readStatus.innerText = "Not Read";
                book.read = "Not Read";
                readStatus.classList.add("notRead");
                readStatus.classList.remove("read");
            }else if(readStatus.innerText === "Not Read"){
                readStatus.innerText = "Read";
                book.read = "Read";
                readStatus.classList.add("read");
                readStatus.classList.remove("notRead");
            }
            save();
        }
        function removeBook() {
            myLibrary = myLibrary.filter(b => b.id != book.id);
            bookCard.remove();
            save();
        }

        readStatus.addEventListener('click', changeReadStatus);

        remove.addEventListener('click', removeBook)

    }


    function save() {
        const myBooks = JSON.stringify(myLibrary);
        localStorage.setItem('My_Books',myBooks);
    }

    function load() {
        const data = localStorage.getItem("My_Books");
        if(data) {
            myLibrary = JSON.parse(data);
        }
        for(let i = 0 ; i < myLibrary.length; i++) {
            creatBookElement(myLibrary[i]);
        }
    }

    function addNewBook() {
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
        
        myLibrary.push(book);
        creatBookElement(book);
        save();
        closeForm();
    }

    function viewForm() {
        addBookForm.classList.add('view');
    }
    function closeForm() {
        addBookForm.classList.remove('view');
    }
    function formControl() {
        let close = document.getElementById("close");
        let addBook = document.getElementById('addBook');
        let add = document.getElementById('newBook');
        addBook.addEventListener('click',viewForm);
        window.addEventListener('keydown',(e) => {
            if(e.key === "Escape"){
                closeForm();
            }
        });

        close.addEventListener('click', closeForm);


        add.addEventListener('submit',(e) => {
            e.preventDefault();
            addNewBook();
        });
    };
})();