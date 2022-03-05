-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE artists (id SERIAL PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE albums (id SERIAL PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  album TEXT NOT NULL,
  producers TEXT[] NOT NULL
);

CREATE TABLE song_artists
(
  id SERIAL PRIMARY KEY,
  song INTEGER REFERENCES songs(id);
  artist INTEGER REFERENCES artists(id);
)

INSERT INTO artists (name) VALUES ('Hanson'), ('Queen'), ('Mariah Cary'), ('Boyz II Men'), ('Lady Gaga'), ('Bradley Cooper'), ('Nickelback'), ('Jay Z'), ('Alicia Keys'),
('Katy Perry'), ('Juicy J'), ('Maroon 5'), ('Christina Aguilera'), ('Avril Lavigne'), ('Destiny''s Child');

INSERT INTO albums (name) VALUES ('Middle of Nowhere'), ('A Night at the Opera'), ('Daydream'), ('A Star Is Born'), ('Silver Side Up'), ('The Blueprint 3'), ('Prism'),
('Hands All Over'), ('Let Go'), ('The Writing''s on the Wall');

INSERT INTO songs
  (title, duration_in_seconds, release_date, artists, album, producers)
VALUES
  ('MMMBop', 238, '04-15-1997', 1, '{"Dust Brothers", "Stephen Lironi"}'),
  ('Bohemian Rhapsody', 355, '10-31-1975', 2, '{"Roy Thomas Baker"}'),
  ('One Sweet Day', 282, '11-14-1995', 3, '{"Walter Afanasieff"}'),
  ('Shallow', 216, '09-27-2018', 4, '{"Benjamin Rice"}'),
  ('How You Remind Me', 223, '08-21-2001', 5, '{"Rick Parashar"}'),
  ('New York State of Mind', 276, '10-20-2009', 6, '{"Al Shux"}'),
  ('Dark Horse', 215, '12-17-2013', 7, '{"Max Martin", "Cirkut"}'),
  ('Moves Like Jagger', 201, '06-21-2011', 8, '{"Shellback", "Benny Blanco"}'),
  ('Complicated', 244, '05-14-2002', 9, '{"The Matrix"}'),
  ('Say My Name', 240, '11-07-1999', 10, '{"Darkchild"}');

INSERT INTO song_artists
  (song, artist)
VALUES
  (1,1),(2,2),(3,3),(3,4),(4,5),(4,6),(5,7),(6,8),(6,9),(7,10),(7,11),(8,12),(8,13),(9,14),(10,15);
