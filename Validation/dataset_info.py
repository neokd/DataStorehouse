import os
import pandas as pd
import numpy as np
import json
import matplotlib.pyplot as plt

# Custom function to convert int64 to int
def convert_int64_to_int(obj):
    if isinstance(obj, np.int64):
        return int(obj)
    raise TypeError

# Function to perform statistical analysis and create plots on columns
def analyze_and_visualize_columns(df):
    column_stats = []
    for column in df.columns:
        null_count = df[column].isnull().sum()
        blank_count = df[column].map(lambda x: str(x).strip() == '').sum()
        data_type = df[column].dtype
        mean_value = None  

        # Calculate the mean for numeric columns
        if data_type in ['int64', 'float64']:
            mean_value = df[column].mean()

            plt.figure(figsize=(8, 6))
            df[column].plot(kind='hist', bins=20, title=f'Histogram for {column}')
            plt.xlabel(column)
            plt.ylabel('Frequency')
            plt.savefig(f'{column}_histogram.png')
            plt.close()

        column_stats.append({
            'Column Name': column,
            'Number of Null Values': null_count,
            'Number of Blank Values': blank_count,
            'Data Type': str(data_type),
            'Mean': mean_value 
        })
    
    return column_stats

# Function to generate dataset report in JSON format
def generate_json_report(dataset_path, column_stats):
    report_data = {
        'Dataset Path': dataset_path,
        'Column Stats': column_stats
    }

    with open('report.json', 'w') as json_file:
        json.dump(report_data, json_file, indent=4, default=convert_int64_to_int)  # Use custom conversion

# Function to generate dataset report in CSV format
def generate_csv_report(column_stats):
    df = pd.DataFrame(column_stats)
    df.to_csv('report.csv', index=False)

# Function to generate dataset report in TXT format
def generate_txt_report(column_stats):
    with open('report.txt', 'w') as txt_file:
        txt_file.write("************ VALIDATION REPORT OF UPLOADED DATASET ************\n\n")
        # Write column-wise analysis and statistics to the TXT report
        for stats in column_stats:
            txt_file.write(f"Column Name: {stats['Column Name']}\n")
            txt_file.write(f"Number of Null Values: {stats['Number of Null Values']}\n")
            txt_file.write(f"Number of Blank Values: {stats['Number of Blank Values']}\n")
            txt_file.write(f"Data Type: {stats['Data Type']}\n")
            
            # Add the mean to the report
            if 'Mean' in stats:
                txt_file.write(f"Mean: {stats['Mean']}\n")

            txt_file.write("---\n\n")

# Main function
def main():
    dataset_path = input("Enter the directory path of the dataset: ")
    if not os.path.exists(dataset_path):
        print("The specified directory does not exist.")
        return

    # Read the dataset into a DataFrame (modify the read_csv options as needed)
    df = pd.read_csv(os.path.join(dataset_path, 'homeprices_banglore.csv'))

    # Perform statistical analysis and create plots on columns
    column_stats = analyze_and_visualize_columns(df)

    # Generate reports in different formats
    generate_json_report(dataset_path, column_stats)
    generate_csv_report(column_stats)
    generate_txt_report(column_stats)

    print("Report generated successfully.")
    
    
    
    # Calculate basic statistics for numeric columns
    # numeric_stats = df.describe()    // on analyzing these statistical values you can judge whether this dataset would be useful for you or not in a particular project!!

if __name__ == "__main__":
    main()
