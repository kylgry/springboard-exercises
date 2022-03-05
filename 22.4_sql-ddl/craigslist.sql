DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE regions (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE locations (id SERIAL PRIMARY KEY, name TEXT, region INTEGER REFERENCES regions(id));
CREATE TABLE categories (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE users (id SERIAL PRIMARY KEY, username TEXT, password TEXT, pref_region INTEGER REFERENCES regions(id));
CREATE TABLE posts (id SERIAL PRIMARY KEY, title TEXT, post TEXT, username INTEGER REFERENCES users(id), location INTEGER REFERENCES locations(id), category INTEGER REFERENCES categories(id));

INSERT INTO regions (name) VALUES ('Utah'), ('Nevada'), ('Idaho');
INSERT INTO locations (name, region) VALUES ('Salt Lake City', 1), ('Ogden', 1), ('Provo', 1), ('Las Vegas', 2), ('Reno', 2), ('Boise', 3), ('Sandpoint', 3);
INSERT INTO categories (name) VALUES ('Cars And Trucks'), ('Furniture'), ('Electronics');
INSERT INTO users (username, password, pref_region) VALUES ('Hunter', '420blazeit', 3), ('Melissa', 'ilovemycats', 2);
INSERT INTO posts (title, post, username, location, category) VALUES ('Used Couch', 'Used couch for sale, blah blah', 1, 3, 2);
