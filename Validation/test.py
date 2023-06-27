import pandas as pd


def classify_csv(file_path):
    df = pd.read_csv(file_path)

    numeric_columns = 0
    text_columns = 0

    for column in df.columns:
        if pd.to_numeric(df[column], errors='coerce').notnull().all():
            numeric_columns += 1
        else:
            text_columns += 1

    # if numeric_columns > text_columns:
    #     return 'Numeric'
    # else:
    #     return 'Text'
    print("Ratio for Text column to Numeric column is ",text_columns," : ",numeric_columns)

classify_csv('BSE_Companies.csv')