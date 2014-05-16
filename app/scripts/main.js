////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// DATA
////////////////////////////////////////////////////////////
var sidebarTemplate = _.template($('#sidebar-template').text());
var repoTemplate = _.template($('#repos-template').text());
var strGitHubURL = "https://api.github.com/users/jeffdill2" + strAuthKey;

$.getJSON(strGitHubURL).done(function(objUserData) {
  $.getJSON(objUserData.starred_url.replace("{/owner}{/repo}","") + strAuthKey).done(function(aryStarredData) {
    objUserData["starred"] = aryStarredData.length;

    renderSidebar(objUserData);
  });

  $.getJSON(objUserData.repos_url + strAuthKey).done(function(aryRepoData) {
    renderRepos(sortRepos(aryRepoData));
  });
});

////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// SIDEBAR
////////////////////////////////////////////////////////////
function renderSidebar(objUserData) {
  $('.sidebar').prepend(sidebarTemplate(objUserData));
};

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// REPOS
////////////////////////////////////////////////////////////
function renderRepos(aryRepoData) {
  aryRepoData.forEach(function(objRepo) {
    $('.repos-container').prepend(repoTemplate(objRepo));
  });
};

function sortRepos(aryRepoData) {
  return _.sortBy(aryRepoData, function(repo) {
    return repo.updated_at;
  });
};