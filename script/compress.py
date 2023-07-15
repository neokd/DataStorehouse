'''
  Script to compress large JSON and CSV files
'''
import zipfile
import os

def zip_files(zip_file_path, compression_algorithm, *files):
    if compression_algorithm == 'store':
        compression = zipfile.ZIP_STORED
    else:
        compression = zipfile.ZIP_DEFLATED
    with zipfile.ZipFile(zip_file_path, 'w', compression) as zipf:
        for file in files:
            base_name = os.path.basename(file)
            zipf.write(file, arcname=base_name)


filename = './files/example.csv' # Path of file
compression_algorithm = 'deflate'
path = './files/newfile' 
# path : Path where the new compressed file should be stored and 'newfile' denotes the name of the newly created zip file.

zip_files(path, compression_algorithm, filename)
