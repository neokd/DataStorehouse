# This file consiste of 2 functions:
# csvToJSON(csvFilePath,jsonFilePath) - This function converts a CSV file to JSON file.
# combineCSVToJSON(csvFilePath1,csvFilePath2,jsonFilePath) - This function combines 2 CSV files into 1 JSON file.
# txtToCSV(textFilePath, csvFilePath) - This function converts a TXT file to CSV file.

import csv
import json

# Function to convert a CSV to JSON
def csvToJSON(csvFilePath,jsonFilePath):
    data = []
    with open(csvFilePath, 'r', encoding= 'unicode_escape') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)

    with open(jsonFilePath, 'w') as jsonfile:
        json.dump(data, jsonfile, indent=4)

    print('CSV to JSON conversion completed successfully.')

# Function to combine 2 CSV into 1 JSON
def combineCSVToJSON(csvFilePath1,csvFilePath2,jsonFilePath):
    data = []
    with open(csvFilePath1, 'r',encoding= 'unicode_escape') as csvfile1:
        reader1 = csv.DictReader(csvfile1)
        for row in reader1:
            data.append(row)

    with open(csvFilePath2, 'r',encoding= 'unicode_escape') as csvfile2:
        reader2 = csv.DictReader(csvfile2)
        for row in reader2:
            data.append(row)

    data = list({tuple(row.items()) for row in data})

    with open(jsonFilePath, 'w') as jsonfile:
        json.dump(data, jsonfile, indent=4)
    print('CSV to JSON conversion completed successfully.')

# Function to convert a TXT to CSV
def txtToCSV(textFilePath, csvFilePath):
    with open(textFilePath, encoding='utf-8') as f:
        lines = f.readlines()
    lines = [line.strip().split() for line in lines]

    with open(csvFilePath, 'w', newline='') as f:
        writer = csv.writer(f, delimiter=',', quoting=csv.QUOTE_MINIMAL)
        writer.writerows(lines)

    print("TXT to CSV conversion completed successfully.")

def tsvToCSV(tsvFilePath,csvFilePath):
    with open(tsvFilePath,'r+' ) as tsvFile , open(csvFilePath,'w+') as csvFile:
        tsvreader = csv.reader(tsvFile, delimiter='\t')
        csvwriter = csv.writer(csvFile, delimiter=',')
        for line in tsvreader:
            csvwriter.writerow(line)
    print("TSV to CSV conversion completed successfully.")


# Driver Code
if __name__ == '__main__':
    txtFilePath = ''
    csvFilePath = ''
    csvToJSON(txtFilePath,'data.json')
    

