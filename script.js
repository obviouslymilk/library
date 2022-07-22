let myLibrary = [];


function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;

        this.info = () => {
            return title + " by " + author + ", " + pages + " pages, " + (read ? "already read" : "nor read yet") + ".";
        }
}


function addBookToLibrary(book) {
    myLibrary.push(book)
}

function fetchLibrary() {
    myLibrary.forEach(
        e => console.log(e)
    )
}


theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary(theHobbit)

fetchLibrary()