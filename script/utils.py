import csv
import json
import os
import pickle


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

    @staticmethod
    def create_pickle_file(file_path: str) -> None:
        """
        This method checks if the file format is valid. It accepts either CSV or JSON formats.
        If the file format is valid, load the file into memory. After loading the file,
        the code proceeds to create a pickle file.

        Args:
            file_path (str): The path to the CSV/JSON file.
        """
        filename, file_ext = os.path.splitext(file_path)
        print(f"File type: {file_ext}")
        if file_ext == '.csv':
            with open(file_path) as csv_file:
                data = csv_file.readlines()
        elif file_ext == '.json':
            with open(file_path) as json_file:
                data = json.load(json_file)
        else:
            raise ValueError(f"Invalid file format: {file_ext}. Only CSV and JSON are supported.")
        print(f"Converting file with extension: {file_ext}  to a pickle file")
        with open(f'{filename}.pickle', 'wb') as handle:
            pickle.dump(data, handle)


# Driver Code
if __name__ == '__main__':
    file_converter = Utils()
    txt_file_path = '/Users/kuldeep/Project/DataStorehouse/Bucket/NLP and Text Analysis/News Aggregator/newsCorpora.csv'
    csv_file_path = 'newsCorpus.csv'
    file_converter.tsv_to_csv(txt_file_path, csv_file_path)
