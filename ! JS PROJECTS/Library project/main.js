
/* 
 0-author
 1-pages
 2-reads tatus
 3-title
*/


function libraryCreate() {
	let library = [];
	let getBody = document.body;

	function newBook(title,author,pages,readStatus) {
	let book = [title,author,pages,readStatus];	
	library.push(book);
	}

	function getFromStorage(item){
		let res = JSON.parse(localStorage.getItem(item));
		return{res}
	}

	function setToStorage(id,value){
		localStorage.setItem(id ,JSON.stringify(value))		
	}

	function getId(id) {
		let item = document.getElementById(id);	
		return{item}
	}

	function getClass(itemClass) {
		let item = document.querySelector(itemClass);
		return{item}
	}

	function getCount(){
		let count = JSON.parse(localStorage.getItem("count"));
		return{count}	
	}

	function reduceCount() {
		let count = getCount();
		setToStorage("count",(count-1));
	}


	function createDiv(num,obj1,obj2,obj3,obj4) {

		let div = document.createElement("div");		
		div.setAttribute("class","book");
		div.setAttribute("id",("book-" + num));

		div.append(obj1);
		div.append(obj2);
		div.append(obj3);
		div.append(obj4);

		getBody.appendChild(div);
		return{div}
	}

	function createHeading(type,text,spanText) {
		let obj = document.createElement(type);		
		let span = document.createElement("span");	
		let textSpan = document.createTextNode(spanText);	
		span.appendChild(textSpan);		
		let fullTitle = document.createTextNode(text);		
		obj.appendChild(fullTitle);
		obj.appendChild(span);	
	
		return{obj}
	}

	function createButtons(readStatus,number) {		
		let readButton = document.createElement("button");
		let buttonDiv = document.createElement("div");
		buttonDiv.setAttribute("class","buttons");	
		readButton.setAttribute('onclick','changeReadStatus("book-'+number+'","button-' + number +'")');
		readButton.setAttribute('id', ("button-" +number));			
		let fullReadButton;
			if(readStatus=="unread") {
				readButton.style.color = "red";	
				fullReadButton = document.createTextNode("unread");	

			} 
			else if (readStatus=="read") {
				readButton.style.color = "lime";
				fullReadButton = document.createTextNode("read");
			
			}		
		readButton.appendChild(fullReadButton);
			
		let removeButton = document.createElement("button");		
		removeButton.setAttribute('onclick','removeBook("book-'+number+'")');		
		let fullRemoveButton =document.createTextNode("remove");
		removeButton.appendChild(fullRemoveButton);			

		buttonDiv.appendChild(removeButton);
		buttonDiv.appendChild(readButton);		

	return{buttonDiv}

	}	

	function formActions(form,background,status) {
		let formDiv = getClass(form);
		let backgroundDiv = getClass(background);
		formDiv.style.visibility = status;
		backgroundDiv.style.visibility = status;
	}

	function showBook(title,author,pages,readStatus, number) {
		
		let newDiv = createDiv(number,
			(createHeading("h3","Tittle: ",title)),
			(createHeading("h3","By ",author)),
			(createHeading("h4","Pages: ",pages)),
			(createButtons(readStatus,number)));			
			
	}

	function displayBooks() {
		let count = getCount();
		for(let i=1;i<=count;i++) {
			let libraryStorage = getFromStorage(("book-" + i));
			let newBook = book(libraryStorage.title,libraryStorage.author,libraryStorage.pages,libraryStorage.readStatus);
		}	
		for(let i =0;i<library.length;i++) {
		showBook(library[i].title,library[i].author, library[i].pages,library[i].readStatus,(i+1));
		}	
	}
	

	function removeBook(bookId) {
		let count = getCount();
		let removingBook = getFromStorage(bookId);
		let lastBook = getFromStorage("book-" + count);
		let lastBookId = ("book-" + count);

		localStorage.removeItem(bookId);
		setToStorage(bookId,lastBook);	
		localStorage.removeItem(lastBookId);
		let bookDiv = getId(lastBookId);
		bookDiv.remove();

		reduceCount();	
}

	function changeReadStatus (bookId,buttonId) {
		let book = getFromStorage(bookId);
		let readStatusCheck = book.readStatus;
		let buttonText = getId(buttonId);	

		if(readStatusCheck=="read") {
			book.readStatus = "unread";	

			buttonText.innerHTML ="unread";
			buttonText.style.color = "red";
		}
		else if(readStatusCheck=="unread") {
			book.readStatus = "read";	
			buttonText.innerHTML ="read";
			buttonText.style.color = "lime";
		}
	setItem(bookId,book);	
}

function showForm() {
	formActions(".book-form",".book-background", "visible");	
}


function closeForm() {
	formActions(".book-form",".book-background", "hidden");
	let formBook = getId('formBook');
	formBook.addEventListener("submit",function(e) {
		e.preventDefault();
	})
}
	
function addNewBook() {
	let count = getCount();
	let bookTitle = document.getElementById("bookTitle").value;
	let bookAuthor = document.getElementById("bookAuthor").value;
	let bookPages = document.getElementById("bookPages").value;
	let bookReadStatus;	
	let yes = document.getElementById("yes");
	let no = document.getElementById("no");	

	if(yes.checked) {
		bookReadStatus = "read";
	}  if(no.checked) {
		bookReadStatus = "unread";	
	}

	let formBook = document.getElementById('formBook');
	formBook.addEventListener("submit",function(e) {
		e.preventDefault();
	})	
	
	setToStorage(("book-" + (count+1)),new Book(bookTitle,bookAuthor,bookPages,bookReadStatus));

	reduceCount();	
	
	showBook(bookTitle,bookAuthor,bookPages,bookReadStatus,(count+1));
	
	alert("Book added!");	
	
	formBook.reset();
	
	closeForm();
}
	function displayBooks() {
		let count = getCount();
		for(let i = 1; i <= count;i++){
			let book = getFromStorage(("book-"+i)) 
			showBook(book[0],book[1],book[2],book[3],i)						
		}
	}
	
	return{displayBooks,showBook}
}

let library = libraryCreate();

library.displayBooks();

