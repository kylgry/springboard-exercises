
async function addGif(searchTerm) {
  const data = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`);
  const url = data.data.data[0].images.original.url;
  console.log(url);
  const img = document.createElement('img');
  img.src = url;
  document.getElementById('gifs').append(img);
}

const form = document.getElementById('searchform');
form.addEventListener("submit", function (e) {
  const input = document.getElementById('searchterm');
  e.preventDefault();
  console.log(input.value);
  addGif(input.value);
  input.value = '';
})

const removeAll = document.getElementById('removeall');
removeAll.addEventListener("click", function() {
  document.getElementById('gifs').innerHTML = "";
})
