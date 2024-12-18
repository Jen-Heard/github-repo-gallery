// Div where my profile information will appear
const overview = document.querySelector(".overview");
const username = "Jen-Heard";
const repoList = document.querySelector(".repo-list");

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
    console.log(repoData);

    repoInfo(repoData);
};
// myRepo();

// Display repo info 
const repoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
            repoItem.classList.add("repo");
            repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
        
    }
};

