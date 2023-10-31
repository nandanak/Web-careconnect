DROP TABLE IF EXISTS hospital;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS doctor;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS loggedin;

CREATE TABLE hospital (
       hplaceid VARCHAR(50) PRIMARY KEY,
       hname VARCHAR(50),
       haddress VARCHAR(50),
       hpluscode VARCHAR(50),
       hlat NUMERIC(20),
       hlng NUMERIC(20),
       hphone VARCHAR(50),
       hwebsite VARCHAR(50),
       hemail VARCHAR(50),
       hrating VARCHAR(50));

CREATE TABLE department (
       did VARCHAR(50) PRIMARY KEY,
       dname VARCHAR(50),
       dphone VARCHAR(50),
       hplaceid VARCHAR(50) NOT NULL,
       FOREIGN KEY (hplaceid) REFERENCES hospital(hplaceid));

CREATE TABLE doctor (
       pid VARCHAR(50) PRIMARY KEY,
       pname VARCHAR(50),
       did VARCHAR(50) NOT NULL,
       hplaceid VARCHAR(50) NOT NULL,
       FOREIGN KEY (hplaceid) REFERENCES hospital(hplaceid),
       FOREIGN KEY (did) REFERENCES department(did));

CREATE TABLE users (
       email VARCHAR(50) PRIMARY KEY,
       username VARCHAR(50) NOT NULL,
       phone NUMERIC(50) NOT NULL,
       passwrd VARCHAR(100) NOT NULL);

CREATE TABLE loggedin (
       token VARCHAR(100) PRIMARY KEY,
       email VARCHAR(50) NOT NULL,
       FOREIGN KEY (email) REFERENCES users(email));