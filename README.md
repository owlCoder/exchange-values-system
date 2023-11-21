# Exchange Values System

This project provides a basic structure for building a RESTful API using Flask, a popular Python web framework and React.JS (TypeScript) to make modern and flexible application. 

This README will guide you through setting up a virtual environment, installing the required dependencies, and activating it on a Windows system, setting up and running React.JS project.

## Table of Contents

- [Getting Started with Flask API](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setting Up a Virtual Environment](#setting-up-a-virtual-environment)
    - [Installing Dependencies](#installing-dependencies)
    - [Activating the Virtual Environment](#activating-the-virtual-environment)
    - [Running the API](#running-the-api)
- [Getting Started with React.JS](#react-js)
    - [Prerequisites](#prerequisites-1)
    - [Installation](#installation)
    - [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- Python 3.x (You can download it from [Python's official website](https://www.python.org/downloads/))
- Node.JS 18.x (You can download it from [Node.JS's official website](https://nodejs.org))

### Setting Up a Virtual Environment

A virtual environment is a clean, isolated environment for your project's dependencies. It's highly recommended to use a virtual environment to manage dependencies for your Flask API project.

1. Open a command prompt or PowerShell in the project's root directory.

2. Install the `virtualenv` package if you haven't already. Run the following command:

   ```bash
   pip install virtualenv
   ```
3. Create a virtual environment by running the following command:

   ```bash
   python -m venv venv
   ```

   This will create a virtual environment named `venv` in your project directory.

### Installing Dependencies

To install the required dependencies for this project, you can use the `requirements.txt` file.

1. Make sure your virtual environment is activated (see the next section on how to activate it).

2. Run the following command to install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

### Activating the Virtual Environment

Before you can run the Flask API, you need to activate your virtual environment.

#### On Windows (PowerShell):

1. Navigate to your project directory in the command prompt or PowerShell.

2. Activate the virtual environment by running the following command:

   ```powershell
   .\venv\Scripts\Activate
   ```

   You should now see the virtual environment name in your command prompt or PowerShell, indicating that it's active.

### Running the API

To start the Flask API, run the following command within the activated virtual environment:

```bash
python index.py
```

This will start the development server, and your API will be accessible at `http://localhost:5000/`.

---

# Getting Started with React.JS

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

Before you begin, ensure you have Node.js and npm installed on your machine.

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Contributing

We welcome contributions to this Flask API project. Please feel free to open issues, submit pull requests, and help us improve this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.