let myLibrary = [];

const newButton = document.querySelector('.new-button');
const booksContainer = document.querySelector('.books-container');
const bookAddForm = document.querySelector('.form-container');
const bookFormSubmit = document.querySelector('.submit');
const bookFormClose = document.querySelector('.close');

function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.index = myLibrary.length

        myLibrary.push(this)
}

Book.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + (this.read ? "already read" : "nor read yet") + ".";
}

function BookCard(book) {
    return `
    <div class='book-card' data-pos=${book.index}>
        <div class='book-title'>«${book.title}»</div>
        <div class='book-author'>by ${book.author}</div>
        <div class='book-pages'>${book.pages} pages</div>
    </div>
    `
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function fetchLibrary() {
    booksContainer.replaceChildren('');

    myLibrary.forEach(
        e => booksContainer.insertAdjacentHTML('beforeend', BookCard(e))
    );
}

function submitForm(e) {
    data = new FormData(bookAddForm);
    title = data.get('title');
    author = data.get('author')
    pages = data.get('pages');


    book = new Book(title, author, pages, false);
    
    fetchLibrary();
    e.preventDefault();
}

fetchLibrary();

bookAddForm.addEventListener('submit', submitForm)