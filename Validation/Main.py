"""
-------------------------------- UNDER DEVELOPMENT -----------------------------------------
                    comment anything you want to change in code
"""

import re
import os
import pandas as pd
import json

def file_type(file_path):
    file_extension = os.path.splitext(file_path)[1].lower()

    if file_extension == '.csv':
        classify_csv(file_path)
        return 'CSV'
    elif file_extension == '.json':
        classify_json(file_path)
        return 'JSON'
    elif file_extension == '.txt':
        classify_text(file_path)
        return 'TXT'
    else:
        return 'Unknown'
    
def classify_text(file_path):
    numeric_count = 0
    text_count = 0

    with open(file_path, 'r') as file:
        for line in file:
            line = line.strip()  
            numeric_pattern = r'^[0-9]+$'
            if re.match(numeric_pattern, line):
                numeric_count += 1
            else:
                text_count += 1

    # if numeric_count > text_count:
    #     return 'Numeric'
    # else:
    #     return 'Text'
    print("Ratio for Text Token to Numeric Token is ",text_count," : ",numeric_count)

def classify_csv(file_path):
    df = pd.read_csv(file_path)

    numeric_columns = 0
    text_columns = 0

    for column in df.columns:
        if pd.to_numeric(df[column], errors='coerce').notnull().all():
            numeric_columns += 1
        else:
            text_columns += 1

    # if numeric_columns > text_columns:
    #     return 'Numeric'
    # else:
    #     return 'Text'
    print("Ratio for Text column to Numeric column is ",text_columns," : ",numeric_columns)

def classify_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)

    numeric_count = 0
    text_count = 0

    def check_type(value):
        if isinstance(value, (int, float)) or (isinstance(value, str) and value.isdigit()):
            return 'Numeric'
        else:
            return 'Text'

    def iterate_json(obj):
        nonlocal numeric_count, text_count
        if isinstance(obj, dict):
            for key, value in obj.items():
                if isinstance(value, (dict, list)):
                    iterate_json(value)
                else:
                    type_result = check_type(value)
                    if type_result == 'Numeric':
                        numeric_count += 1
                    else:
                        text_count += 1
        elif isinstance(obj, list):
            for item in obj:
                if isinstance(item, (dict, list)):
                    iterate_json(item)
                else:
                    type_result = check_type(item)
                    if type_result == 'Numeric':
                        numeric_count += 1
                    else:
                        text_count += 1

    iterate_json(data)

    print("Ratio for Text object to Numeric object is", text_count, ":", numeric_count)

file_path = 'CSE_ABBV.json'
classification = file_type(file_path)
print(f"The file {file_path} is classified as {classification}.")





