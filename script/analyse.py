import csv
import sys
import json
import math
import termcolor

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

    # Data is a list of dictionaries, where each dictionary is a row.
    # It represents the file we're analysing.

    # Find the columns on which we'll be working because they contain exclusively numbers
    numerical_columns = find_numerical_columns(data)
    # Find outliers in the data
    outliers = find_outliers(data, numerical_columns)
    # Neatly output the outliers to the user via the terminal
    output_outliers(outliers)


def csv_to_dict(filename):
    """
    This function accepts a path to a CSV file and
    creates a list of dictionaries representing it
    Was originally published on Stack Overflow
    (https://stackoverflow.com/questions/29432912/convert-a-csv-dictreader-object-to-a-list-of-dictionaries)
    by Exebit
    I modified it to include type change for numbers
    """
    result_list=[]
    with open(filename) as file_obj:
        reader = csv.DictReader(file_obj)
        for row in reader:
            result_list.append(dict(row))

    # Since all values are considered strings, We must manually change all
    # values that contain only numbers to int or float type
    for row in result_list:
        for item in row:
            if row[item].isdigit():
                row[item] = int(row[item])
            else:
                try:
                    row[item] = float(row[item])
                except:
                    continue
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

def find_outliers(data, numerical_columns):
    """
    Given a data set, this function looks at all numerical columns and for each one
    measures the Z-score of all the values. If the value is above three, the value and
    additional data about it are added to a list that is then returned 

    Output: list of tuples, all structured this way:
    tuple[0] : the category in which this sample is an outlier (column)
    tuple[1] : the actual sample (row)
    tuple[2] : the value in the sample that is an outlier in its category
    tuple[3] : the actual Z-score that makes said value an outsider
    """
    outliers = []
    for column in numerical_columns:
        # Calculate mean of data set
        mean = 0
        standard_deviation = 0
        values_minus_mean = []
        for row in data:
            mean += row[column]
        mean /= len(data)
        # Calculate standard deviation of data set
        for row in data:
            values_minus_mean.append((row[column] - mean)**2)
        standard_deviation = sum(values_minus_mean) / len(data)
        standard_deviation = math.sqrt(standard_deviation)
        
        for row in data:
            z_score = (row[column] - mean) / standard_deviation
            if abs(z_score) > 3:
                outliers.append((column, row, row[column], z_score))
        return outliers

def output_outliers(outliers):
    """
    This function takes in outliers as implemented in
    find_outliers (list of tuples) and neatly prints them
    and other information on the terminal 
    """
    if outliers != []:
        termcolor.cprint("Outliers", 'red')
    else:
        termcolor.cprint("No outliers", 'red')

    # Find all columns that have outliers
    columns_with_outliers = set()
    for sample in outliers:
        columns_with_outliers.add(sample[0])

    for column in columns_with_outliers:
        print("\n")
        termcolor.cprint(column, 'green')
        for sample in outliers:
            if sample[0] == column:
                name = next(iter(sample[1].values()))
                termcolor.cprint(name, end=" |", attrs=["bold"])
                print("Value: ", end="")
                print(sample[3], end=" |")
                print(" Z-score = ", sample[3])
                print("-------------------------")


main()
