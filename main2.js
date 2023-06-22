(function() {
    let Library = {
        myLibrary : [],
        Book : function(title, author, pages, read) {
            this.id = new Date().getTime();
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        },
        addBookFormContainer : document.getElementById('addFormContainer'),
    }
})