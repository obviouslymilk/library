let myLibrary = [];

const newButton = document.querySelector('.new-button');
const booksContainer = document.querySelector('.books-container');
const bookAddForm = document.querySelector('.form-container');
const bookFormSubmit = document.querySelector('.submit');
const bookFormClose = document.querySelector('.close');
const formPopup = document.querySelector('.form-popup')

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
    var bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.pos = book.index;

    bookCard.insertAdjacentHTML('beforeend', 
        `<div class='book-title'>«${book.title}»</div>
        <div class='book-author'>by ${book.author}</div>
        <div class='book-pages'>${book.pages} pages</div>`
    )

    var readButton = document.createElement('button');
    readButton.classList.add('read');
    readButton.addEventListener('click', e => e.target.classList.toggle('on'))
    bookCard.insertAdjacentElement('beforeend', readButton);

    return bookCard;
}

function fetchLibrary() {
    booksContainer.replaceChildren('');

    myLibrary.forEach(
        e => booksContainer.insertAdjacentElement('beforeend', BookCard(e))
    );
}

function submitForm(e) {
    data = new FormData(bookAddForm);
    title = data.get('title');
    author = data.get('author')
    pages = data.get('pages');


    new Book(title, author, pages, false);
    
    fetchLibrary();
    e.preventDefault();

    bookAddForm.reset();
    formPopup.style.display = 'none'
}


fetchLibrary();

bookAddForm.addEventListener('submit', submitForm)

newButton.addEventListener('click', e => formPopup.style.display = 'flex')
bookFormClose.addEventListener('click', e => formPopup.style.display = 'none')