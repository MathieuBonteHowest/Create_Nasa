'use strict';

// We wait for the Document Object Model to be loaded.
document.addEventListener( 'DOMContentLoaded', function() {
    console.info( 'The document is loaded and the file is linked to the index.html file.');
});

var key = "nQGhQm8MtOQ4mTrszAnbt0NbFBZbZbYWmIJRgPxU";
var date = "2017-11-24";


var url = "https://api.nasa.gov/planetary/apod?api_key="+key+"&date="+date;


$.ajax({
    url: url,
    success: function(result){
        if("copyright" in result) {
            $("#copyright").text("Image Credits: " + result.copyright);
        }
        else {
            $("#copyright").text("Image Credits: " + "Public Domain");
        }

        if(result.media_type == "video") {
            $("#apod_img_id").css("display", "none");
            $("#apod_vid_id").attr("src", result.url);
        }
        else {
            $("#apod_vid_id").css("display", "none");
            $("#apod_img_id").attr("src", result.url);
        }

        console.info(JSON.stringify(result, null, 4));
        $("#apod_explaination").text(result.explanation);
        $("#apod_title").text(result.title);
    }
});


jQuery(document).ready(function($){
    //open popup
    $('.container__picture').on('click', function(event){
        event.preventDefault();
        $('.cd-popup').addClass('is-visible');
    });

    //close popup
    $('.cd-popup').on('click', function(event){
        if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            $('.cd-popup').removeClass('is-visible');
        }
    });
});
