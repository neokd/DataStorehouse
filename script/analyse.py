import csv
import sys

if len(sys.argv) != 2:
  print("Usage: python analyse.py file_name")
  return 1
file_name = sys.argv[1]
with open(file_name, 'r') as file:
  reader = csv.DictReader(file)
  print(type(reader))
