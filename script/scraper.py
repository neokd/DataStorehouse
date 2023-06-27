from bs4 import BeautifulSoup
import requests
import re
import json

with open('./proxy/validProxyList.txt', 'r') as f:
    proxies = f.read().split('\n')

def scrape():
    dataset = []
    for i in range(0, 7818):
        data_found = False
        for proxy in proxies:
            print("On page " + str(i) + " with proxy " + proxy)
            if i == 0:
                rootURL = 'https://huggingface.co/models?sort=downloads'
            else:
                rootURL = f'https://huggingface.co/models?p={i}&sort=downloads'
            try:
                res = requests.get(rootURL, proxies={'http': proxy, 'https': proxy}, timeout=10)
                if res.status_code == 200:
                    soup = BeautifulSoup(res.content, 'html.parser')
                    page_content = soup.find_all('article', class_='overview-card-wrapper group')
                    for content in page_content:
                        a_tag = content.find('a')
                        header_tag = content.find('header').text.strip()
                        last_updated = content.find('time').text.strip()
                        svg1 = content.find('div').text.strip()
          
                        download_info = re.findall(r'([\d.]+[kKMGT]?)', svg1)
                        if len(download_info) == 3:
                            download_field1 =  download_info[2]
                            download_field2 = download_info[1]
                        elif len(download_info) == 4:
                            download_field1 = download_info[3]
                            download_field2 = download_info[2]
                        else:
                            download_field1 = '0'
                            download_field2 = '0'
                        dataset_info = {
                            'header': header_tag,
                            'url': 'https://huggingface.co' + a_tag['href'],
                            'last_updated': last_updated,
                            'likes': download_field1,
                            'downloads': download_field2
                        }
                        dataset.append(dataset_info)
                    with open('dataset.json', 'w') as file:
                        json.dump(dataset, file, indent=4)
                    data_found = True
                    break
            except Exception as e:
                print(e)
                continue
        if data_found:
            print("Moving to the next page..." + str(i+1))
        else:
            print("All proxies failed. Changing proxy...")
            continue

if __name__ == '__main__':
    scrape()
