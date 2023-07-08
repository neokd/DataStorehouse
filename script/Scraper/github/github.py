import requests
from bs4 import BeautifulSoup

class Github:
    def __init__(self,username : str):
        self.username = username

    def scrape_profile(self):
        username = self.username
        url = f"https://github.com/{username}"
        response = requests.get(url)
        response = BeautifulSoup(response.text, "html.parser")
        return response
    
    def get_user_name(self) -> str:
        user_profile = self.scrape_profile()
        try:
            name_element = user_profile.find("span", class_="p-name")
            if name_element:
                name = name_element.get_text().strip()
                return name
            else:
                return "Username not found."
        except Exception as e:
            print(e)
            return "Error: Failed to retrieve the GitHub page."

    def get_profile_pic_url(self) -> str:
        user_profile = self.scrape_profile()
        if 'Not Found' in user_profile.text:
            return f"Username: {self.username} not found!"
        try:
            img_tag = user_profile.find("img", class_="avatar")
            return img_tag['src'] if img_tag.has_attr('src') else f"Invalid image tag: {img_tag}"
        except Exception as e:
            return f"Exception got raised while extracting profile pic for user: {self.username}: {e}"


        
if __name__ == '__main__':
    github = Github('neokd')
    print(github.get_user_name())
    print(github.get_profile_pic_url())
