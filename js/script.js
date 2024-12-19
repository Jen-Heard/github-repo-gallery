// Global variables
// Div where my profile information will appear
const overview = document.querySelector(".overview");
const username = "Jen-Heard";
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

// Link to GitHub API
const gitHubProfile = async function () {
    const profile = await fetch(`https://api.github.com/users/${username}`);
    const data = await profile.json();
    console.log(data);

    displayUserInfo(data);
};

gitHubProfile();

// Display user info 
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> `;
    overview.append(div);

    myRepo();
};

// Fetch repos from GitHub
const myRepo = async function () {
    const fetchRepo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepo.json();
    // console.log(repoData);
    displayRepos(repoData);
};
// myRepo();

// Display repo info 
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
            repoItem.classList.add("repo");
            repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
        
    }
};

// Event listener for clicking on a repo item
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificInfo(repoName);
    }
});

// Pulling specific language info from repos
const specificInfo = async function (repoName) {
    const specificInfoFetch = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificInfoFetch.json();
    console.log(repoInfo);

    const fetchedLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchedLanguages.json();
    console.log(languageData);

    // Create a list of languages used
    const languages = [];
        for (let language in languageData) {
        languages.push(language);
}
// console.log(languages);
specificInfoDisplay(repoInfo, languages);
};

 // Function to display specific repo info
const specificInfoDisplay = function (repoInfo, languages) {
    repoDataSection.innerHTML = "";
    repoDataSection.classList.remove("hide");
    reposSection.classList.add("hide");
    backButton.classList.remove("hide");
    const repoDiv = document.createElement("div");
    repoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoDataSection.append(repoDiv);
};
 
// Event listener for back to repo gallery button
backButton.addEventListener("click", function () {
    reposSection.classList.remove("hide");
    repoDataSection.classList.add("hide");
    backButton.classList.add("hide");
});

// Event listener for search input
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    // console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();

    for (const repo of repos){
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchLowerText)) {
            repo.classList.remove("hide");
       } else {
        repo.classList.add("hide");
       }
    }
});