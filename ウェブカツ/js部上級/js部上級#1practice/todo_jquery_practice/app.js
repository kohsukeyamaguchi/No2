$('.js-add-todo').on('click',function(e){
    e.preventDefault();
    
    var text = $('.js-get-val').val();
    $('.js-get-val').val('');
    
    if(!text){
        $('.js-toggle-error').show();
        return;
    }
    
    $('.js-toggle-error').hide();
    
    var listItem = '<li class="list__item js-todo_list-item" data-text="' + text + '">' +
    '<i class="fa fa-square-o icon-check js-click-done" aria-hidden="true"></i>' +

    '<span class="js-todo_list-text">' + text + '</span>' +
    '<input type="text" class="editText js-todo_list-editForm" value="' + text + '">' +
    '<i class="fa fa-trash icon-trash js-click-trash" aria-hidden="true"></i>' +
    '</li>';
    
    $('.js-todo_list').prepend(listItem);
});

//後からprependなどで追加したDOMを操作するときは、class名では適用されないので、documentを使用すること
$(document).on('click', '.js-click-done', function(){

  $(this).removeClass('fa-square-o').addClass('fa-check-square')
    .removeClass('js-click-done').addClass('js-click-todo')
    .closest('.js-todo_list-item').addClass('list__item--done');

  // parentは１階層上の〜という探し方
  // closestは一番近い親の〜という探し方

});

$(document).on('click', '.js-click-todo', function(){

  $(this).addClass('fa-square-o').removeClass('fa-check-square')
    .addClass('js-click-done').removeClass('js-click-todo')
    .closest('.js-todo_list-item').removeClass('list__item--done');

});
$(document).on('click','.js-click-trash',function(){
   
    $(this).closest('.js-todo_list-item').fadeOut('slow',function(){
       this.remove(); 
    });
});

$(document).on('click','js-todo_list-text',function(){
    $(this).hide().siblings('.js-todo_list-editForm').show();
});

$(document).on('keyup','js-todo_list-editForm',function(e){
   
    if(e.keyCode === 13 && e.shiftKey === true){
        var $this = $(this);
        $this.hide().siblings('.js-todo_list-text').text($this.val()).show()
        .closest('.js-todo_list-item').attr('data-text', $this.val());
    }
});

$('.js-search').on('keyup',function(){
    var searchText = $(this).val();
    
    $('.js-todo_list-item').show().each(function(indexNumber,element){
       var text = $(element).data('text');
       var regexp = new RegExp('^' + searchText);
        
        if(text && text.match(regexp)){
            return true;
        }
        $(element).hide();
    });
});