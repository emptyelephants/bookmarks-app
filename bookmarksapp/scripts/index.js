/*global BookmarkList, Store, Api */
$(document).ready(function() { 
  BookmarkList.bindEventListeners();
  Api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmarks) => Store.addBookmark(bookmarks));
    BookmarkList.render();
  }    
  );


});

