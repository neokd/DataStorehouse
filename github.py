import requests
from bs4 import BeautifulSoup

class Github:
    @staticmethod
    def get_user_name():
        username = input("Enter GitHub username: ")
        url = f"https://github.com/{username}"
        response = requests.get(url)
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")
            name_element = soup.find("span", class_="p-name")
            
            if name_element:
                name = name_element.get_text().strip()
                print(f"GitHub username: {name}")
            else:
                print("Username not found.")
        else:
            print("Error: Failed to retrieve the GitHub page.")

# Test the script
Github.get_user_name()
