const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PW,
  database: process.env.DB,
});

connection.connect((err) => {
  if (err) throw err;
  mainMenu();
});

const mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do",
      choices: [
        "Read All Todos",
        "Add Todo",
        "Delete Todo",
        "Edit Todo",
        "Quit",
      ],
      name: "menuChoice",
    })
    .then(({ menuChoice }) => {
      switch (menuChoice) {
        case "Read All Todos":
          seeAllTodos().then((res) => {
            console.table(res);
            mainMenu();
          });
          break;

        case "Add Todo":
          todoMenu();
          break;

        case "Delete Todo":
          chooseTodo()
            .then((resId) => deleteTodo(resId))
            .then(() => mainMenu());
          break;

        case "Edit Todo":
          chooseTodo()
            .then((resId) => editScreen(resId))
            .then(() => mainMenu());
          break;

        default:
          connection.end();
          process.exit();
          break;
      }
    });
};

const editScreen = (id) => {
  return new Promise((resolve, reject) => {
    showTodo(id).then((foundTodo) => {
      inquirer
        .prompt([
          {
            type: "prompt",
            message: "Edit text: ",
            default: foundTodo[0].text,
            name: "editText",
          },
          {
            type: "list",
            message: "is complete: ",
            choices: ["False", "True"],
            name: "editComplete",
          },
        ])
        .then(({ editText, editComplete }) => {
          const editedObject = {
            todoId: foundTodo[0].id,
            todoText: editText,
            todoCompleted: editComplete === "False" ? false : true,
          };

          return editTodo(editedObject);
        })
        .then((editRes) => resolve(editRes));
    });
  });
};

const chooseTodo = () => {
  return new Promise((resolve, reject) => {
    seeAllTodos()
      .then((allTodos) => {
        return allTodos.map(
          (todo) =>
            `id: ${todo.id} | completed: ${todo.completed} | text: ${todo.text}`
        );
      })
      .then((todoChoices) => {
        return inquirer.prompt({
          type: "list",
          message: "Choose a todo",
          choices: todoChoices,
          name: "choosenTodo",
        });
      })
      .then(({ choosenTodo }) => {
        const todoId = choosenTodo.split(" ")[1];
        resolve(todoId);
      });
  });
};

const todoMenu = () => {
  inquirer
    .prompt({
      type: "prompt",
      name: "todoText",
      message: "Add todo text",
    })
    .then(({ todoText }) => {
      addTodo(todoText).then(() => {
        mainMenu();
      });
    });
};

const seeAllTodos = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM todos", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

const addTodo = (userText) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO todos SET ?", [{ text: userText }], (err) => {
      err ? reject(err) : resolve({ msg: "A todo was succesfully added" });
    });
  });
};

const showTodo = (todoID) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM todos WHERE ?",
      [{ id: todoID }],
      (err, data) => {
        err ? reject(err) : resolve(data);
      }
    );
  });
};

const deleteTodo = (todoId) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM todos WHERE ?", [{ id: todoId }], (err) => {
      err ? reject(err) : resolve({ msg: "A todo was succesfully deleted" });
    });
  });
};

const editTodo = (todoObj) => {
  return new Promise((resolve, reject) => {
    query = connection.query(
      "UPDATE todos SET ? WHERE ?",
      [
        {
          text: todoObj.todoText,
          completed: todoObj.todoCompleted,
        },
        { id: todoObj.todoId },
      ],
      (err) => {
        err ? reject(err) : resolve({ msg: "A todo was succesfully edited" });
      }
    );
  });
};
