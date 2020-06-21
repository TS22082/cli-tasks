DROP DATABASE IF EXISTS todo_db;
CREATE DATABASE todo_db;
USE todo_db;

CREATE TABLE todos (
  id INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(80) NOT NULL,
  completed BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);

INSERT INTO todos(text)
VALUES ("Mysql programmers get a lot of money");

INSERT INTO todos(text)
VALUES ("finish the course");

INSERT INTO todos(text)
VALUES ("have fun");
