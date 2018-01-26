const Api = function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/e-18Miggy/bookmarks';
  
  const getBookmarks = function(callback){
    $.getJSON(`${BASE_URL}`,callback);
  };
  const createBookmarkItem = function(title,url,rating,blurb,callback){
    const newBookmarkItem ={
      title,
      url,
      rating,
      desc:blurb
    };
    $.ajax({
      url:`${BASE_URL}`,
      method:'POST',
      contentType:'application/json',
      data:JSON.stringify(newBookmarkItem),
      success:callback,
    });
  };
  const deleteBookmarkItem = function(id,callback){
    $.ajax({
      url:`${BASE_URL}/${id}`,
      method:'DELETE',
      success:callback
    });
  };

  return{
    getBookmarks,
    createBookmarkItem,
    deleteBookmarkItem
  };
}();