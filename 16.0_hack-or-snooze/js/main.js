"use strict";

// dom elements
const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $allFavoritesList = $("#all-favorites-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $submitForm = $("#submit-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $navSubmit = $("#nav-submit");
const $navFavorites = $("#nav-favorites");


// hide all page components
function hidePageComponents() {
  const components = [
    $allStoriesList,
    $allFavoritesList,
    $loginForm,
    $signupForm,
    $submitForm,
  ];
  components.forEach(c => c.hide());
}


// start app
async function start() {
  console.debug("start");
  // look for stored user credentials
  await checkForRememberedUser();
  // load front page stories
  await getAndShowStoriesOnStart();
  // if currentUser exists then display appropriate UI
  if (currentUser) updateUIOnUserLogin();
}


// start app after dom is loaded
$(start);
