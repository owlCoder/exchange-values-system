# Exchange Values System 

## Gettings started

Project provides a basic structure for building a RESTful API using Flask, a popular Python web framework and React.JS (TypeScript) to make modern and flexible application. 

This README will guide you through setting up a virtual environment, installing the required dependencies, and activating it on a Windows system, setting up and running React.JS project.

## Techology Stack
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) 
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Languages
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Windows Terminal](https://img.shields.io/badge/Windows%20Terminal-%234D4D4D.svg?style=for-the-badge&logo=windows-terminal&logoColor=white)

## Supported Browsers
![Brave](https://img.shields.io/badge/Brave-FB542B?style=for-the-badge&logo=Brave&logoColor=white)
![Edge](https://img.shields.io/badge/Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white)
![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)
![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)
![Opera](https://img.shields.io/badge/Opera-FF1B2D?style=for-the-badge&logo=Opera&logoColor=white)
![Safari](https://img.shields.io/badge/Safari-000000?style=for-the-badge&logo=Safari&logoColor=white)

## Dev Dependencies
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)


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

### Activating the Virtual Environment

Before you can run the Flask API, you need to activate your virtual environment.

#### On Windows (PowerShell):

1. Navigate to your project directory in the command prompt or PowerShell.

2. Activate the virtual environment by running the following command:

   ```powershell
   .\venv\Scripts\Activate
   ```

   You should now see the virtual environment name in your command prompt or PowerShell, indicating that it's active.

### Installing Dependencies

To install the required dependencies for this project, you can use the `requirements.txt` file.

1. Make sure your virtual environment is activated (see the next section on how to activate it).

2. Run the following command to install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

### Running the API

To start the Flask API, run the following command within the activated virtual environment:

```bash
flask --app index.py run --debug
```

This will start the development server, and your API will be accessible at `http://localhost:5000/`.

---

# Getting Started with React.JS

This project was bootstrapped with [Vite](youhttps://vitejs.dev/).

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
