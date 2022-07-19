CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev';
GRANT ALL ON authWebAppDb.* TO 'dev'@'localhost' WITH GRANT OPTION;