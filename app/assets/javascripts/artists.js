

$(document).on('click','.release-pages .mce-pagination li a', function() {
    
    $('.release-pages .mce-pagination li').removeClass("active");

    $('#pagination'+ $(this).data("id")).addClass("active");
    
    // GET
    $.get('/artists/get_artistReleases', $.param({ page: $(this).data("id"), a_name: $(this).data("artist") }), function(data){ 
        
        $('.artist-releases').html(data);
    }, "html");
    
    // AJAX
    /*$.ajax({
      url: "/artists/get_artistReleases",
      type: "get", //send it through get method
      data:{page: $(this).data("id") , a_name: $(this).data("artist")},
      success: function(response) {
        $('.artist-releases').html(response);
       
      },
      error: function(xhr) {
        console.log(xhr);
      }
    });*/
});

$( document ).ready(function() {
    
    //$('#pagination1').addClass("active");

});