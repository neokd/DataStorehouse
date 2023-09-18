import requests
from bs4 import BeautifulSoup
import json

def fetch_page(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.content
    except requests.RequestException as e:
        print(f"Failed to fetch the page: {e}")
        return None

def scrape_question_data(page_content):
    if not page_content:
        return []

    soup = BeautifulSoup(page_content, "html.parser")

    questions = []

    question_elements = soup.find_all("div", class_="mtq_question")
    for element in question_elements:
        question_label = element.find("div", class_="mtq_question_label").text.strip()
        question_text = element.find("div", class_="mtq_question_text").text.strip()

        answer_table = element.find_next("table", class_="mtq_answer_table")
        options_rows = answer_table.find_all("tr") if answer_table else []
        options = [row.find("div", class_="mtq_answer_text").text.strip() for row in options_rows]

        stamp_element = element.find("div", class_="mtq_stamp")
        stamp_text = stamp_element.text.strip() if stamp_element else ""

        question_data = {
            "label": question_label,
            "question": question_text,
            "options": options,
            "stamp": stamp_text
        }
        questions.append(question_data)

    return questions

def save_as_json(data, filename):
    with open(filename, "w") as json_file:
        json.dump(data, json_file, indent=4)

def scrape_and_save(url, output_filename):
    page_content = fetch_page(url)
    if page_content:
        all_questions = scrape_question_data(page_content)
        save_as_json(all_questions, output_filename)
        print(f"Scraping and saving for {url} completed.")

def main():
    urls = [
        "https://www.geeksforgeeks.org/top-50-data-structures-mcqs-with-answers/"
    ]

    for idx, url in enumerate(urls, start=1):
        output_filename = f"interview_questions_{idx}.json"
        scrape_and_save(url, output_filename)

if __name__ == "__main__":
    main()