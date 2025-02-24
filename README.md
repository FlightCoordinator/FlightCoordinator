# FlightCoordinator

![GitHub License](https://img.shields.io/github/license/FlightCoordinator/FlightCoordinator)
![GitHub repo size](https://img.shields.io/github/repo-size/FlightCoordinator/FlightCoordinator)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/FlightCoordinator/FlightCoordinator)

## Overview

This project is an automated flight manager app for final year computer engineering project. The project is a full-stack application consisting of a Spring Boot server as the main backend, a Spring Boot authentication server, a Next.js web client with TypeScript, and FastAPI server for automation related algorithms.

The project also includes utility scripts for configuring the environment, setting up the project, running the application (all apps simultaneously), executing tests for all apps, and building the entire application.

## Prerequisites

To setup the project locally, ensure following are present on your system:

- Bash Shell for running provided scripts (This project is developed in a GNU/Linux environment using WSL2 with Ubuntu. However, you can set up and run it on other operating systems by installing the required tools.)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (version managed with [NVM](https://github.com/nvm-sh/nvm))
- [pnpm](https://pnpm.io/)
- Java Development Kit (JDK)
- [Maven](https://maven.apache.org/)

## Setup

You can setup the project easily using the provided scripts (located in `scripts/` folder in the project root).

### Installing Required Apps

```bash
cd scripts/config # from the project root
./install_apps.sh
```

This script installs:

- nvm: Node Version Manager (then installs the version of node specified in the script).
- pnpm: Package manager for using in the web client and the project root.
- JDK/JRE: Java Development Kit and Java Runtime Environment for the data and auth services.
- Maven: Build automation tool for the data and auth services.

### Setting Up the Project

```bash
cd scripts/config # from the project root
./setup_project.sh
```

This script does the following:

- Installs the web client's dependencies.
- Installs the auth service's dependencies.
- Installs the data service's dependencies.
- Installs the algorithm service's dependencies and creates a virtual python environment.
- Installs the root dependencies (only `concurrently` for running the all of the apps at the same time).

### Setting Up Environment Variables

All applications in the project require environment variables to function correctly.

- **Web Client:** The web client have a `.env.sample` file (located in `apps/web-client/`) which have contents like the one shown below. Make sure to rename this file to `.env.local` before setting up the variables inside.

  ```bash
  NEXT_PUBLIC_ENVIRONMENT=""

  NEXT_PUBLIC_DATA_SERVER_URL=""
  NEXT_PUBLIC_DATA_SERVER_PORT=""
  NEXT_PUBLIC_DATA_SERVER_API_VERSION=""

  NEXT_PUBLIC_AUTH_SERVER_URL=""
  NEXT_PUBLIC_AUTH_SERVER_PORT=""
  NEXT_PUBLIC_AUTH_SERVER_API_VERSION=""
  ```

- **Data Service:** The data service have a `example.application.yml` file (located in `apps/data-service/src/main/resources`) which have contents like the one shown below. Make sure to rename this file to `application.yml` before setting up the variables inside.

  ```yml
  spring:
    application:
      name: FlightCoordinator Backend Server
    datasource:
      url: jdbc:postgresql://localhost:5432/db_name
      username: username
      password: password
      driver-class-name: org.postgresql.Driver
      hikari:
        maximum-pool-size: 10
    jpa:
      hibernate:
        ddl-auto: create
      show-sql: false
      properties:
        hibernate:
          format-sql: true
      database: postgresql
      database-platform: org.hibernate.dialect.PostgreSQLDialect

  springdoc:
    swagger-ui:
      path: /swagger.html # The url that will contain the OpenAPI docs

  server:
    port: 8081 # The port data service will be listening
    api_version: v1 # Current data service API version
    algorithm_service_key: "" # Secret key for validation requests between data and algorithm services
  ```

- **Auth Service:** The auth service have a `example.application.yml` file (located in `apps/auth-service/src/main/resources`) which have contents like the one shown below. Make sure to rename this file to `application.yml` before setting up the variables inside.

  ```yml
  spring:
    application:
      name: FlightCoordinator Auth Service
    datasource:
      url: jdbc:postgresql://localhost:5432/db_name
      username: username
      password: password
      driver-class-name: org.postgresql.Driver
      hikari:
        maximum-pool-size: 10
    jpa:
      hibernate:
        ddl-auto: validate
      show-sql: false
      properties:
        hibernate:
          format-sql: true
      database: postgresql
      database-platform: org.hibernate.dialect.PostgreSQLDialect

  springdoc:
    swagger-ui:
      path: /swagger.html # The url that will contain the OpenAPI docs

  server:
    port: 8082 # The port auth service will be listening
    api_version: v1 # Current auth service API version
    uris:
      webclient: http://localhost:3000/ # web client's uri
      dataservice: http://localhost:8081/ # data service's uri
    keys:
      access_key: "" # Secret key for issuing access tokens
      refresh_key: "" # Secret key for issuing refresh tokens
  ```

- **Algorithm Service:** The algrothim service have a `.env.sample` file (located in `apps/algorithm-service/`) which have contents like the one shown below. Make sure to rename this file to `.env` before setting up the variables inside.

  ```bash
  SECRET_KEY="" # Secret key for validation requests between data and algorithm services.
                # It should be the same as the key from the data service's application.yml
  ```

Ensure these config files contain valid values before running the application.

## Running the Project

To starth all the apps in the project, you can use the `pnpm dev` command (which executes the `run_app.sh`) or the `run_app.sh` script itself:

```bash
cd scripts/ # from the project root
./run_app.sh
```

```bash
pnpm dev
```

This script uses a npm package named [concurrently](https://www.npmjs.com/package/concurrently) to run all apps in parallel, in the same terminal.

## Building the Project

To build the project you can use the `build.sh` script:

```bash
cd scripts/ # from the project root
./build.sh
```

## VSCode Configuration

A `.vscode` folder is included in the project with recommended extensions and settings for a consistent development experience. You can install these recommended extensions for better development experience if you decide to work on the project.

## Bug Reports and Feature Requests

We use GitHub templates to streamline reporting bugs and requesting new features. To contribute:

- **Bug Reports:** Open a new issue and select "Bug Report" template. Provide as much detail as possible to help us reproduce the issue.
- **Feature Request:** Open a new issue and select "Feature Request" template. Describe the new feature and its intended purpose clearly.

## Documentation

For detailed documentation, please see the [project documentation](https://github.com/FlightCoordinator/Documentation).

## License

This project is open-source and licensed under [MIT License](https://github.com/FlightCoordinator/FlightCoordinator/blob/main/LICENSE).
