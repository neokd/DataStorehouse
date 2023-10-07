# Proxy Validation Documentation

## Overview

This documentation provides information on a Python script designed to validate the validity of proxy addresses retrieved from a file. The script reads a list of proxy addresses from a file, sends HTTP requests using these proxies, and identifies valid proxies by checking the response status codes. Valid proxies are then stored in a separate file for later use.

## Setup Python Environment 🛠️

Before running the script, you need to set up a Python environment. We recommend using Conda for managing your Python environment. Follow these steps:

- Using Conda:
  1. Create a Conda environment with Python 3.10 by running the following commands in your terminal:
     ```shell
     conda create -n script_venv python=3.10
     conda activate script_venv
     ```
  2. To execute the modules inside the script, install the required dependencies by running:
     ```shell
     pip install -r script/requirements.txt
     ```

## Script Components

The script consists of the following components:

1. **Imports**:
   - `threading`: A Python module for creating and managing threads.
   - `queue`: A Python module for creating thread-safe queues.
   - `requests`: A popular Python library for making HTTP requests.

2. **Initialization**:
   - A queue (`q`) is created to store proxy addresses.
   - An empty list (`validProxy`) is created to store valid proxies.

3. **Read Proxy Addresses**:
   - The script reads proxy addresses from a file called "proxyList.txt" and adds them to the queue (`q`) for processing.

4. **Proxy Validation Function** (`checkProxies`):
   - A function that runs concurrently in multiple threads to check the validity of proxies.
   - Proxies are retrieved from the queue (`q`) one by one.
   - A GET request is made to "http://ipinfo.io/ip" using the proxy with a timeout of 5 seconds.
   - If the response status code is 200, the proxy is considered valid and added to the `validProxy` list.
   - Valid proxies are printed to the console.
   - Exceptions are caught and ignored to continue processing.

5. **Multithreading**:
   - The script creates and starts 10 threads, each running the `checkProxies` function concurrently.

6. **Output**:
   - Valid proxies are written to a file named "validProxyList.txt" for later use.

## Input File - `proxyList.txt`

The input file, "proxyList.txt," contains a list of proxy addresses in the following format:

"proxy_address": "port"


## Output File - `validProxyList.txt`

The output file, "validProxyList.txt," contains a list of valid proxy addresses identified by the script.

## Usage

1. Place the script in the same directory as the input file, "proxyList.txt."

2. Ensure you have the required Python libraries (`threading`, `queue`, `requests`) installed.

3. Activate your Conda environment (if you used Conda) by running `conda activate script_venv`.

4. Run the script.

5. The script will check the validity of the proxy addresses concurrently using multiple threads.

6. Valid proxy addresses will be printed to the console and saved in the "validProxyList.txt" file.

## Recommendations

- Ensure that the input file, "proxyList.txt," contains a list of proxy addresses in the correct format.

- Consider adjusting the number of threads (`for _ in range(10)`) based on your system's capabilities and requirements.

- Modify the script to handle exceptions according to your specific needs.

- Always use proxy addresses responsibly and in compliance with applicable laws and regulations.

## Disclaimer

This script is provided for educational and informational purposes only. Use of proxy addresses may have legal and ethical considerations, and it is essential to respect the policies and terms of service of websites and services you access using proxies.
