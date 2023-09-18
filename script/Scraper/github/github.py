import re

import requests
from bs4 import BeautifulSoup


class GithubScraper:
    def __init__(self, username: str):
        self.username = username

    @staticmethod
    def scrape_data_by_url(url: str) -> BeautifulSoup:
        response = requests.get(url)
        return BeautifulSoup(response.text, "html.parser")

    def scrape_profile(self) -> BeautifulSoup:
        url = f"https://github.com/{self.username}"
        return self.scrape_data_by_url(url)

    def scrape_readme(self) -> BeautifulSoup:
        url = f"https://raw.githubusercontent.com/{self.username}/{self.username}/master/README.md"
        return self.scrape_data_by_url(url)
    
    def get_total_starred_repositories(self) -> int:
        url = f"https://api.github.com/users/{self.username}/starred"
        response = requests.get(url)
        if response.status_code == 200:
            starred_repos = response.json()
            total_starred_repos = len(starred_repos)
            return int(total_starred_repos)
        return None

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

    def get_bio(self) -> str:
        user_profile = self.scrape_profile()
        try:
            bio_element = user_profile.find("div", class_="user-profile-bio")
            if bio_element:
                return bio_element.get_text().strip()
            else:
                return "Bio not found."
        except Exception as ex:
            print(ex)
            return "Error: Failed to retrieve the Github page"

    def get_readme(self) -> str:
        try:
            response = self.scrape_readme()
            readme_text = response.get_text()
            readme_text = '\n'.join([line for line in readme_text.splitlines() if line.strip()])
            return readme_text
        except Exception as err:
            return f"Exception raised in get_readme(): {err}"

    def get_location(self) -> str:
        user_profile = self.scrape_profile()
        try:
            location_element = user_profile.select('ul.vcard-details li[itemprop="homeLocation"]')
            if location_element is not None:
                return location_element[0].find('span', class_='p-label').get_text().strip()

        except Exception as ex:
            print(ex)
            print("Error: Failed to fetch location.")

    def get_socials(self) -> dict:
        user_profile = self.scrape_profile()
        try:
            social_li_elements = user_profile.select('ul.vcard-details li')
            social_media_urls = {}

            for li_element in social_li_elements:
                link_element = li_element.find('a')
                if link_element is not None:
                    social_media_url = link_element['href']
                    social_media_platform_match = re.search(r'(?<=://)(.*?)(?=/|$)', social_media_url)
                    if social_media_platform_match:
                        social_media_platform = social_media_platform_match.group().split('.')[-2]
                        social_media_urls[social_media_platform] = social_media_url

            return social_media_urls
        except Exception as ex:
            print(ex)
            return "Error: Failed to fetch socials."
        
    def get_user_organizations(self) -> list:
        user_profile = self.scrape_profile()
        try:
            org_elements = user_profile.select('a.avatar-group-item')
            organizations = []
            for org_element in org_elements:
                href_value = org_element.get('href', '').strip()
                if href_value.startswith('/'):
                    href_value = href_value[1:]
                if href_value:
                    organizations.append(href_value)
            return organizations
        except Exception as ex:
            print(ex)
            return "Error: Failed to fetch organizations"


    def get_user_achievements(self) -> str:
        user_profile = self.scrape_profile()
        try:
            achievement_elements = user_profile.select('img.achievement-badge-sidebar')
            achievements = set()
            for achievement_element in achievement_elements:
                alt_value = achievement_element.get('alt', '').strip()
                if alt_value.startswith('Achievement'):
                    alt_value = alt_value[len('Achievement: '):]
                if alt_value:
                    achievements.add(alt_value)
            return list(achievements)
        except Exception as ex:
            print(ex)
            return "Error: Failed to fetch achievements"


    

    def get_total_repositories(self) -> int:
   
        base_url = f"https://api.github.com/users/{self.username}"

        try:
            response = requests.get(base_url)
            response.raise_for_status()
            user_data = response.json()

            total_repositories = user_data.get("public_repos", 0)
            return total_repositories

        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
            return None



if __name__ == '__main__':
    github = GithubScraper('neokd')
    print(github.get_total_starred_repositories())
    
