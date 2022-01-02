
$(document).ready(function() {

  console.log("Let's get ready to party with JQuery!");

  $('article img').addClass('image-center');
  $('article p').last().remove();
  $('#title').css("font-size",Math.floor(Math.random()*100)+"px");
  $('ol').append("<li>Another Item</li>");
  $('aside').empty().html("Apologies for this list ...");
  $(".form-control").on("input", function() {
    const r = $('.form-control').eq(0).val();
    const g = $('.form-control').eq(1).val();
    const b = $('.form-control').eq(2).val();
    $("body").css("background-color","rgb("+r+","+g+","+b+")");

  })
  $('img').on("click", function() {
    $(this).remove();
  })

});
