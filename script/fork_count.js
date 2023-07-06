// This won't expand well, at some point, if there's too 
// much traffic on the website Github is going to
// require

async function getForksCount(owner, repo) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    const data = await response.json();
    const forksCount = data.forks_count;
    return forksCount;
  } catch (error) {
    console.log("Error while fetching the number of forks of the repository")
    console.error('Error:', error);
  }
}
