import json

with open("script/datasets.json") as file:
    data = json.load(file)

for dataset in data:
    domain = dataset["domain"]
    datasets = dataset["datasets"]
    for title in datasets:
        title = title["title"]
        print(title)