import os
import json
import datetime
from nanoid import generate

def file_size(filename):
    file_size = os.path.getsize(filename)
    if file_size >= 1024 * 1024 * 1024:
        return str(round(file_size / (1024 * 1024 * 1024), 2)) + " GB"
    elif file_size >= 1024 * 1024:
        return str(round(file_size / (1024 * 1024), 2)) + " MB"
    else:
        return str(round(file_size / 1024, 2)) + " KB"

def get_file_metadata(filename):
    file_type = os.path.splitext(filename)[1] 
    modified_time = os.path.getmtime(filename)
    modified_time = datetime.datetime.fromtimestamp(modified_time).strftime("%Y/%m/%d")
    creation_time = os.path.getctime(filename)
    creation_time = datetime.datetime.fromtimestamp(creation_time).strftime("%Y/%m/%d")
    file_type = file_type[1:].upper()
    return file_type, modified_time, creation_time

def get_dataset_info(directory):
    datasets = []
    filenames = {}  # To keep track of duplicate filenames
    for file in os.listdir(directory):
        file_path = os.path.join(directory, file)
        if not file.startswith('.') and os.path.isfile(file_path):  # Ignore hidden files and directories
            file_type, modified_time, creation_time = get_file_metadata(file_path)
            file_size_str = file_size(file_path)
            if file in filenames:
                # Append the file extension to the existing file type list
                filenames[file].append(file_type)
            else:
                filenames[file] = [file_type]
            
            github_path = "https://github.com/neokd/DataBucket/blob/Website" + directory.strip('.') + "/" + file
            dataset = {
                "id": generate(size=10),
                "title": os.path.splitext(file)[0],
                "description": "",
                "githubPath": github_path,
                "contributor": "",
                "added": creation_time,
                "updated": modified_time,
                "size": file_size_str,
                "tag": [],
                "fileType": filenames[file] if len(filenames[file]) > 1 else file_type
            }
            datasets.append(dataset)
    return datasets

def generate_dataset_json(directory):
    domains = []
    for dir in os.listdir(directory):
        domain_dir = os.path.join(directory, dir)
        if not dir.startswith('.') and os.path.isdir(domain_dir):
            domain = {
                "domain": dir,
                "datasets": get_dataset_info(domain_dir)
            }
            domains.append(domain)
    return domains

if __name__ == '__main__':
    directory = "./Bucket"  # Replace with the actual directory path
    dataset_json = generate_dataset_json(directory)
    json_output = json.dumps(dataset_json, indent=4)
    print(json_output)
