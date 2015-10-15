$(document).on('click','.news-pages .mce-pagination li a', function() {
    
    $('.news-pages .mce-pagination li').removeClass("active");
    $('#pagination'+ $(this).data("id")).addClass("active");
    
    $.get('/news/get_newsArticles', $.param({ page: $(this).data("id") }), function(data){ 
        $('.news-artitles').html(data);
    }, "html");
    
});

$( document ).ready(function() {
    
    $('#pagination1').addClass("active");

});