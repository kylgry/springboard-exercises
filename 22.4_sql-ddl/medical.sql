DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE centers (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE doctors (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, med_center INTEGER REFERENCES centers(id));
CREATE TABLE patients (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT);
CREATE TABLE relations (id SERIAL PRIMARY KEY, patient INTEGER REFERENCES patients(id), doctor INTEGER REFERENCES doctors(id));
CREATE TABLE diagnoses (id SERIAL PRIMARY KEY, disease TEXT, patient INTEGER REFERENCES patients(id), doctor INTEGER REFERENCES doctors(id));

INSERT INTO centers (name) VALUES ('University Hospital'), ('Children''s Hospital');
INSERT INTO doctors (first_name, last_name, med_center) VALUES ('John', 'Smith', 1), ('Jennifer', 'Black', 2), ('Susanne', 'Zelensky', 1);
INSERT INTO patients (first_name, last_name) VALUES ('Babe', 'Ruth'), ('Joe', 'Green'), ('Corina', 'Bays');
INSERT INTO relations (patient, doctor) VALUES (1,2), (2,3), (2,2), (3,1);
INSERT INTO diagnoses (disease, patient, doctor) VALUES ('leukemia', 1, 2), ('brain cancer', 2,3);
