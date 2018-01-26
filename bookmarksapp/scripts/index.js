/*global bookmarkList, Store, Api */
$(document).ready(function() {

  
  bookmarkList.bindEventListeners();
  Api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmarks) => Store.addBookmark(bookmarks));
    bookmarkList.render();
  }    
  );


});

