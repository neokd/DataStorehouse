async function getForksCount(owner, repo) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    const data = await response.json();
    const forksCount = data.forks_count;
    return forksCount;
  } catch (error) {
    console.error('Error:', error);
  }
}
