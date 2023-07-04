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
        raise NotImplementedError


    else:
        raise ValueError("Only CSV and JSON file format are currently supported")

    # Data is a list of dictionaries, where each dictionary is a row. It represents the file we're analysing

# This function comes from Stack Overflow: 
# https://stackoverflow.com/questions/29432912/convert-a-csv-dictreader-object-to-a-list-of-dictionaries
# This solution was published by a user called "Exebit"
def csv_to_dict(filename):
    result_list=[]
    with open(filename) as file_obj:
        reader = csv.DictReader(file_obj)
        for row in reader:
            result_list.append(dict(row))
    return result_list


main()
