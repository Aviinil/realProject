-- vidage table et sequence
--DROP TABLE utilisateur CASCADE CONSTRAINT;
DROP TABLE IF EXISTS utilisateur CASCADE;
--DROP TABLE liste CASCADE CONSTRAINT;
DROP TABLE IF EXISTS liste CASCADE;
--DROP TABLE tache CASCADE CONSTRAINT;
DROP TABLE IF EXISTS tache CASCADE;
--DROP TABLE etape CASCADE CONSTRAINT;
DROP TABLE IF EXISTS etape CASCADE;
DROP SEQUENCE IF EXISTS SeqIDutilisateur;
DROP SEQUENCE IF EXISTS SeqIDliste;
DROP SEQUENCE IF EXISTS SeqIDtache;
DROP SEQUENCE IF EXISTS SeqIDetape;
-- vidage de mes betises d'avant
DROP TABLE IF EXISTS utilisateurs CASCADE;
DROP TABLE IF EXISTS listes CASCADE;
DROP TABLE IF EXISTS taches CASCADE;
DROP TABLE IF EXISTS etapes CASCADE;
DROP SEQUENCE IF EXISTS SeqIDutilisateurs;
DROP SEQUENCE IF EXISTS SeqIDlistes;
DROP SEQUENCE IF EXISTS SeqIDtaches;
DROP SEQUENCE IF EXISTS SeqIDetapes;


-- METTEZ TOUT AU SINGULIER
-- >Les IDutilsateur commence par ressemblent à "1XXXXX" 
-- >>Les IDliste commence par ressemblent à "2XXXXX"
-- >>>Les IDtache commence par ressemblent à "3XXXXX" 
-- >>>>Les IDetape commence par ressemblent à "4XXXXX" 

-- création table utilisateur
CREATE TABLE utilisateur 
(
  IDutilisateur INTEGER,
  email VARCHAR(50),
  secured_password VARCHAR(60)
);

CREATE SEQUENCE SeqIDutilisateur START WITH 10000 INCREMENT BY 1;
ALTER TABLE utilisateur ADD CONSTRAINT PK_IDutilisateur PRIMARY KEY(IDutilisateur);

-- ID: test@gmail.com Pass: password
INSERT INTO utilisateur(IDutilisateur, email, secured_password) VALUES (nextval('SeqIDutilisateur'), 'test@gmail.com', '$2b$10$qQGzUHQlo/Yy7SWVjCaruuR692KRzD1XhuyqXlz6hWejdBl9I7r/a');

-- création table liste
CREATE TABLE liste
(
  IDliste INTEGER,
  IDutilisateur INTEGER REFERENCES utilisateur (IDutilisateur) NOT NULL ,
  titre VARCHAR(20)
 
);

CREATE SEQUENCE SeqIDliste START WITH 20000 INCREMENT BY 1;
ALTER TABLE liste ADD CONSTRAINT PK_IDliste PRIMARY KEY(IDliste);

-- Ces 2 listes appartiennent à l'utilisateur "test"(numero 10000)
INSERT INTO liste(IDliste, titre, IDutilisateur) VALUES (nextval('SeqIDliste'), 'Coucou',  10000);
INSERT INTO liste(IDliste, titre, IDutilisateur) VALUES (nextval('SeqIDliste'), 'Yeah',  10000);

-- création table tache
CREATE TABLE tache 
(
  IDtache INTEGER,
  IDliste INTEGER REFERENCES liste (IDliste) ON DELETE CASCADE NOT NULL,
  contenuTache VARCHAR(50),
  note VARCHAR(255),
  checked BOOLEAN DEFAULT FALSE,
  echeance VARCHAR(10)
);

CREATE SEQUENCE SeqIDtache START WITH 30000 INCREMENT BY 1;
ALTER TABLE tache ADD CONSTRAINT PK_IDtache PRIMARY KEY(IDtache);

-- Tache appartenant à la liste "coucou"
INSERT INTO tache(IDtache, contenuTache,echeance, IDliste) VALUES (nextval('SeqIDtache'),'Finir le projet','25/05/2020', 20000);
-- Tache appartenant à la liste "Yeah"
INSERT INTO tache(IDtache, contenuTache, echeance, IDliste) VALUES (nextval('SeqIDtache'), 'Bosser le projet','25/05/2020', 20001);
INSERT INTO tache(IDtache, contenuTache, echeance, IDliste) VALUES (nextval('SeqIDtache'), 'En chier pour le projet','25/05/2020', 20001);

CREATE TABLE etape
(
  IDetape INTEGER,
  IDtache INTEGER REFERENCES tache (IDtache) ON DELETE CASCADE NOT NULL,
  checked BOOLEAN DEFAULT FALSE,
  contenuEtape VARCHAR(100)
);

CREATE SEQUENCE SeqIDetape START WITH 40000 INCREMENT BY 1;
ALTER TABLE etape ADD CONSTRAINT PK_IDetape PRIMARY KEY(IDetape);

-- Etape appartenant à la tache "Bosser le projet"
INSERT INTO etape(IDetape, checked, contenuEtape, IDtache) VALUES (nextval('SeqIDetape'), TRUE, 'Commencer la base de donnée SQL', 30001);
INSERT INTO etape(IDetape, contenuEtape, IDtache) VALUES (nextval('SeqIDetape'), 'Tester la BDD sous Oracle SQL', 30001);
INSERT INTO etape(IDetape, contenuEtape, IDtache) VALUES (nextval('SeqIDetape'), 'Se rendre compte que Oracle SQL et PostgreSQL ont des difference', 30001);
INSERT INTO etape(IDetape, contenuEtape, IDtache) VALUES (nextval('SeqIDetape'), 'Pester pendant 24h pourquoi tout le monde ne fait pas le même SQL', 30001);
INSERT INTO etape(IDetape, contenuEtape, IDtache) VALUES (nextval('SeqIDetape'), 'HAAAAAAAAAAAAAA!!!!!!!!!!!', 30001);