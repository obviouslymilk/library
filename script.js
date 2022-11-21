//! ПОФИКСТИЬ УДАЛЕНИЕ
let myLibrary = {};

const newButton = document.querySelector('.new-button');
const booksContainer = document.querySelector('.books-container');
const bookAddForm = document.querySelector('.form-container');
const bookFormSubmit = document.querySelector('.submit');
const bookFormClose = document.querySelector('.close');
const formPopup = document.querySelector('.form-popup')

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const createBookElement = book => `
    <div class="book">
        <h1 class="book-title">«${book.title}»</h1>
        <h2 class="book-author">by ${book.author}</h2>
        <h3 class="book-pages">${book.pages} pages</h3>
        <div class="buttons-container">
            <button class="read ${book.read ? "on" : null}" data-title=${book.title}>${book.read ? "Already read" : "Not read yet"}</button>
            <button data-title=${book.title} class="remove">Remove</button>
        </div>
    </div>
`

function fetchLibrary() {
    booksContainer.replaceChildren('');
    
    Object.entries(myLibrary).forEach(entry => {
        booksContainer.insertAdjacentHTML('beforeend', createBookElement(entry[1]));
    })
}

function addBook(title, author, pages, read = false) {
    if (myLibrary[title])
        return alert('This book is already in library.');
    
    const book = new Book(title, author, pages, read);
    
    myLibrary[title] = book;
}

function removeBook(e) {
    const title = e.target.dataset.title;
    delete myLibrary[title];
    fetchLibrary();
}

function changeReadStatus(e) {
    const title = e.target.dataset.title;
    myLibrary[title].read = !myLibrary[title].read;
    fetchLibrary();
}

function submitForm(e) {
    e.preventDefault();

    data = new FormData(bookAddForm);
    title = data.get('title');
    author = data.get('author')
    pages = data.get('pages');
    
    addBook(title, author, pages);
    fetchLibrary();

    bookAddForm.reset();
    formPopup.style.display = 'none'
}


fetchLibrary();
bookAddForm.addEventListener('submit', submitForm);
newButton.addEventListener('click', () => formPopup.style.display = 'flex')
bookFormClose.addEventListener('click', () => formPopup.style.display = 'none')

document.querySelector('body').addEventListener('click', function(e) {
    if ( e.target.classList.contains('remove') ) {
        removeBook(e);
    }
    if ( e.target.classList.contains('read') ) {
        changeReadStatus(e);
    }

}, true);