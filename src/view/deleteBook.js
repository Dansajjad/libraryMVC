pl.view.deleteBook = {

  setupUserInterface: function() {
    var deleteButton = document.forms['Book'].commit;  //takes form name "Book" + button name "commit"
    var selectEl = document.forms['Book'].selectBook;

    var key="", keys=[], book=null, optionEl=null;
    //load all books
    Book.loadAll();

    keys = Object.keys(Book.instances); //retrieves all the keys from Book.instances object

    //populate drop down with books
    for(var i = 0; i < keys.length; i++) {
      key = keys[i];// single key
      book = Book.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = book.title;
      optionEl.value = book.isbn;
      selectEl.add(optionEl, null);
    }
    //
    deleteButton.addEventListener("click",
      pl.view.deleteBook.handleDeleteButttonClickEvent
    );
    //
    window.addEventListener("beforeunload", function() {
      Book.saveAll();
    });
  },

  handleDeleteButttonClickEvent: function() {
    var selectEl = document.forms['Book'].selectBook;
    var isbn = selectEl.value;
    if(isbn) {
      Book.destroy(isbn);
      selectEl.remove(selectEl.selectedIndex);
    }
  }
};
