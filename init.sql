
CREATE DATABASE myflaskapp;
use myflaskapp;

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255),
    email varchar(255),
    username varchar(255),
    password varchar(255)
);

CREATE TABLE products (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255),
    description varchar(255),
    price int
);

INSERT INTO users VALUES(null, "juan", "juan@gmail.com", "juan", "123"),
    (null, "maria", "maria@gmail.com", "maria", "456");

INSERT INTO products VALUES(null, "laptop", "laptop description", 1000), 
    (null, "mouse", "mouse description", 20), 
    (null, "keyboard", "keyboard description", 50);