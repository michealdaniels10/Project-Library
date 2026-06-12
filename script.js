/********************************
 * LIBRARY ARRAY
 ********************************/

const myLibrary = [];

/********************************
 * BOOK CONSTRUCTOR
 ********************************/

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

/********************************
 * PROTOTYPE METHOD
 ********************************/

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

/********************************
 * ADD BOOK TO LIBRARY
 ********************************/

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);

  myLibrary.push(book);
}

/********************************
 * DISPLAY BOOKS
 ********************************/

function displayBooks() {
  const container = document.getElementById("library-container");

  container.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");

    card.classList.add("book-card");

    card.dataset.id = book.id;

    card.innerHTML = `
            <h3>${book.title}</h3>

            <p>
                <strong>Author:</strong>
                ${book.author}
            </p>

            <p>
                <strong>Pages:</strong>
                ${book.pages}
            </p>

            <p>
                <strong>Status:</strong>
                ${book.read ? "Read" : "Not Read"}
            </p>

            <button class="toggle-btn">
                Toggle Read
            </button>

            <button class="remove-btn">
                Remove
            </button>
        `;

    container.appendChild(card);
  });
}

/********************************
 * FORM SUBMISSION
 ********************************/

const form = document.getElementById("book-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;

  const author = document.getElementById("author").value;

  const pages = document.getElementById("pages").value;

  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  displayBooks();

  form.reset();
});

/********************************
 * SHOW/HIDE FORM
 ********************************/

const newBookBtn = document.getElementById("new-book-btn");

newBookBtn.addEventListener("click", function () {
  form.classList.toggle("hidden");
});

/********************************
 * REMOVE BOOK
 * TOGGLE READ STATUS
 ********************************/

const libraryContainer = document.getElementById("library-container");

libraryContainer.addEventListener("click", function (event) {
  const card = event.target.closest(".book-card");

  if (!card) return;

  const id = card.dataset.id;

  const book = myLibrary.find((book) => book.id === id);

  if (event.target.classList.contains("remove-btn")) {
    const index = myLibrary.findIndex((book) => book.id === id);

    myLibrary.splice(index, 1);

    displayBooks();
  }

  if (event.target.classList.contains("toggle-btn")) {
    book.toggleRead();

    displayBooks();
  }
});

/********************************
 * SAMPLE BOOKS
 ********************************/

addBookToLibrary("Harry Potter", "J.K. Rowling", 500, true);

addBookToLibrary("Atomic Habits", "James Clear", 320, false);

displayBooks();
