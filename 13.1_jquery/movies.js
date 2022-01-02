$('button').on("click", function(form){
  form.preventDefault();
  const title = $('#title').val();
  const rating = $('#rating').val();
  const delBtn = $('<button>').addClass("delete").text('x');
  const newItem = $('<li>').html(rating + " " + title)
  newItem.append(delBtn);
  newItem.appendTo('ul')
})

$('ul').on("click",".delete", function() {
  $(this).parent().remove()
})
