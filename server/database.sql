CREATE DATABASE favlinks;
-- psql command to connect to database
\c favlinks

CREATE TABLE links (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  URL VARCHAR(30)
);