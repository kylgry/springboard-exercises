DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE teams (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE players (id SERIAL PRIMARY KEY, name TEXT, team INTEGER REFERENCES teams(id));
CREATE TABLE seasons (id SERIAL PRIMARY KEY, start_date DATE, end_date DATE);
CREATE TABLE matches (id SERIAL PRIMARY KEY, team1 INTEGER REFERENCES teams(id), team2 INTEGER REFERENCES teams(id), season INTEGER REFERENCES seasons(id));
CREATE TABLE goals (id SERIAL PRIMARY KEY, player INTEGER REFERENCES players(id), match INTEGER REFERENCES matches(id));
CREATE TABLE rankings (id SERIAL PRIMARY KEY, ranking INTEGER, team INTEGER REFERENCES teams(id), season INTEGER REFERENCES seasons(id));

INSERT INTO teams (name) VALUES ('New England'), ('Alabama'), ('Florida');
INSERT INTO players (name, team) VALUES ('John Smith', 1), ('Bo Burnham', 1), ('Baby Driver', 2), ('Tom Cruise', 2), ('Batman', 3), ('The Joker', 3);
INSERT INTO seasons (start_date, end_date) VALUES ('2012-01-01', '2012-06-01');
INSERT INTO matches (team1, team2, season) VALUES (1,2,1);
INSERT INTO goals (player, match) VALUES (1,1), (3,1);
INSERT INTO rankings (ranking, team, season) VALUES (1,1,1);
