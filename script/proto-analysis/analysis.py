import sys
import os
import find_outliers

#   This script is an attempt to address issue
#   # 31 by uniting all scripts that analyze data, be it
#   in CSV or JSON file. When called, it prints to the
#   standard output some information about a file.


def main():
    """
    Reads a a path to a file from
    a command-line argument and finds all the information 
    it can about it.
    """
    if len(sys.argv) != 2:
        raise ValueError("Usage: python analysis.py file_path")

    file_path = sys.argv[1]

    ext = os.path.splitext(file_path)[1]

    if ext != '.csv' and ext != '.json':
        raise ValueError("Only supports CSV or JSON files.")

    data = {}

    # Outliers is a list of tuples
    outliers = find_outliers.find_outliers(file_path)
    data.update({"outliers_list" : outliers})

    return data

if __name__ == '__main__':
    main()
