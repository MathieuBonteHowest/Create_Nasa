'use strict';

// We wait for the Document Object Model to be loaded.
document.addEventListener( 'DOMContentLoaded', function() {
    console.info( 'The document is loaded and the file is linked to the index.html file.');
});

var key = "nQGhQm8MtOQ4mTrszAnbt0NbFBZbZbYWmIJRgPxU";

// var date = "2017-12-1";


var url = "https://api.nasa.gov/planetary/apod?api_key="+key;

// var params = {
//     container: document.getElementById('lottie'),
//     renderer: 'svg',
//     loop: true,
//     autoplay: true,
//     path: 'data.json'
// };
//
// var anim;
//
// anim = lottie.loadAnimation(params);

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
            $("#apod__img__id").css("display", "none");
            $("#apod__vid__id").attr("src", result.url);
            $(".video__container").css("height", "600px");
            $('.video__container').addClass('is-visible');
        }
        else {
            $("#apod__vid__id").css("display", "none");
            $("#apod__img__id").attr("src", result.url);
            $('.container').addClass('is-visible');
        }

        console.info(JSON.stringify(result, null, 4));
        $("#apod__explaination").text(result.explanation);
        $("#apod__title").text(result.title);
        $("#apod__title__mainpage").text(result.title);

        // setTimeout(loader,3000);

    }
});

function loader() {
    $("#lottie").css("display", "none");
}


jQuery(document).ready(function($){
    //open popup
    $('#apod__img__id').on('click', function(event){
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



