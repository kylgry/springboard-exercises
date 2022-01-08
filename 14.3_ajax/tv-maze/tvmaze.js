/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */

async function searchShows(query) {

  const results = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
  const shows = [];

  for (result of results.data) {
    shows.push({
                  id: result.show.id,
                  name: result.show.name,
                  summary: result.show.summary,
                  image: result.show.image ? result.show.image.medium : 'https://tinyurl.com/tv-missing'
              })
  }

  return shows;

}

async function getEpisodes(id) {

  const results = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  const episodes = [];

  for (result of results.data) {
    episodes.push({
                  id: result.id,
                  name: result.name,
                  season: result.season,
                  number: result.number
              })
  }

  return episodes;

}

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <img class="card-img-top" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
           <input type="button" value="Show Episodes" class="show-episodes" />
         </div>
       </div>`
     );

    $showsList.append($item);
  }
}

function populateEpisodes(episodes) {

  const $epList = $("#episodes-list");
  $epList.empty();

  for (let ep of episodes) {
    let $item = $(
      `<li>S${ep.season}E${ep.number}, ${ep.name}</li>`
    );

    $epList.append($item);
  }

  $("#episodes-area").show();

}

$("#search-form").on("submit", async function handleSearch (evt) {

  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);

});

$("#shows-list").on("click", ".show-episodes", async function handleEpisodes () {

  const episodes = await getEpisodes($(this).parent().data("show-id"));
  populateEpisodes(episodes);

})
