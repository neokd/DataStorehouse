import requests
import json
import os
from bs4 import BeautifulSoup
import time

PROXY_CONNECTION_TIMEOUT = 5  # Timeout value in seconds

class GutenbergScraper:
    def __init__(self):
        """
        Initializes the GutenbergScraper class.
        Loads the proxy list from the local file.
        Loads the last processed book number from the progress file.
        """
        self.proxy_list = self.load_proxy_list()
        self.progress_file = r"script\Scraper\gutenberg\progress.txt"
        self.json_file_path = r"StoreHouse\Literature\gutenberg_bibliographic_records.json"
        self.last_book_number = self.load_progress()
        

    def load_proxy_list(self):
        """
        Loads the proxy list from the local file.
        Returns a list of proxies.
        """
        with open(r"script\proxy\validProxyList.txt", "r") as file:
            proxy_list = file.read().splitlines()
        return proxy_list

    def load_progress(self):
        """
        Loads the last processed book number from the progress file.
        Returns the last book number or 1 if the progress file does not exist.
        """
        if os.path.exists(self.json_file_path):
            print("File exists")
        else:
            # Create a new file
            with open(self.json_file_path, "w") as file:
                file.write('{"data":[\n')
            print("New JSON file created")

        try:
            with open(self.progress_file, "r") as file:
                return int(file.read().strip())
        except FileNotFoundError:
            # create a new file
            with open(self.progress_file, "w") as file:
                pass
            print("New Progress file created")
            return 1
        

    def save_progress(self, book_number, book_data):
        """
        Saves the last processed book number to the progress file.
        """
        #read existing data
        with open(self.json_file_path, "a", encoding="utf-8") as file:
            json.dump(book_data, file, ensure_ascii=False, indent=4)
            file.write(",\n")

        #save the last book_number
        with open(self.progress_file, "w") as file:
            file.write(str(book_number))

    def rotate_proxy(self):
        """
        Rotates the proxy list by moving the first proxy to the end.
        """
        if self.proxy_list:
            proxy = self.proxy_list.pop(0)  # Get the first proxy from the list
            self.proxy_list.append(proxy)

    def get_html_content(self, url, use_proxy=False):
        """
        Fetches the HTML content of the given URL using a rotating proxy if specified.
        Returns the HTML content or None if the request fails.
        """
        try:
            if use_proxy:
                if not self.proxy_list:
                    raise Exception("No valid proxies available.")

                while self.proxy_list:
                    proxy = self.proxy_list[0]  # Get the first proxy from the list
                    proxies = {"http": proxy, "https": proxy}
                    try:
                        response = requests.get(url, proxies=proxies, timeout=PROXY_CONNECTION_TIMEOUT)
                        if response.status_code == 404 : #if page doesn't exist
                            print(f"\nURL not found: {url}. Skipping to next URL.")
                            return 404
                        response.raise_for_status()
                        return response.content
                    except requests.RequestException:
                        print(f"\nFailed to fetch URL: {url} with proxy: {proxy}. Retrying with next proxy.")
                        self.rotate_proxy()
            else:
                response = requests.get(url)
                if response.status_code == 404 : #if page doesn't exist
                    print(f"\nURL not found: {url}. Skipping to next URL.")
                    return 404 #Skip URL and move to next iteration
                response.raise_for_status()
                return response.content
        except requests.RequestException:
            print(f"\nFailed to fetch URL: {url}")
        return None

    def scrape_gutenberg(self):
        """
        Scrapes the Gutenberg website for bibliographic records.
        Fetches the data for each book using consecutive book numbers.
        Stores the data in a JSON file.
        """
        book_number = self.last_book_number
        while True:
            start_time = time.time()
            url = f"https://www.gutenberg.org/ebooks/{book_number}"
            print(url, end ='')
            html_content = self.get_html_content(url)
            if html_content == 404:
                book_number += 1
                continue # if Page couldn't be access move to next URL
            if not html_content:
                html_content = self.get_html_content(url, use_proxy=True)

            if not html_content:
                continue # skip to next URL

            soup = BeautifulSoup(html_content, "html.parser")
            if "No ebook by that number." in soup.find('h1').text.strip():
                break
            
            table = soup.find("table", class_="bibrec")
            author_element = table.find("td").find("a", itemprop="creator").text.strip() if table.find("td").find("a", itemprop="creator") else None
            title_element = table.find("td", itemprop="headline").text.strip() if table.find("td", itemprop="headline") else None
            language_element = table.find("tr", itemprop="inLanguage").find('td').text.strip() if table.find("tr", itemprop="inLanguage").find('td') else None
            category_element = soup.find("td", property="dcterms:type").text.strip() if soup.find("td", property="dcterms:type") else None
            release_date_element = soup.find("td", itemprop="datePublished").text.strip() if soup.find("td", itemprop="datePublished") else None

            book_data = {
                "book_number": book_number,
                "title": title_element,
                "author": author_element,
                "language": language_element,
                "category": category_element,
                "release_date": release_date_element,
                "url": url
            }

            self.save_progress(book_number,book_data)

            book_number += 1
            print(f"     Time taken: {(time.time() - start_time):.2f}s")

        print("Scraping complete. Data stored in gutenberg_bibliographic_records.json.")
        # add } ad the end
        with open(self.json_file_path, "a", encoding="utf-8") as file:
            file.write("}")


        # Remove progress file after scraping is complete
        if os.path.exists(self.progress_file):
            os.remove(self.progress_file)

# Create an instance of the GutenbergScraper class
scraper = GutenbergScraper()

# Run the scraper
scraper.scrape_gutenberg()
