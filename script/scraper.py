from bs4 import BeautifulSoup
import requests
import re
import json

with open('./proxy/validProxyList.txt', 'r') as f:
    proxies = f.read().split('\n')

def scrape_page(page_url, proxy):
    dataset = []
    try:
        print(f'Using proxy {proxy}')
        res = requests.get(page_url, proxies={"http": proxy, "https": proxy}, timeout=10)
        soup = BeautifulSoup(res.content, 'html.parser')

        page_content = soup.find_all('article', class_='overview-card-wrapper group')
        for content in page_content:
            a_tag = content.find('a')
            header_tag = content.find('header').text.strip()
            last_updated = content.find('time').text.strip()
            svg1 = content.find('div').text.strip()
            download_info = re.findall(r'([\d.]+[KMGT]?)', svg1)
            download_field1 = download_info[0] if len(download_info) >= 1 else '0'
            download_field2 = download_info[1] if len(download_info) >= 2 else '0'
            dataset_info = {
                'header': header_tag,
                'url': 'https://huggingface.co' + a_tag['href'],
                'last_updated': last_updated,
                'download': download_field1,
                'likes': download_field2
            }
            dataset.append(dataset_info)
            print('\n-------------------\n')
            print("Done")
            print('\n-------------------\n')
            return True 

    except requests.exceptions.RequestException as e:
        print(f"Proxy Error: {e}")

    return False 

def scrape():
    dataset = []
    for i in range(1, 7818):
        data_found = False 
        for proxy in proxies:
            if i == 1:
                page_url = 'https://huggingface.co/models?sort=downloads'
            else:
                page_url = f'https://huggingface.co/models?p={i}&sort=downloads'

            if scrape_page(page_url, proxy):
                data_found = True  
                break 

        if not data_found:
            print("All proxies failed. Changing proxy...")
            continue
        print("Moving to the next page..." + str(i))
        
    with open('datasets.json', 'w') as file:
        json.dump(dataset, file, indent=4)

if __name__ == '__main__':
    scrape()
