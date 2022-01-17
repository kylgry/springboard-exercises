
"use strict";


function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}


function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}


function navSubmitStory(evt) {
  console.debug("navSubmitStory", evt);
  hidePageComponents();
  $submitForm.show();
}


function navFavorites(evt) {
  console.debug("navFavorites", evt);
  hidePageComponents();
  $allFavoritesList.show();
  putFavoritesOnPage();
}


function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navSubmit.show();
  $navFavorites.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


$navFavorites.on("click", navFavorites);
$navSubmit.on("click", navSubmitStory);
$navLogin.on("click", navLoginClick);
$body.on("click", "#nav-all", navAllStories);
