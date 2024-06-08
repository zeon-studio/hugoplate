---
title: "Structuring a Rust Codebase - Exploring Rust's Module System for Code Organization"
meta_title: ""
description: "Understand the Rust Modules system by building an authentication service."
date: 2023-07-09
image: ""
categories: ["Software Engineering"]
author: "MacBobby Chibuzor"
tags: ["showcase", "posts", "Rust", "architecture"]
draft: false
---

# Introduction

Structuring a Rust codebase can be so frustrating for beginners. I experienced this issues multiple times while starting out new projects in Rust. Typically, I default to the hexagonal architecture while building a web project in Golang, but replicating in Rust has not been exactly straight forward.

In this article, we will explore the Rust’s module system in detail. We will cover packages, crates and modules, and how best to structure them.

{{< image src="images/authservice-rs.png" caption="" alt="alter-text" height="" width="" position="center" command="fill" option="q100" class="img-fluid" title="image title"  webp="false" >}}

## Adding visibility to components

When you start out building software that has different parts of services, you will probably create different folders to house specific services or parts.

### Golang Example

In Golang for example, an authentication service codebase can look like (bare-bones project [here](https://github.com/theghostmac/authService)):

```shell
- authentication-service/
  |- main.go
  |- go.mod
  |- api/
     |- handlers.go
     |- routes.go
  |- authentication/
     |- user.go
     |- token.go
     |- repository.go
     |- service.go
  |- storage/
     |- database.go
  |- utils/
     |- encryption.go
```

The components (functions, custom types, etc.) in any folder can be used in another folder automatically when you define this components to have a capital initial. This is the visibility rule in Go. The routing service (`api/routes.go`) for the API has the following logic:

```go
package api

import (
	"github.com/gorilla/mux"
)

func SetupRouter() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/signup", SignupHandler).Methods("POST")
	router.HandleFunc("/login", LoginHandler).Methods("POST")

	return router
}
```

The entry point (`main.go` file) imports and uses the SetupRouter method in `api/routes.go`:

```go
package main

import (
	"github.com/theghostmac/authService/api"
	"log"
	"net/http"
)

func main() {
	router := api.SetupRouter()
	log.Fatal(http.ListenAndServe(":8080", router))
}
```

This works without any errors because of the visibility rule in Go. These folders are called modules, or tiniest units of software that can be executed or used by themselves.

A single source file can be a module, so we can actually put the `routes.go` file in the root directory and the `SetupRouter()` method will work as is, with little adjustments like:

- removing the unused import `“github.com/theghostmac/authService/api”`,
- renaming `package api` to `package main`.

Now, I believe you’ve refreshed your memory on modules. Let’s see how this applies to Rust.

### Rust implementation with Rocket

Say a Rust developer wants to recreate the authentication service with Rust, they would write all the functions and type declaration in the `src/main.rs` because it is easy to do so.

> Writing tests in for a simple Rust function is as simple as scrolling down in that same source file and using the `#[test]` compiler attributes.
>

However, from normal software engineering best practices, the Single Responsibility Principle in the SOLID principles teach that “each micro service should have a single responsibility or focus on one specific business capability.”

Having a standalone `main.rs` file handle the service would look like:

```rust
#[macro_use] extern crate rocket;

use diesel::prelude::*;
use std::env;
use rocket::response::status::Created;
use rocket::response::status::Unauthorized;

mod authentication {
    use std::fmt::Error;
    use super::*;
    use diesel::PgConnection;

    pub struct User {
        pub id: i32,
        pub username: String,
        pub password: String,
    }

    impl User {
        pub fn new(id: i32, username: String, password: String) -> Self {
            Self {
                id,
                username,
                password,
            }
        }

        pub fn save(&self, connection: &PgConnection) -> Result<(), Error> {
            use crate::schema::user::dsl::*;

            let new_user = NewUser {
                username: &self.username,
                password: &self.password,
            };

            diesel::insert_into(users)
                .values(&new_user)
                .execute(connection)?;

            Ok(())
        }

        pub fn delete(&self) {
            // delete user
        }
    }

    pub struct Token {
        pub id: i32,
        pub user_id: i32,
        pub token: String,
    }

    impl Token {
        pub fn new(id: i32, user_id: i32, token: String) -> Self {
           Self {
               id,
               user_id,
               token,
           }
        }

        pub fn save(&self) {
            // save token
        }

        pub fn delete(&self) {
            // delete token
        }
    }
}

use authentication::*;

fn establish_connection() -> PgConnection {
    Ok(dotenv());
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL not set");
    PgConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}

#[post("/signup")]
fn signup_handler() -> Created<String> {
    let connection = establish_connection();
    let user = User::new(1, "username".to_owned(), "password".to_owned());
    user.save(&connection);
    Created::new("Signup successful".to_owned())
}

#[post("/login")]
fn login_handler() -> Result<&'static str, Unauthorized<()>> {
    Ok("Login succesful")
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/signup", routes![signup_handler])
        .mount("/login", routes![login_handler])
}
```

If you build and run it with cargo, it works. The only external module to be used would be the auto-generated `migrations` from diesel, the ORM and query builder for Rust. Let’s see how to use Rust modules to make this service more readable.

## Modules in Rust

Modules in Rust are similar to those in Go. You can create custom modules (or folders, if you like) to serve different purposes. You can also leave single source files in the `src/` directory of your Rust codebase to act as modules.

You will understand better when we refactor the `main.rs` file to into different modules (bare-bones project [here](https://github.com/theghostmac/authservice-rs)):

1. Create three directories inside of `src/` called `modules`, `entities`, and `repositories`. Create a submodule inside `modules` directory called `authentication`.
2. Create three files: `user.rs` in `entities` directory, `authentication.rs` in `authentication` directory under `modules`, and `user_repository.rs` in `repositories` directory.
3. Create a `mod.rs` file in the three directories. Add `pub mod <file name without .rs extension>` to the `mod.rs` files, e.g. in `entities`, the `mod.rs` file while have only `pub mod user;` in it. The codebase structure will look like:

    ```shell
    src/
    ├── entities
    │  ├── mod.rs
    │  └── user.rs
    ├── main.rs
    ├── modules
    │  ├── authentication.rs
    │  └── mod.rs
    └── repositories
       ├── mod.rs
       └── user_repository.rs
    ```

4. Add the following code to each:

    ```rust
    // user.rs
    pub struct User {
        pub id: i32,
        pub username: String,
        pub password: String,
    }
    
    impl User {
        pub fn new(id: i32, username: String, password: String) -> Self {
            Self {
                id,
                username,
                password,
            }
        }
    }
    ```

    ```rust
    // authentication.rs
    use crate::entities::user::User;
    use crate::repositories::user_repository::UserRepository;
    
    pub struct AuthenticationModule {
        user_repository: UserRepository,
    }
    
    impl AuthenticationModule {
        pub fn new(user_repository: UserRepository) -> Self {
            Self { user_repository }
        }
    
        pub fn signup(&self, user: &User) {
            // Perform signup logic
            self.user_repository.save(user);
        }
    
        pub fn login(&self, username: &str, password: &str) {
            // Perform login logic
        }
    }
    ```

    ```rust
    // user_repository.rs
    use crate::entities::user::User;
    
    pub struct UserRepository {
    
    }
    
    impl UserRepository {
        pub fn new(database_url: &str) -> Self {
            // Create and initialize the necessary database connection or ORM instance
            // For example, establish a Diesel connection to the database
            Self {
                // Initialize the fields here
            }
        }
    
        pub fn save(&self, user: &User) {
            // Implement the logic to save the user to the database
            // You can use Diesel or any other ORM/library here
        }
    
        pub fn delete(&self, user: &User) {
            // Implement the logic to delete the user from the database
            // You can use Diesel or any other ORM/library here
        }
    }
    ```

5. Update the `main.rs` file with the following:

    ```rust
    #[macro_use]
    extern crate rocket;
    
    use diesel::prelude::*;
    use rocket::response::status::Created;
    use rocket::response::status::Unauthorized;
    use std::env;
    use dotenv::dotenv;
    
    mod entities;
    mod repositories;
    mod modules;
    
    use entities::user::User;
    use modules::authentication::AuthenticationModule;
    use repositories::user_repository::UserRepository;
    
    fn establish_connection() -> UserRepository {
        Ok(dotenv());
        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL not set");
        UserRepository::new(&database_url)
    }
    
    #[post("/signup")]
    fn signup_handler() -> Created<String> {
        let connection = establish_connection();
        let user = User::new(1, "username".to_owned(), "password".to_owned());
        let authentication_module = AuthenticationModule::new(connection);
        authentication_module.signup(&user);
        Created::new("Signup successful".to_owned())
    }
    
    #[post("/login")]
    fn login_handler() -> Result<&'static str, Unauthorized<()>> {
        Ok("Login succesful")
    }
    
    #[launch]
    fn rocket() -> _ {
        rocket::build()
            .mount("/signup", routes![signup_handler])
            .mount("/login", routes![login_handler])
    }
    ```


## Putting it all together

Great! Now that we have discussed the necessary steps for creating new modules in our mini hexagonal application, let's put everything together.

To recap, here are the key points:

1. The new modules should be placed inside the `src/` directory.
2. Each module should have a `mod.rs` file that exports the main module file. However, there are two alternative approaches you can take:
    1. **Option 1: Directly create the module file under `src/`:** Instead of creating a separate `mod.rs` file, you can create the `user.rs` file (or any other module file) directly under the `src/` directory. In this case, you would include the module using the `mod` keyword in your main application file (`main.rs`).

       For example, let's assume we have a `user` module. To include it in your application, you would add the following line in your `main.rs` file:

        ```rust
        mod user;
        ```

       This approach eliminates the need for a separate `mod.rs` file, as the module file is directly placed in the `src/` directory.

    2. **Option 2: Create a `mod.rs` file in the new module:** Alternatively, you can create a `mod.rs` file within the new module directory and include the intended contents of the `user.rs` file in it.

       Here's an example file structure for better understanding:

        ```bash
        src/
          |- main.rs
          |- user/
              |- mod.rs
              |- user.rs
        ```

       In the `mod.rs` file inside the `user` module directory, you would include the following code:

        ```rust
        pub mod user;
        ```

       This code exports the `user` module, making it accessible from other parts of the application.

3. Once you have created the modules and included them in your application, you can start using them by calling their functions, structs, or traits.

    For example, let's assume you have defined a function named `create_user` in the `user` module. You can use it in your `main.rs` file like this:

    ```rust
    mod user;
    
    use user::user::create_user;
    
    fn main() {
        // Call the create_user function from the user module
        create_user("John Doe", "john.doe@example.com");
    }
    ```
    Make sure to import the necessary items from the modules using the `use` keyword.


## Using `cargo-modules` to visualize

The `cargo-modules` crate is a plugin for visualizing the cargo modules you used in a crate. You can find the plugin for download [here](https://crates.io/crates/cargo-modules). For quick demo, install it using this command:

```shell
cargo install cargo-modules
```

Or, you can simply add it in your `Cargo.toml` file:

```toml
[dependencies]
cargo-modules = "0.9.1"
```

To use it, run:

```shell
cargo modules generate tree
```

The output for the demo authentication service is:

```shell
cargo modules generate tree

crate authservice_rs
├── mod entities: pub(crate)
│   └── mod user: pub
├── mod modules: pub(crate)
│   └── mod authentication: pub
└── mod repositories: pub(crate)
    └── mod user_repository: pub
```

We can also make it more informational by adding the `--types` flag:

```shell
cargo module generate tree --types

crate authservice_rs
├── mod entities: pub(crate)
│   └── mod user: pub
│       └── struct User: pub
├── mod modules: pub(crate)
│   └── mod authentication: pub
│       └── struct AuthenticationModule: pub
└── mod repositories: pub(crate)
    └── mod user_repository: pub
        └── struct UserRepository: pub
```

# Conclusion

By organizing your code into separate modules, you can maintain a more structured and modular codebase. Each module can focus on a specific functionality or domain, improving code readability, reusability, and maintainability.

That's it! You now have a mini hexagonal application with multiple modules organized within the `src/` directory. Feel free to expand your application by creating additional modules as needed.

Happy coding!
