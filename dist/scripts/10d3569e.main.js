function renderSidebar(a){$(".sidebar").prepend(sidebarTemplate(a))}function renderRepos(a){a.forEach(function(a){$(".repos-container").prepend(repoTemplate(a))})}function sortRepos(a){return _.sortBy(a,function(a){return a.updated_at})}var strAuthKey="?client_id=78c8e5da350c06064ea8&client_secret=d04ea922e60e8d98b965add197b6c7662eb173d6",sidebarTemplate=_.template($("#sidebar-template").text()),repoTemplate=_.template($("#repos-template").text()),strGitHubURL="https://api.github.com/users/jeffdill2"+strAuthKey;$.getJSON(strGitHubURL).done(function(a){$.getJSON(a.starred_url.replace("{/owner}{/repo}","")+strAuthKey).done(function(b){a.starred=b.length,renderSidebar(a)}),$.getJSON(a.repos_url+strAuthKey).done(function(a){renderRepos(sortRepos(a))})});