import csv
import sys
import json

def main():
    # Make sure there are two command-line arguments
    if len(sys.argv) != 2:
        raise ValueError("Usage: python analyse.py file_name")
    
    file_name = sys.argv[1]

    # Read a CSV file
    if file_name[-4:] == ".csv":
        data = csv_to_dict(file_name)

    # Read a JSON file
    elif file_name[-5:] == ".json":
        data = json_to_dict(file_name)

    # If the file is neither CSV nor JSON
    else:
        raise ValueError("Only CSV and JSON file format are currently supported")

    # Data is a list of dictionaries, where each dictionary is a row. It represents the file we're analysing

    # Find the columns on which we'll be working because they contain exclusively numbers
    numerical_columns = find_numerical_columns(data)
    print(numerical_columns)


def csv_to_dict(filename):
    """
    This function accepts a path to a CSV file and
    creates a list of dictionaries representing it
    Was originally published on Stack Overflow
    (https://stackoverflow.com/questions/29432912/convert-a-csv-dictreader-object-to-a-list-of-dictionaries)
    by Exebit
    """
    result_list=[]
    with open(filename) as file_obj:
        reader = csv.DictReader(file_obj)
        for row in reader:
            result_list.append(dict(row))
    return result_list

def json_to_dict(filename):
    """
    This function accepts a path to a JSON file and
    creates a list of dictionaries representing it
    """
    with open(filename) as file:
        data = json.load(file)
    return data

def find_numerical_columns(data):
    """
    This function takes in a list of dictionaries (data), and
    returns the keys all to numerical values. It is assumed that if
    data[0][some_key] is a number, then all the values mapped to 
    that key in the other dictionaries will also be numbers.
    """
    numerical_keys = []

    # Add some keys which could be numerical values
    for item in data[0].keys():
        if isinstance(data[0][item], int):
            numerical_keys.append(item)
        if isinstance(data[0][item], float):
            numerical_keys.append(item)

    # Iterate over all said keys and eliminate those that do not always
    # map to numerical values
    to_be_removed = set()
    for row in data:
        for key in numerical_keys:
            if not isinstance(row[key], int) and not isinstance(row[key], float):
                to_be_removed.add(key)
    
    for key in to_be_removed:
        numerical_keys.remove(key)

    return numerical_keys
        


main()
