////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// DATA
////////////////////////////////////////////////////////////
var strGitHubURL = "https://api.github.com/users/jeffdill2";
var sidebarTemplate = _.template($('#sidebar-template').text());
var repoTemplate = _.template($('#repos-template').text());

$.getJSON(strGitHubURL).done(function(objUserData) {
  $.getJSON([objUserData][0].repos_url).done(function(aryRepoData) {
    renderSidebar([objUserData], aryRepoData);
    renderRepos(aryRepoData);
  });
});

////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// SIDEBAR
////////////////////////////////////////////////////////////
function renderSidebar(aryUserData, aryRepoData) {
  var numStarred = 0;

  aryRepoData.forEach(function(repo) {
    numStarred = numStarred + repo.stargazers_count;
  });

  aryUserData[0]["starred"] = numStarred;

  aryUserData.forEach(function(objUserInfo) {
    $('.sidebar').prepend(sidebarTemplate(objUserInfo));
  });
};

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// REPOS
////////////////////////////////////////////////////////////
function renderRepos(aryRepoData) {
  aryRepoData.forEach(function(objRepo) {
    $('.repos-container').prepend(repoTemplate(objRepo));
  });
};