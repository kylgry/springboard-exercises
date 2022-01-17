
"use strict";


let storyList;


async function getAndShowStoriesOnStart() {

  storyList = await StoryList.getStories();
  $storiesLoadingMsg.hide();
  putStoriesOnPage();

}


function generateStoryMarkup(story) {

  const hostName = story.getHostName();
  const $story =  $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);

  // extra functions for logged in users

  if (currentUser) {

    // if the story was submitted by current user, they can have option to delete

    if (story.username == currentUser.username) {
      const $delBtn = $('<a href="#" class="del-btn">remove</a>');
      $story.append($delBtn);
    }

    // adds unfavorite link if story is already favorited, else adds favorite link

    if (currentUser.favorites.some(e => e.storyId == story.storyId)) {
      const $unfavorite = $('<a href="#" class="story-unfavorite">unfavorite</a>');
      $story.append($unfavorite);
    }

    else {
      const $favorite = $('<a href="#" class="story-favorite">favorite</a>');
      $story.append($favorite);
    }

  }

  return $story;

}

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


async function submitStory(evt) {

  evt.preventDefault();

  const token = currentUser.loginToken;
  const author = $("#submit-author").val();
  const title = $("#submit-title").val();
  const url = $("#submit-url").val();

  const newStory = await storyList.addStory(token, {author, title, url});

  // i think ideally, stories should be resynced when going back to the main
  // page, maybe something has changed while submitting. in that case,
  // adding to the local stories array is unnecessary, as it should be
  // rebuilt anyway. but for now i will leave original functionality.

  storyList.stories.unshift(newStory);

  $("#submit-author").val("");
  $("#submit-title").val("");
  $("#submit-url").val("");

  // returns user back to front page so they can see their submission
  // i don't think this is the best user experience, but it's simple for now

  hidePageComponents();
  $storiesLoadingMsg.show();
  getAndShowStoriesOnStart();

}


async function removeStory() {

  const storyId = $(this).parent().attr('id');
  const response = storyList.deleteStory(currentUser.loginToken, storyId);
  const index = storyList.stories.findIndex( x => x.storyId == storyId )

  storyList.stories.splice(index,1)
  $(this).parent().remove();

}

$submitForm.on("submit",submitStory);
$allStoriesList.on("click",".del-btn", removeStory)
