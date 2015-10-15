

$(document).on('click','.release-pages .mce-pagination li a', function() {
    
    $('.release-pages .mce-pagination li').removeClass("active");

    $('#pagination'+ $(this).data("id")).addClass("active");
    
    $.get('/artists/get_artistReleases', $.param({ page: $(this).data("id"), a_name: $(this).data("artist") }), function(data){ 
        $('.artist-releases').html(data);
    }, "html");
    
});

$( document ).ready(function() {
    
    $('#pagination1').addClass("active");

});