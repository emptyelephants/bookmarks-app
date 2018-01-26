/*global Store, Api*/
const bookmarkList = function(){

  const render = function(){
    console.log('render ran');
    if (Store.isAdding===true){
      $('#js-new-bookmark-form').html(getAddingForm());
    }
    else{
      $('#js-new-bookmark-form').html(getDefaultButtons());
    }
    //render the list to the DOM
    const bookmarksHtmlString = generateListString(Store.bookmarks);
    $('.js-bookmarks-list').html(bookmarksHtmlString);
  };
  const getAddingForm = function(){
    return `
    <label for="Bookmark Title">Title</label>
    <input type="text" name="Bookmark Title" class="js-bookmark-title" placeholder="Bookmark title">
    <label for="Bookmark Link">Link</label>
    <input type="text" name="Bookmark Link" class="js-bookmark-link" placeholder="Http link"> 
    <br><!-- //DELETE THIS, STYLE USING CSS DAY 2 -->
    <label for="Bookmark Rating">Rating</label>
    <input type="text" name="Bookmark Rating" class="js-bookmark-rating" placeholder="Between 1 and 5">
    <br><!-- //DELETE THIS, STYLE USING CSS DAY 2 -->
    <label for="Bookmark Link">Description</label>
    <input type="text" name="Bookmark Link" class="js-bookmark-desc" placeholder="Describe link">
    <button>Submit</button>
    <button class="js-toggle-isAdding">Cancel</button>

    `;
  };

  const getDefaultButtons = function(){
    return `
    <button class="js-toggle-isAdding">New BookMark</button>
    <select>
    <option>Filter Min. Rating</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
    </select>
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
      <button class="js-open-link"><a href="${bookmark.url}" target="_blank">Visit Webpage</a></button>
      <button class="js-delete-bookmark">Delete Bookmark</button>
      <p>${bookmark.desc}</p>
      `;
    }
    return `
    <li class="bookmark-element" data-item-id="${bookmark.id}">
    <h3>${bookmark.title}</h3>
    <h4>${bookmark.rating} / 5</h4>
    ${expandedContent}
    </li>
    `;

  };
  const getItemIdFromElement = function(item) {
    return $(item)
    .closest('.bookmark-element')
    .data('item-id');
  };


 //event handlers  
 const handleBookmarkExpand = function(){
    $('.js-bookmarks-list').on('click','.bookmark-element',event=>{
      event.stopPropagation();
      const id =  getItemIdFromElement(event.currentTarget);
      const toExpand = Store.findById(id);
      console.log('test123test.  '+event.currentTarget);
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

  const handleLinkButton = function (){
    $('.js-open-link a').on('click',(event)=>{
      event.preventDefault();
      event.stopPropagation();

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
      yellHere('submit');
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
    handleLinkButton();
    handleDeleteButton();
  };
  //development helper delete after done !!
  const yellHere = function(location ='place'){
    console.log('we are here in ' +location);
  };

  return {
    render,
    bindEventListeners
  };


}();