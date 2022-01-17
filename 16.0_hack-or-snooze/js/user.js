
"use strict";

let currentUser;


async function login(evt) {
  console.debug("login", evt);
  evt.preventDefault();

  const username = $("#login-username").val();
  const password = $("#login-password").val();

  currentUser = await User.login(username, password);

  $loginForm.trigger("reset");

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
}


async function signup(evt) {
  console.debug("signup", evt);
  evt.preventDefault();

  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();

  currentUser = await User.signup(username, password, name);

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();

  $signupForm.trigger("reset");
}


function logout(evt) {
  console.debug("logout", evt);
  localStorage.clear();
  location.reload();
}


async function checkForRememberedUser() {
  console.debug("checkForRememberedUser");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;

  // try to log in with these credentials (will be null if login failed)
  currentUser = await User.loginViaStoredCredentials(token, username);
}


function saveUserCredentialsInLocalStorage() {
  console.debug("saveUserCredentialsInLocalStorage");
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}


function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");
  hidePageComponents();
  putStoriesOnPage();
  updateNavOnLogin();
  $allStoriesList.show();
}

$loginForm.on("submit", login);
$navLogOut.on("click", logout);
$signupForm.on("submit", signup);
