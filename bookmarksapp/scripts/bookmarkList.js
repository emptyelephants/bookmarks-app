  /*global Store, Api, BookmarkList*/
const BookmarkList = function(){

  const render = function(){
    console.log('render ran');
    if (Store.isAdding===true){
      $('#js-new-bookmark-form').html(getAddingForm());
    }
    else{
      $('#js-new-bookmark-form').html(getDefaultButtons());
    }
    if(Store.minRating>0){
      const bookmarksHtmlString = generateListString(Store.bookmarks.filter(bookmarksArray=>bookmarksArray.rating>=Store.minRating));
      $('.js-bookmarks-list').html(bookmarksHtmlString);
    }
    else{
      const bookmarksHtmlString = generateListString(Store.bookmarks);
      $('.js-bookmarks-list').html(bookmarksHtmlString);
    }

  };
  const getDefaultButtons = function(){
      return `
      <label for="filter-bookmarks">Filter Bookmarks by Rating</label>
       <form name="filter-bookmarks">
        <select class="js-filter-option">
        <option value="0">----</option>
        <option value="0">filter off</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select>
        </form>
      <button class="js-toggle-isAdding">New BookMark</button>
  
       
    
      
      `;
    };
  const getAddingForm = function(){
    return `
      <label for="Bookmark Title">Title</label>
      <input type="text" name="Bookmark Title" class="js-bookmark-title" placeholder="Bookmark title">
      <label for="Bookmark Link">Link</label>
      <input type="text" name="Bookmark Link" class="js-bookmark-link" placeholder="Http link"> 
      <label for="Bookmark Rating">Rating</label>
      <input type="text" name="Bookmark Rating" class="js-bookmark-rating" placeholder="Between 1 and 5">
      <label for="Bookmark Link">Description</label>
      <input type="textarea" name="Bookmark Link" class="js-bookmark-desc" placeholder="Describe link">
      <button>Submit</button>
      <button class="js-toggle-isAdding">Cancel</button>

      `;
    };

  
  const generateListString = function(bookmarksList){
    const bookmarksArray = bookmarksList.map(x=>generateListItem(x));
    return bookmarksArray.join('');
  };
  const generateListItem = function(bookmark){
    let expandedContent ='';
    if(bookmark.isExpanded){
      expandedContent=`
        <button class="js-open-link"><a href="https://${bookmark.url}" target="_blank">Visit Webpage</a></button>
        <button class="js-delete-bookmark">Delete Bookmark</button>
        <p>${bookmark.desc}</p>
        `;
    }
    return `
      <li class="bookmark-element" data-item-id="${bookmark.id}">
      <h3>${bookmark.title}</h3>
      <span class="star-rating">${generateRating(bookmark.rating)}</span>
      ${expandedContent}
      </li>
      `;

  };
  const generateRating = function(bookmarkRating){
    const ratingNum = parseInt(bookmarkRating);
    let totalStars = '';
    for(let i = 0 ; i<ratingNum;i++){
      totalStars +=`<span class="fa fa-star checked"></span>`;
    }
    return `${totalStars}`;
  
  };
  const getItemIdFromElement = function(item) {
    return $(item)
      .closest('.bookmark-element')
      .data('item-id');
  };


 
  const handleBookmarkExpand = function(){
    $('.js-bookmarks-list').on('click','.bookmark-element',event=>{
      event.stopPropagation();
      const id =  getItemIdFromElement(event.currentTarget);
      const toExpand = Store.findById(id);
      if(!toExpand.isExpanded){
        toExpand.isExpanded = !toExpand.isExpanded;
        render();
      }
      
      
    });
  };

  const handleDeleteButton = function(){
    $('.js-bookmarks-list').on('click','.js-delete-bookmark',event=>{
      const id = getItemIdFromElement(event.currentTarget);
      Api.deleteBookmarkItem(id,()=>{
        Store.findAndDelete(id);
        render();
      });
    });
  };


  const handleFilterChange = function(){
    $('#js-new-bookmark-form').on('change','.js-filter-option',()=>{
      const minRatingValue = $('.js-filter-option').val();
      Store.minRating = minRatingValue;
      render();
    
    });
  };
  const handleNewBookmarkFormToggle = function(){
    $('#js-new-bookmark-form').on('click','.js-toggle-isAdding',event=>{
      event.preventDefault();
      Store.isAdding = !Store.isAdding;
      render();
    });
  };

  const handleNewBookmarkSubmit = function(){
    $('#js-new-bookmark-form').on('submit',event=>{
      event.preventDefault();
      const title  = $('.js-bookmark-title').val();
      const link = $('.js-bookmark-link').val();
      const rating = $('.js-bookmark-rating').val();
      const desc = $('.js-bookmark-desc').val();
      Store.isAdding = !Store.isAdding;
      Api.createBookmarkItem(title,link,rating,desc,(newBookmark)=>{
        Store.addBookmark(newBookmark);
        render();
      });


    });
  };

  const bindEventListeners = function(){
    handleNewBookmarkFormToggle();
    handleNewBookmarkSubmit();
    handleBookmarkExpand();
    handleDeleteButton();
    handleFilterChange();
  };
    //development helper delete after done !!

  return {
    render,
    bindEventListeners
  };


}();