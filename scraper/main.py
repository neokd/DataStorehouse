# ------ UNDER DEVELOPMENT ------
# This is the main file for the Scraper class
#  - The Scraper class is used to scrape data from a website 
class Scraper:
    def __init__(self,url) -> None:
        self.url = url
    
    def __str__(self) -> str:
        return f"Scraper(url={self.url})"

if __name__ == "__main__":
    scraper = Scraper('https://www.google.com')
    