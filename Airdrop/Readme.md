# LoLFun Coin Airdrop

Welcome to the LoLFun Coin Airdrop repository! This project contains all the necessary files and instructions to set up and run the airdrop mechanism for the LoLFun Coin.

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Dependencies](#dependencies)
4. [Setup Instructions](#setup-instructions)
5. [File Explanations](#file-explanations)
6. [Running the Project](#running-the-project)
7. [Security Considerations](#security-considerations)
8. [Conclusion](#conclusion)

## Introduction

The LoLFun Coin Airdrop project aims to distribute 20% of the total coin supply (100,000,000 LoLFun Coins) to increase the popularity and growth of the coin. Users can participate in the airdrop by providing their Ethereum wallet address.



## Dependencies

The server-side part of this project depends on the following Node.js packages:

- **express**: Fast, unopinionated, minimalist web framework for Node.js
- **body-parser**: Node.js body parsing middleware
- **cors**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS

## Setup Instructions

Follow these steps to set up and run the project:

1. **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd LOLFunCoinProject
    ```

2. **Navigate to the server directory**:
    ```bash
    cd server
    ```

3. **Install server dependencies**:
    ```bash
    npm install
    ```

4. **Start the server**:
    ```bash
    node server.js
    ```

5. **Open the `index.html` file in a browser** to access the airdrop registration form:
    ```bash
    open index.html
    ```
    or, on Linux:
    ```bash
    xdg-open index.html
    ```
    or, on Windows:
    ```bash
    start index.html
    ```

## File Explanations

### server/

- **server.js**: This file sets up the Express server, configures middleware (body-parser and CORS), and defines the `/register` endpoint to handle airdrop registration requests.

- **package.json**: Contains metadata about the project and lists the dependencies required by the server-side application.

### docs/

- **user_guide.md**: Detailed user guide for the airdrop system, including usage instructions, security measures, and UI details.

### js/

- **airdrop.js**: Contains the JavaScript code to handle form submission for the airdrop registration, including making POST requests to the server and handling responses.

- **app.js**: Initializes the AngularJS application and configures the HTTP interceptor for adding default headers.

- **mainCtrl.js**: The main controller for the AngularJS application, managing the airdrop form submission and data binding.

- **parseService.js**: Provides methods to post and retrieve data from the server, used by the main controller.

### styles/

- **styles.css**: Contains the CSS styles for the airdrop registration form, including gradient backgrounds, hover effects, and border-radius settings.

### index.html

The main HTML file for the airdrop registration page. It includes the form for users to enter their Ethereum wallet address, and it loads the necessary JavaScript and CSS files.

## Running the Project

1. **Start the server**:
    ```bash
    cd server
    node server.js
    ```

2. **Open `index.html` in your browser**:
    ```bash
    open index.html
    ```
    or, on Linux:
    ```bash
    xdg-open index.html
    ```
    or, on Windows:
    ```bash
    start index.html
    ```

3. **Enter your Ethereum wallet address** and press "Register" to participate in the airdrop.

## Security Considerations

- Ensure the server is running on a secure and reliable platform.
- Validate all user inputs to prevent security vulnerabilities.
- Regularly update dependencies to incorporate security patches.

## Conclusion

This project aims to facilitate the distribution of LoLFun Coin through an airdrop mechanism. Follow the setup instructions and file explanations to get started. For any issues or contributions, feel free to open an issue or submit a pull request.

Happy airdropping! 🚀


                                                **WHATS REMAINING TO BE IMPLEMENTED** 

Post-Registration Process
    Confirmation Message: After the user submits their Ethereum wallet address and it is successfully registered, they should receive a confirmation message both on the web interface and optionally via email (if email addresses are collected i strongly think we should collect them ama niaje wenzangu??).

Data Storage: The submitted wallet addresses are securely stored in the backend database. This list will be used to distribute the airdrop tokens once the airdrop event begins.

Airdrop Announcement: Notify participants of the airdrop event date and time through the communication channels they joined (Telegram, Twitter, WhatsApp). Provide regular updates leading up to the airdrop event.

Airdrop Execution: On the scheduled date, the airdrop tokens are distributed to the registered wallet addresses. This is typically done via a smart contract that automates the token distribution process.

Follow-Up: After the airdrop, send a follow-up message to participants confirming the distribution. Encourage them to check their wallets for the received tokens and invite them to participate in further community activities.

Steps to Implement Post-Registration Process
    Modify Backend (server.js):

Store the wallet addresses in a database.
    Optionally send a confirmation email upon successful registration.
    Airdrop Execution:

Write a smart contract to handle the token distribution.(How much should and how should the distribution be done??)
    Deploy and execute the smart contract on the scheduled date.