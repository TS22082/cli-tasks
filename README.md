# CLI tasks app

A Console tool to keep track of tasks.

# Motivation

Needed a quick todo list available.

# Stack

- Node
- Inquirer
- MySQL

# Requirements

- Node
- MySQL

# Setup

- clone to computer using:

```
git clone https://github.com/TS22082/cli-tasks.git
```

- run npm install from inside the root directory.

```
npm install
```

- Seed table info to Mysql database.

Create a .env file in root directory:

```
HOST=<yours>
PORT=<yours>
USER=<yours>
PW=<yours>
DB=todo_db
```

- From inside project folder type (requires Nodemon) to start server and client:

```
node index.js
```

# Build and Make exectutable (optional)

I use the [pkg](https://www.npmjs.com/package/pkg) npm package to make executables from my node projects; That way I can add to my system variables path and run from anywhere through terminal.

run command:

```
npm install -g pkg
```

then from inside the project folder run:

```
pkg package.json --target <system>
```

system relates to system ou want to make executable for. example: "win", "mac", "linux"

if you leave out `--target <system>` it will default to making all 3 executables.
