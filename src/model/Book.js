/********************CREATE CLASS**************************/
//create a Book constructor
function Book(record) {
	this.isbn = record.isbn;
  this.title = record.title;
  this.year = record.year;
}
//a collection "instances "property that stores the various instances as key/value pairs in
//the form of an entity table, where value is an object record and key is a primary id of the record
Book.instances = {}; //class-level property


/********************ADD**************************/
//adding book instances to the instances
Book.add = function(record) {  //class-level method
	var book = new Book(record);

  Book.instances[record.isbn] = book;
  console.log("Book with "+ record.isbn + " created!");
};


//entity table representing a collection of books
//Book.instances =
// {
//   "006251587X": { isbn:"006251587X", title:"Weaving the Web", year:2000},
//   "0465026567": {isbn:"0465026567", title:"Gödel, Escher, Bach", year:1999},
//   "0465030793":	{isbn:"0465030793" title:"I Am A Strange Loop", year:2008}
// }



/********************SAVE**************************/
//saving Book instances
  //we will store all the book instances as a map in local storage (seriali
  //this will serialize the entity table "instances" into a string
  //We will assign this string as a value to localStorage key called "books"
Book.saveAll = function() {
	//converting entity table to a string
  var booksString = JSON.stringify(Book.instances);
	//storing the string into local storage
  localStorage["books"] = booksString;
};



/********************LOAD ALL**************************/
//method to convert a record into a corresponding object of type Book
Book.convertRow2Obj = function (bookRow) {
  var book = new Book( bookRow);
  return book;
};

// //loading all Book instances
// Book.loadAll = function() {
// 	// var books = {};
	// //retrieving the string
  // var booksString = localStorage["books"];
  // //converting string into a corresponding entity table called books with book rows as elements stored as records
  // books = JSON.parse(booksString);  //storing the objects into a variable called booksString
	// console.log(books);
	//
  // //converting each record in the entity table into a corresponding object of type Book
  // for(var prop in books) {
  // 	Book.instances[prop] = Book.convertrow2Obj(books[prop]);
  // }
	// };

	Book.loadAll = function () {
	  var key="", keys=[],
	      booksString="", books={};
	  try {
	    if (localStorage["books"]) {
	      booksString = localStorage["books"];
	    }
	  } catch (e) {
	    alert("Error when reading from Local Storage\n" + e);
	  }
	  if (booksString) {
	    books = JSON.parse( booksString);
	    keys = Object.keys( books);
	    console.log( keys.length +" books loaded.");
	    for (i=0; i < keys.length; i++) {
	      key = keys[i];
	      Book.instances[key] = Book.convertRow2Obj( books[key]);
	    }
	  }
	};

/********************UPDATE**************************/
//updating a Book instances
Book.update = function(record) { //pass in updated record

	var book = Book.instances[record.isbn]; //retrieve book from Book.instances with the provided ISBN
  var year = parseInt(record.year);  //convert the html string input to integer

  if(book.title !== record.title) { book.title = record.title; } //update title if not same
	if(book.year !== record.year) { book.year = record.year; } //updated year if not same
  console.log("Book with isbn "+ record.isbn + "has been modified!");
};


/********************DELETE**************************/
//deleting a Book instance
Book.destroy = function(isbn) {
	//check if the entity table has a row with the given key
  if(Book.instances[isbn]) {
  	console.log("The book with isbn "+ isbn + " has been deleted!");
    delete Book.instances[isbn];
  }
  else {
  	console.log("There is no book with the isbn " + isbn + " in the database!");
  }
};



/********************DELETE ALL DATA**************************/
//clearing all data
Book.clearData = function() {
	if(confirm("Do you want to delete all book data?")) {
  	localStorage["books"] = "{}";
  }
};
