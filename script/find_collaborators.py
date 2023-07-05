import requests



def fetch_collaborators():
    """
    Find the list of colaborators
    """
    url = "https://api.github.com/repos/neokd/DataStorehouse/collaborators"
    response = requests.get(url, timeout=5)
    collaborators = response.json()
    return collaborators

def fetch_avatar_url(username):
    """
    Find the URLs leading to the images
    """
    url = f"https://api.github.com/users/{username}"
    response = requests.get(url, timeout=5)
    user_info = response.json()
    avatar_url = user_info["avatar_url"]
    return avatar_url

collaborators = fetch_collaborators()
print(collaborators)
for collaborator in collaborators:
    username = collaborator["login"]
    avatar_url = fetch_avatar_url(username)
    print(f"Username: {username}, Avatar URL: {avatar_url}")
