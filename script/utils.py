import csv
import json

class Utils:
    """
    Converts files between different formats.
    """

    @staticmethod
    def csv_to_json(csv_file_path, json_file_path):
        """
        Converts a CSV file to a JSON file.

        Args:
            csv_file_path (str): The path to the CSV file.
            json_file_path (str): The path to the JSON file.
        """
        data = []
        with open(csv_file_path, 'r', encoding='unicode_escape') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                data.append(row)

        with open(json_file_path, 'w') as jsonfile:
            json.dump(data, jsonfile, indent=4)

        print('CSV to JSON conversion completed successfully.')

    @staticmethod
    def combine_csv_to_json(csv_file_path1, csv_file_path2, json_file_path):
        """
        Combines two CSV files into one JSON file.

        Args:
            csv_file_path1 (str): The path to the first CSV file.
            csv_file_path2 (str): The path to the second CSV file.
            json_file_path (str): The path to the JSON file.
        """
        data = []
        with open(csv_file_path1, 'r', encoding='unicode_escape') as csvfile1:
            reader1 = csv.DictReader(csvfile1)
            for row in reader1:
                data.append(row)

        with open(csv_file_path2, 'r', encoding='unicode_escape') as csvfile2:
            reader2 = csv.DictReader(csvfile2)
            for row in reader2:
                data.append(row)

        data = list({tuple(row.items()) for row in data})

        with open(json_file_path, 'w') as jsonfile:
            json.dump(data, jsonfile, indent=4)
        
        print('CSV to JSON conversion completed successfully.')

    @staticmethod
    def txt_to_csv(text_file_path, csv_file_path):
        """
        Converts a TXT file to a CSV file.

        Args:
            text_file_path (str): The path to the TXT file.
            csv_file_path (str): The path to the CSV file.
        """
        with open(text_file_path, encoding='utf-8') as f:
            lines = f.readlines()
        lines = [line.strip().split() for line in lines]

        with open(csv_file_path, 'w', newline='') as f:
            writer = csv.writer(f, delimiter=',', quoting=csv.QUOTE_MINIMAL)
            writer.writerows(lines)

        print("TXT to CSV conversion completed successfully.")

    @staticmethod
    def tsv_to_csv(tsv_file_path, csv_file_path):
        """
        Converts a TSV file to a CSV file.

        Args:
            tsv_file_path (str): The path to the TSV file.
            csv_file_path (str): The path to the CSV file.
        """
        with open(tsv_file_path, 'r+') as tsv_file, open(csv_file_path, 'w+') as csv_file:
            tsv_reader = csv.reader(tsv_file, delimiter='\t')
            csv_writer = csv.writer(csv_file, delimiter=',')
            for line in tsv_reader:
                csv_writer.writerow(line)

        print("TSV to CSV conversion completed successfully.")

    

# Driver Code
if __name__ == '__main__':
    file_converter = Utils()
    txt_file_path = '/Users/kuldeep/Project/DataStorehouse/Bucket/NLP and Text Analysis/News Aggregator/newsCorpora.csv'
    csv_file_path = 'newsCorpus.csv'
    file_converter.tsv_to_csv(txt_file_path, csv_file_path)
