---
title: "Simplifying Development with Docker Compose in Bankie.go"
meta_title: ""
description: "Using Docker Compose for provisioning multiple containers for the different resources in a multi-service application."
date: "2023-10-31"
image: "/images/bankie.png"
categories: ["DevLog"]
author: "MacBobby Chibuzor"
tags: ["showcase", "projects", "Go"]
draft: false
---

# Simplifying Development with Docker Compose in Bankie.go

[Bankie.go](https://github.com/theghostmac/bankie.go), a simple banking application built with Go, 
has been updated to streamline the development and deployment processes using Docker Compose. 
In this blog post, we will explore the benefits of this update and guide you through 
the setup and usage of Go applications with Docker Compose.

## Why Docker Compose?

Docker Compose is a powerful tool for defining and running multi-container Docker applications. 
It simplifies the management of containers, their interdependencies, and 
the overall environment setup. By incorporating Docker Compose into their Go applications, 
developers can enjoy several advantages:

1. **Isolation**: Each component of the application (e.g., the Go application, PostgreSQL database) runs in its own container, providing isolation. This separation ensures that dependencies and configurations don't conflict.

2. **Portability**: Docker Compose allows you to define the entire environment in a single configuration file (docker-compose.yaml). This file specifies how containers should interact and can be versioned with your codebase. This ensures consistent environments across different development and deployment setups.

3. **Efficiency**: Starting and stopping the application, including dependencies like databases, is simplified with Docker Compose. Developers can focus on writing code without worrying about environment configuration.

4. **Easy Collaboration**: Sharing the development environment with other team members becomes seamless. Everyone can set up and run the application using the same Docker Compose configuration.

## Configuring Services Using Docker Compose

When you have an application that uses at least two or more services, it is technically a right candidate for 
Compose, especially if they talk with each other. For example, Bankie.go has a Go web server and a Postgres database.
Before now, I run the Go web server using the `go run cmd/app/main.go` and then connect it to a Dockerized Postgres
data store. This was apparently fine for me, but it could get better.

### Writing the Dockerfile
Docker Compose runs with the help of a Dockerfile. For my Go application, I have this as it's contents:
```dockerfile
# Start from a Golang base image
FROM golang:1.20.4-alpine3.18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Go modules manifests
COPY go.mod go.sum ./

# Download the Go modules
RUN go mod download

# Copy the source code into the container
COPY . .

# Build Bankie
RUN go build -o /app/bankie ./cmd/app

# Set the entrypoint to run Bankie
CMD ["/app/bankie"]
```

This is quite performant and well explained just in case you need to understand what is going on.

### Writing the Docker Compose file.
The Docker Compose file is usually a `docker-compose.yml` file that houses the services and links them to a common
network so they can listen to each other.
Here's how to write one:
1. Start with a version. The version I used as of the time of writing is 3.8:
```yaml
version: "3.8"
```

2. Next, define the services. For Bankie.go, I need a postgres database and the Go web server itself.
```yaml
version: "3.8"

services:
  postgres:

  bankie:
```
3. Now, I need to specify the images the should pull. I don't need an image for the Go web server though. 
I only have to build an image out of it. So, the postgres service will receive/pull an image, while the bankie web
server will build an image:
```yaml
version: "3.8"

services:
  postgres:
    image: postgres:latest

  bankie:
    build:
      context: .
      dockerfile: Dockerfile
```
We're making progress.
4. Next, we need to specify the container names for these images:
```yaml
version: "3.8"

services:
  postgres:
    image: postgres:latest
    container_name: bankie-postgres

  bankie:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: bankie-app
```
5. After that, we specify the ports for each containers. Also, we will specify that the bankie service 
depends on the postgres service, making the postgres service start first:
```yaml
version: "3.8"

services:
  postgres:
    image: postgres:latest
    container_name: bankie-postgres
    ports:
      - "5432:5432"

  bankie:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: bankie-app
    ports:
      -   "8082:8082"
    depends_on:
      - postgres
```
6. Now, we need to specify environment variables for both services:
```yaml
version: "3.8"

services:
  postgres:
    image: postgres:latest
    container_name: bankie-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: bankiestore
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: whateverisstrongenough

  bankie:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: bankie-app
    ports:
      -   "8082:8082"
    depends_on:
      - postgres
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: whateverisstrongenough
      DB_NAME: bankiestore
```
Note that the passwords will be the same and must match the one used in the application, else, it will raise a
FATAL error about authentication failure.
7. Let's proceed to finish up with a network configuration:
```yaml
version: "3.8"

services:
  postgres:
    image: postgres:latest
    container_name: bankie-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: bankiestore
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: whateverisstrongenough
    networks:
      - bankie-network

  bankie:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: bankie-app
    ports:
      -   "8082:8082"
    depends_on:
      - postgres
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: whateverisstrongenough
      DB_NAME: bankiestore
    networks:
      - bankie-network

networks:
  bankie-network:
```

This concludes our Docker Compose file. All we have to do is run `docker-compose up` to see our application.
I used a `retry` package to delay the bankie service from trying to establish a connection to the 
postgres service prematurely:
```go
package main

import (
	retry "github.com/avast/retry-go"
	"github.com/theghostmac/bankie.go/api/rest"
	"github.com/theghostmac/bankie.go/common/logger"
	"github.com/theghostmac/bankie.go/database/migrations"
	"github.com/theghostmac/bankie.go/database/users"
	"log"
	"time"
)

func main() {
	migrations.DbConn()

	// Define a retry strategy
	retryOptions := []retry.Option{
		retry.Attempts(5),
		retry.Delay(1 * time.Second),
	}

	// Wrap the connection establishment in a retry block.
	err := retry.Do(func() error {
		store, err := users.NewUserRepository()
		if err != nil {
			log.Fatal(err)
		}

		if err := store.Init(); err != nil {
			log.Fatal(err)
		}

		serverEngine := rest.NewAPIServer(":8082", store)
		serverEngine.StartServer()
		logger.InfoLogs("Server has started up...\n")
		logger.ErrorLogs("Hello Banker, API Server is running successfully...\n")

		return nil
	}, retryOptions...)

	if err != nil {
		log.Fatalf("Failed to establish a database connection after retries: %v", err)
	}
}
```
This is due to obvious reasons. You might want to do similar in your application if it arises.

## Setting Up Bankie.go with Docker Compose

Here's how you can set up and run your Go application using Docker Compose. We will use Bankie.go as the example app:

1. **Clone the Repository**:

   Start by cloning the Bankie.go repository to your local machine using the following command:

   ```shell
   git clone https://github.com/theghostmac/bankie.go.git
   ```

2. **Navigate to the Project Directory**:

   Change your working directory to the project folder:

   ```shell
   cd bankie.go
   ```

3. **Run Docker Compose**:

   With Docker Compose, you can easily start the entire application stack, including the Go application and the PostgreSQL database. Use the following command to start Bankie.go:

   ```shell
   docker-compose up
   ```

   Docker Compose reads the configuration defined in `docker-compose.yml` and sets up the environment accordingly. You'll see the application and database containers being created and initialized.

![Application is running](/imgs/bankie_running.png)

4. **Interact with Bankie.go**:

   Once the application is running, you can interact with Bankie.go using a RESTful API. The available endpoints include:

    - `POST /accounts`: Create a new bank account with the account holder's name and an initial deposit amount.
    - `GET /accounts/:id`: Retrieve information about a specific account.
    - `POST /accounts/:id/deposit`: Make a deposit to a specific account.
    - `POST /accounts/:id/withdraw`: Make a withdrawal from a specific account.
    - `POST /accounts/:id/transfer`: Transfer funds from one account to another.
    - `GET /accounts/:id/transactions`: Retrieve the transaction history of a specific account.

   Replace `:id` with the actual account ID in the endpoint URLs.

## Example Usage

Here's an example of using `curl` to create an account and retrieve its information:

1. **Create a New Account**:

   Run the following `curl` command to create a new account:

   ```shell
   curl -X POST -H "Content-Type: application/json" -d '{
       "FirstName": "John",
       "LastName": "Doe",
       "Email": "johndoe@example.com"
   }' http://localhost:8082/accounts
   ```

   You'll receive a JSON response with the account details.

2. **Retrieve Account Information**:

   To retrieve information about the newly created account, use the following `curl` command:

   ```shell
   curl http://localhost:8082/accounts/1
   ```

   This command will return a JSON response with the account details.

## Conclusion

Docker Compose simplifies the development and deployment of multi-container applications like Bankie.go. 
With a single command, you can set up the entire application stack, allowing you to focus on coding and 
not on environment configuration. It also promotes consistency and collaboration among development teams.

By updating Bankie.go to use Docker Compose, we've made it even more developer-friendly, 
enabling you to build, run, and test the application effortlessly. 
Give it a try, and enjoy a smoother development experience with your Go applications!
