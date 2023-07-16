<div style="text-align:center">

# DataStorehouse 🚀

DataStorehouse is an open-source project that aims to create a collaborative platform for gathering and sharing a wide variety of datasets. It provides a centralized repository where individuals and organizations can contribute, discover, and collaborate on diverse datasets for various domains. 📊📚

</div>

## Table of contents
* [Requirements](#requirements)
* [Setup](#setup)
* [Configuration](#configuration)
* [Usage](#usage)



## Requirements
To run this project locally, you need to have the following software installed on your machine:

>Node.js (v12 or higher)

>Python (v3.6 or higher)

>pip (Python package manager)


## Setup
To set up this project follow these steps:
1. Clone the repository from GitHub: `git clone https://github.com/neokd/DataStorehouse.git`

2. Navigate to the project's directory: `cd DataStorehouse`

3. Install the JavaScript dependencies by running the following command in the terminal:` npm install`

4. Create a virtual environment for Python:` python -m venv venv`

5. Activate the virtual environment:

>For Windows:` venv\Scripts\activate`

>For macOS/Linux:` source venv/bin/activate`

6.Install the Python dependencies: ` pip install -r requirements.txt`



## Configuration
Before running the application, you need to configure some settings.

- Rename the ~~.env.example~~ file to .env.

- Open the .env file and set the required environment variables.
  For example:


>API_PORT=3306

>DATABASE_URL=mysql://username:password@localhost/mydb

- Adjust the values according to your setup.

## Usage
To start the application, follow these steps:

1. Make sure you have activated the virtual environment (if not already activated).

2. In one terminal, start the Python backend server: ` python app.py`

3. In another terminal, start the JavaScript frontend: ` npm start`

4. Open your web browser and visit http://localhost:3000 to access the application.


## License 📝
This project is licensed under the [MIT License] (./LICENSE.md).