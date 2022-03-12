
const BASE_URL = "http://localhost:5000"

async function showCupcakes() {

  const result = await axios.get(`${BASE_URL}/api/cupcakes`);
  const cupcakes = result.data.cupcakes;

  return cupcakes
}

async function populateCupcakes() {
  const cupcakes = await showCupcakes();
  const cont_cupcakes = document.querySelector('#cont-cupcakes');
  cont_cupcakes.innerHTML = '';
  for (const cupcake of cupcakes) {
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const img = document.createElement("img");
    img.src = cupcake.image;
    div2.innerHTML = (`${cupcake.flavor}<br>size ${cupcake.size}<br>rating ${cupcake.rating}/10`);
    div.append(img)
    div.append(div2)
    cont_cupcakes.append(div);
  }
}

async function addCupcake(e) {
  e.preventDefault();
  const flavor = document.getElementById("input-cupcake-flavor").value;
  const size = document.getElementById("input-cupcake-size").value;
  const rating = document.getElementById("input-cupcake-rating").value;
  const image = document.getElementById("input-cupcake-image").value;
  const new_cupcake = { flavor: flavor, size: size, rating: rating, image: image };
  const result = await axios({
    url: `${BASE_URL}/api/cupcakes`,
    method: 'POST',
    data: new_cupcake });
  console.log(result);
  populateCupcakes();
}

document.querySelector("form").addEventListener("submit", addCupcake);

populateCupcakes();
