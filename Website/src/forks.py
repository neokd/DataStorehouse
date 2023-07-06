import requests

def get_repository_forks(owner, repo):
    url = f"https://api.github.com/repos/{owner}/{repo}"
    response = requests.get(url)
    repository_info = response.json()
    forks_count = repository_info["forks_count"]
    return forks_count

answer = get_repository_forks("neokd", "DataStorehouse")
print(answer)