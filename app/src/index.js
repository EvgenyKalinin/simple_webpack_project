import css from './style.css';

const loginForm = document.getElementById("form-signin");
const btnAddBook = document.getElementById("btnAddBook");
const bookTable = document.getElementById("bookTable")
const bookListTable = document.getElementById("bookList");

var deleteElements = 0

function addBookInHTML(book){
  bookListTable.insertAdjacentHTML('beforeend',`
    <tr>
      <td>${book.title}</td>
      <td>${book.isbn}</td>
      <td>${book.author}</td>
      <td><button class="btn btn-sm btn-outline-danger delete form-control">X</button></td>
    </tr>
  `)
}

function tableRendering(userBooks){
  if(userBooks){
    userBooks.forEach(function(userBook) {
      addBookInHTML(userBook);
    });
  }
}


function addDeleteEvent(userBooks){
  let deleteList = document.querySelectorAll('.delete');
  deleteList.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        userBooks.splice(i - deleteElements,1);
        deleteElements = deleteElements + 1;
        localStorage.setItem(sessionStorage.getItem(1), JSON.stringify(userBooks));
        btn.parentElement.parentElement.remove();
      });
  });
}

function addNewBookEvent(userBooks) {
  btnAddBook.addEventListener("click",function(event){
    if (document.getElementById("bookName").value=="") {
      return
    }
    if (document.getElementById("bookIsbn").value=="") {
      return
    }
    if (document.getElementById("bookPublisher").value=="") {
      return
    }
    let newBook = { "title": document.getElementById("bookName").value,
                    "isbn":  document.getElementById("bookIsbn").value,
                    "author":document.getElementById("bookPublisher").value}
    userBooks.push(newBook);
    addBookInHTML(newBook);
    addDeleteEvent(userBooks);
    localStorage.setItem(sessionStorage.getItem(1), JSON.stringify(userBooks));
  });
}

function login() {
  loginForm.remove();
  var userBooks = JSON.parse(localStorage.getItem(sessionStorage.getItem(1)));
  tableRendering(userBooks);
  addDeleteEvent(userBooks);
  addNewBookEvent(userBooks);
  bookTable.style.display = "block"
}

if(!sessionStorage.getItem(1)){
  // If not logged in
  let emailField = document.getElementById("email");
  let btnLogin = document.getElementById("btnLogin");
  loginForm.style.display = "block";

  btnLogin.addEventListener('click', function(event) {
  	event.preventDefault();
    // Regexp for check valid email
  	let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  	let valid = re.test(emailField.value);
    // Check valid "@" and "." in email and login
  	if(valid) {
      emailField.classList.remove("is-invalid");
      sessionStorage.setItem(1, emailField.value);
      login();
    }
    else{
      emailField.classList.add("is-invalid");
    }
  })
}
else{
  // If logged in
  login();
}
