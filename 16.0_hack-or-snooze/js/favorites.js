
"use strict";

async function getStoryFromId(storyId) {

  const response = await axios({
    url: `${BASE_URL}/stories/${storyId}`,
    method: "GET",
  });

  return response.data.story;

}

async function favorite() {

  const li = $(this).parent().parent();
  const storyId = li.attr('id');
  let story = null;

  if (li.parent().attr('id') == "all-stories-list") {
    console.log('true');
    const index = $(this).parent().parent().index();
    story = storyList.stories[index];
  }

  // this function can be called from favorites page as an "undo", and in
  // this case, there may be no full story stored locally, so must request
  // full story from api given storyId

  else {
    story = await getStoryFromId(storyId);
  }

  const response = await currentUser.addFavorite(story);

  saveFavoritesInLocalStorage();

  $(this).text('unfavorite').removeClass("story-favorite").addClass("story-unfavorite");

}


async function unFavorite() {

    const storyId = $(this).parent().parent().attr('id');

  const response = await currentUser.removeFavorite(storyId);

  saveFavoritesInLocalStorage();

  $(this).text('favorite').removeClass("story-unfavorite").addClass("story-favorite");

  // i chose not to immediately delete dom element. this allows user to easily undo
  // and updated list will be shown upon next refresh

}


function saveFavoritesInLocalStorage() {

  localStorage.setItem("favorites", JSON.stringify(currentUser.favorites));

  // console.log(currentUser.favorites);
  // console.log(localStorage.favorites);

}


function putFavoritesOnPage() {

  console.debug("putFavoritesOnPage");

  $allFavoritesList.empty();

  if (currentUser.favorites.length != 0) {

    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $allFavoritesList.append($story);
    }

  }

  $allFavoritesList.show();

}

$allStoriesList.on("click",".story-favorite", favorite);
$allStoriesList.on("click",".story-unfavorite", unFavorite);
$allFavoritesList.on("click",".story-favorite", favorite);
$allFavoritesList.on("click",".story-unfavorite", unFavorite);
