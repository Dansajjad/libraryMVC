pl.view.createBook = {
  //retrieve collection of objects from local storage
  //& set up event handler (handleSaveButtonClickEvent)
  setupUserInterface: function() {
    var saveButton = document.forms['Book'].commit;
    //load all book objects
    Book.loadAll();
    //Set an event handler for the save/submit button
    saveButton.addEventListener("click",
      pl.view.createBook.handleSaveButtonClickEvent);
    window.addEventListener("beforeunload", function() {
      Book.saveAll();
    });
  },

  //read user input data from form fields and then save data
  handleSaveButtonClickEvent: function() {
    var formEl = document.forms['Book'];
    var record = {
      isbn: formEl.isbn.value,
      title: formEl.title.value,
      year: formEl.year.value
    };
    Book.add(record);
    formEl.reset();
  }
};
