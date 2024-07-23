# Godemy

Godemy is an open-source **e-learning** platform designed to teach Golang, especially focusing on fundamental programming concepts. This platform uses `Next.js` for the front-end and `Golang` for the back-end.

This project use [Velite]([velite](https://velite.js.org/)) as a content SDK that validates and transforms MDX data.

> **Caution:** This project was created for my bachelor's thesis.

## Features

- There are two users on this platform teacher and student.
- There are Dashboard either student and teacher.
- In the module of Golang has a online compiler to try the code.
- and many more...

## Getting Started

Follow these instructions to get a copy of the project running on your local machine for development and testing purposes.

### Prerequisites

- node `v20.12.1`

### Installation

1. Clone this repository
2. Copy the environment variables example file to .env.local:

   ```bash
    cp .env.local.example .env.local
   ```

3. Install the dependencies using your package managers

### Run Godemy

here the command to run this project using `make`

```bash
make dev     ----> run  development server

make build   ----> build the project

make start   ----> start the builded project
```
