import os
from bs4 import BeautifulSoup
import json
import re

# Specify the path to your XML corpus file
xml_file = "/Users/kuldeep/Downloads/hiwiki-20230601-pages-articles-multistream.xml"

# Read the XML file
with open(xml_file, "r", encoding="utf-8") as f:
    xml_data = f.read()

soup = BeautifulSoup(xml_data, "xml")
data = []
count = 0

# Iterate over the page elements to extract data
for page in soup.find_all("page"):
    # Find the redirect element
    redirect_element = page.find("redirect")
    if redirect_element is not None:
        continue  # Ignore redirect pages

    # Extract title
    title_element = page.find("title")
    if title_element is not None and title_element.text:
        title = title_element.text
        # Extract text
        text_element = page.find("text")
        if text_element is not None and text_element.text:
            text = text_element.text
            soup_text = BeautifulSoup(text, "html.parser")
            text = soup_text.get_text()
            text = re.sub(r"http\S+|www\S+|https\S+", "", text, flags=re.MULTILINE)
            data.append({"title": title, "text": text.strip()})
            count += 1
            print(f"Processed {count} pages.")
json_data = json.dumps(data, ensure_ascii=False, indent=4)

# Maximum file size in bytes (500 MB)
max_file_size = 500 * 1024 * 1024

# Calculate the maximum number of pages per file based on the file size
max_pages_per_file = max_file_size // (len(json_data.encode("utf-8")) // len(data))

# Create a directory to store the output files
output_directory = "output"
os.makedirs(output_directory, exist_ok=True)
chunks = [data[i:i+max_pages_per_file] for i in range(0, len(data), max_pages_per_file)]

for i, chunk in enumerate(chunks):
    # Convert the chunk to JSON format
    json_chunk = json.dumps(chunk, ensure_ascii=False, indent=4)
    json_file = f"output_{i}.json"
    with open(os.path.join(output_directory, json_file), "w", encoding="utf-8") as f:
        f.write(json_chunk)
    file_size = os.path.getsize(os.path.join(output_directory, json_file))
    print(f"Created {json_file} (Size: {file_size} bytes)")
