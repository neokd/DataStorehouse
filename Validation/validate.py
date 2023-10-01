"""
-------------------------------- UNDER DEVELOPMENT -----------------------------------------
                    
"""

import re
import os
import subprocess
import click
import pandas as pd
import numpy as np
import json
import platform

REPORT_FILE = 'Report.txt'

def open_report(file_path):
     with open(REPORT_FILE, 'a') as file:
          file.write(file_path)

def analyze_file(file_path):
    file_extension = os.path.splitext(file_path)[1].lower()
    size = os.path.getsize(file_path)

    open_report('************ VALIDATION REPORT OF UPLOADED FILE ************')
    open_report(f'FILE TYPE: {file_extension.upper()}')
    open_report(f'FILE SIZE: {size/1000} KB')

    if file_extension == '.csv':
        classify_csv(file_path)
        count_null_blank(file_path)
    elif file_extension == '.json':
        classify_json(file_path)
    elif file_extension == '.txt':
        classify_text(file_path)
    else:
        open_report('FILE TYPE: UNKNOWN')
    
    
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

    open_report(f'Ratio for Text Token to Numeric Token is: {text_count} : {numeric_count}\n')


def classify_csv(file_path):
    df = pd.read_csv(file_path)

    numeric_columns = 0
    text_columns = 0

    for column in df.columns:
        if pd.to_numeric(df[column], errors='coerce').notnull().all():
            numeric_columns += 1
        else:
            text_columns += 1

    open_report(f'Ratio for Text column to Numeric column is: {text_columns} : {numeric_columns}\n')

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
    open_report(f'Ratio for Text Object to Numeric Object is : {text_count} : {numeric_count}\n\n')


def count_null_blank(csv_file):
    df = pd.read_csv(csv_file)
    column_stats = []

    for column in df.columns:
        null_count = df[column].isnull().sum()
        blank_count = df[column].map(lambda x: str(x).strip() == '').sum()
        data_type = df[column].dtype
        q1=median=q3=iqr=bias=skewness=skew=0
        if data_type=='int64'or data_type=='float64':
            values = df[column].dropna()
            sorted_values = np.sort(values)
            no_of_values = len(sorted_values)
            q1_index = int(0.25 * (no_of_values + 1))
            q3_index = int(0.75 * (no_of_values + 1))
            if(q1_index!=0 or q3_index!=0):
                q1 = sorted_values[q1_index - 1]
                q3 = sorted_values[q3_index - 1]
                iqr = q3 - q1
                bias = (q3 - q1) / (q3 + q1)
                median = np.median(values)   #q2
                skewness = 3 * (median - np.mean(values)) / np.std(values)
                if((q3-median)<(median-q1)):
                    skew="Negative Skew"
                else:
                    skew="Positive Skew"
        column_stats.append((column, null_count, blank_count, data_type,q1,median,q3,iqr,bias,skewness,skew))
    
    
    open_report('------ COLUMN WISE ANALYSIS ------\n')
    for column, null_count, blank_count, data_type,q1,median,q3,iqr,bias,skewness,skew in column_stats:
        open_report(f'Column Name : {column}\n')
        open_report(f'Number of Null Values : {null_count}\n')
        open_report(f'Number of Blank Values : {blank_count}\n')
        open_report(f'Data type of column : {data_type}\n')
        open_report(f'Quartile 1 Value : {q1}\n')
        open_report(f'Quartile 2 Value : {median}\n')
        open_report(f'Quartile 3 Value : {q3}\n')
        open_report(f'InterQuartile Range : {iqr}\n')
        open_report(f'Bias : {bias}\n')
        open_report(f'Skewness Value: {skewness}\n')
        open_report(f'Skew Result : {skew}\n')
        open_report('---\n\n')


def main():
    while True:
        current_directory = os.getcwd()
        file_list = os.listdir(current_directory)

        valid_extensions = ('.csv', '.json')
        valid_files = [file for file in file_list if file.endswith(valid_extensions)]

        if valid_files:
            print("Available CSV and JSON files in the current directory:")
            for i, file_name in enumerate(valid_files, start=1):
                print(f"{i}. {file_name}")

            print("0. Exit")  # Add an option to exit

            selection = click.prompt("Enter the number of the file to analyze or 0 to exit", type=int)

            if selection == 0:  # Exit if the user enters 0
                print("Exiting prompt.")
                break
            elif 1 <= selection <= len(valid_files):
                selected_file = valid_files[selection - 1]
                file_path = os.path.join(current_directory, selected_file)

                with open('Report.txt', 'w') as report_file:
                    report_file.write('')
                analyze_file(file_path)
                with open('Report.txt', 'a') as report_file:
                    report_file.write('\n\n\nREMARKS:\n')
                    report_file.write('\tThe Quartile, Bias, and Skewness are only calculated for Numeric Columns and No Null and No Blank Columns.\n')
                    report_file.write('\nNOTE: *This is an AutoGenerated Analysis Report, the Values May Differ by the method of calculation and file neatness\n')
                    report_file.write("\t@ DATA STOREHOUSE\n")
                print("The Report is updated in 'Report.txt' file...")

                if platform.system() == 'Darwin':
                    subprocess.run(['open', 'Report.txt'])
                elif platform.system() == 'Windows':
                    subprocess.run(['start', 'Report.txt'], shell=True)
                else:
                    subprocess.run(['xdg-open', 'Report.txt'])
            else:
                print("Invalid selection.")
        else:
            print("No CSV or JSON files found in the current directory.")

if __name__ == "__main__":
    main()

