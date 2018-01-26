
const Store = function(){


  const addBookmark = function(bookmarkItem){
    //since expansion is client side, will set default value to false
    bookmarkItem.isExpanded=false;
    this.bookmarks.push(bookmarkItem);
  };
  const findById = function(id){
    return this.bookmarks.find(bookmark=>bookmark.id ===id);
  };
 

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmarks => bookmarks.id !==id);
  };

  return{
    bookmarks:[],
    isAdding:false,
    addBookmark,
    findById,
    findAndDelete
  };
}();