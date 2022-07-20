CREATE table users (
    id              INT unsigned NOT NULL AUTO_INCREMENT,
    firstName       VARCHAR(30) NOT NULL,
    lastName        VARCHAR(30) NOT NULL,
    username        VARCHAR(30) NOT NULL,
    email           VARCHAR(45) NOT NULL,
    password        VARCHAR(32) NOT NULL,
    PRIMARY KEY     (id)
);