import csv
import sys

# Read the file into the script
if len(sys.argv) != 2:
    raise ValueError("Usage: python analyse.py file_name")
file_name = sys.argv[1]

# Read a CSV file
if file_name[-4:] == ".csv":
    with open(file_name, 'r') as file:
        reader = csv.DictReader(file)
        print(type(reader))

# Read a JSON file
elif file_name[-5:] == ".json":
    raise NotImplementedError


else:
    raise ValueError("Only CSV and JSON file format are currently supported")
