---
title: "Bankie.go"
meta_title: ""
description: "Bankie.go is a self-sustaining simulation of the banking experience."
date: 2023-07-09T02:00:00Z
image: "/images/bankie.png"
categories: ["DevLog"]
author: "MacBobby Chibuzor"
tags: ["showcase", "projects", "Go"]
draft: false
---

# Description
[Bankie.go](https://github.com/theghostmac/bankie.go) is a simple banking application built with Go programming language. 
It provides basic banking functionalities such as creating accounts, making 
deposits and withdrawals, and transferring funds between accounts.

## Features
Account Management: Users can create new bank accounts and manage their existing accounts.
Deposits and Withdrawals: Users can deposit money into their accounts or make withdrawals.
Fund Transfers: Users can transfer funds from one account to another.
Transaction History: The application maintains a transaction history for each account, allowing users to track their transactions.
Installation
Bankie.go can be installed using one of the following methods:

## Installation with Makefile
To run Bankie.go using the Makefile, make sure you have Go and Make installed on your system. Then, follow these steps:

1. Clone the repository:
  ```shell
  git clone https://github.com/theghostmac/bankie.go.git
  ```
2. Navigate to the project directory:
   ```shell
   cd bankie.go
   ```
3. Start the PostgreSQL repository by running the Docker installation below, in another terminal. To start Bankie any time, run:
   ```shell
    docker start bankie
   ```
4. Build and run the application using the `Makefile`:
   ```shell
   make run
   ```

## Installation with Docker
To run Bankie.go using Docker, make sure you have Docker installed on your system. Then, follow these steps:

1. Clone the repository:
   ```shell
   git clone https://github.com/theghostmac/bankie.go.git
   ```
2. Navigate to the project directory:
   ```shell
   cd bankie.go
   ```
3. Build the Docker image:
   ```shell
   docker build -t bankie .
   ```
4. Run the Docker container:
   ```shell
   docker run -p 8080:8080 bankie
   ```


### Installation by Cloning the Repository
To run Bankie.go by cloning the repository, make sure you have Go installed on your system. Then, follow these steps:

1. Clone the repository:

    ```shell
    git clone https://github.com/theghostmac/bankie.go.git
    ```
2. Navigate to the project directory:

    ```shell
    cd bankie.go
    ```
3. Build the application:
    ```shell
    go build
    ```
4. Run the application:
    ```shell
    ./bankie.go
    ```

### Usage
Once the application is running, you can interact with it using a RESTFul API. The following endpoints are available:

1. ```POST /accounts```: Create a new bank account. Provide the account holder's name and an initial deposit amount.
2. ```GET /accounts/:id```: Retrieve information about a specific account.
3. ```POST /accounts/:id/deposit```: Make a deposit to a specific account. Provide the deposit amount.
4. ```POST /accounts/:id/withdraw```: Make a withdrawal from a specific account. Provide the withdrawal amount.
5. ```POST /accounts/:id/transfer```: Transfer funds from one account to another. Provide the recipient account ID and the transfer amount.
6. ```GET /accounts/:id/transactions```: Retrieve the transaction history of a specific account.
Make sure to replace `:id` with the actual account ID in the endpoint URLs.

### Contributing
Contributions to Bankie.go are welcome! If you find any issues or would like to add new features, please feel free to open an issue or submit a pull request.

### License
This project is licensed under the MIT License.
