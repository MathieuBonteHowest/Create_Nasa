'use strict';

// We wait for the Document Object Model to be loaded.
document.addEventListener( 'DOMContentLoaded', function() {
    console.info( 'The document is loaded and the file is linked to the index.html file.');
});

var params = {
    container: document.getElementById('lottie'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'data.json'
};

var anim;
anim = lottie.loadAnimation(params);

var key = "nQGhQm8MtOQ4mTrszAnbt0NbFBZbZbYWmIJRgPxU";

var x = 2;

var today = new Date.today();
showPicture(today);

var dateGlobal = today;

$('#prev').on('click', function(){
    var prev = (x).days().ago();
    console.log(prev);
    showPicture(prev);
    x = x + 1;
});

$('#next').on('click', function(){
    var next = dateGlobal.add(1).day();
    showPicture(next);
});

// ---------- TONEN VAN DE AFBEELDING ----------
function showPicture(value) {
    var valueSlice = value.toISOString().slice(0,10);
    var url = "https://api.nasa.gov/planetary/apod?api_key="+key+"&date="+valueSlice;
    $.ajax({
        url: url,
        success: function(result){
            if("copyright" in result) {
                $("#copyright").text("Image Credits: " + result.copyright);
            }
            else {
                $("#copyright").text("Image Credits: " + "Public Domain");
            }

            $("#apod__vid__id").css("display", "none");
            $("#apod__img__id").css("display", "none");
            $(".container").css("display", "none");
            $(".video__container").css("display", "none");


            if(result.media_type == "video") {
                $(".video__container").css("display", "block");
                $("#apod__vid__id").css("display", "block");
                $("#apod__vid__id").attr("src", result.url);
                $(".video__container").css("height", "600px");
                $('.video__container').addClass('is-visible');
            }
            else {
                $(".container").css("display", "block");
                $("#apod__img__id").css("display", "block");
                $("#apod__img__id").attr("src", result.url);
                $('.container').addClass('is-visible');
            }

            // console.info(JSON.stringify(result, null, 4));
            $("#apod__explaination").text(result.explanation);
            $("#apod__title").text(result.title);
            $("#apod__title__mainpage").text(result.title);
            $("#apod__date").text(result.date);

            if(result.date == today.toISOString().slice(0,10)){
                $("#next").css("display", "none");
            }
            else{
                $("#next").css("display", "inline-block");
            }

            setTimeout(loader,3000);

        }

    });
    dateGlobal = value;
}

// ---------- POPUP ----------
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

// ---------- LOADING EFFECT ----------
function loader() {
    $("#lottie").css("display", "none");
}

// ---------- TOGGLE FUNCTION ----------
function nightMode(x, _this) {
    if (_this.checked) {
        x.style.backgroundColor = '#222222';
        document.getElementsByClassName("title")[0].style.color = '#fdfefe';
        document.getElementsByClassName("header__navigation")[0].style.borderBottom = '1px solid #fdfefe';
        document.getElementById("apod__title__mainpage").style.color = '#fdfefe';
        document.getElementById("apod__date").style.color = '#fdfefe';
        document.getElementById("apod__date").style.color = '#fdfefe';
        document.getElementById("nightMode").style.color = '#fdfefe';



    } else  {
        x.style.backgroundColor = '#fdfefe';
        document.getElementsByClassName("title")[0].style.color = '#222222';
        document.getElementsByClassName("header__navigation")[0].style.borderBottom = '1px solid #fdfefe';
        document.getElementById("apod__title__mainpage").style.color = '#222222';
        document.getElementById("apod__date").style.color = '#222222';
        document.getElementById("apod__date").style.color = '#222222';
        document.getElementById("nightMode").style.color = '#222222';
    }
}

