-- vidage table et sequence
--DROP TABLE utilisateurs CASCADE CONSTRAINT;
DROP TABLE IF EXISTS utilisateurs CASCADE;
--DROP TABLE listes CASCADE CONSTRAINT;
DROP TABLE IF EXISTS listes CASCADE;
--DROP TABLE taches CASCADE CONSTRAINT;
DROP TABLE IF EXISTS taches CASCADE;
-- Drop table etape
DROP TABLE IF EXISTS etapes CASCADE;
DROP SEQUENCE IF EXISTS SeqIDutilisateurs;
DROP SEQUENCE IF EXISTS SeqIDlistes;
DROP SEQUENCE IF EXISTS SeqIDtaches;
DROP SEQUENCE IF EXISTS SeqIDetape;

-- >Les IDutilsateurs commence par ressemblent à "1XXXXX" 
-- >>Les IDlistes commence par ressemblent à "2XXXXX"
-- >>>Les IDtaches commence par ressemblent à "3XXXXX" 
-- >>>>Les IDetape commence par ressemblent à "4XXXXX" 

-- création table utilisateurs
CREATE TABLE utilisateurs 
(
  IDutilisateurs INTEGER,
  email VARCHAR(50),
  unsecured_password VARCHAR(60)
);

CREATE SEQUENCE SeqIDutilisateurs START WITH 10000 INCREMENT BY 10;
ALTER TABLE utilisateurs ADD CONSTRAINT PK_IDutilisateurs PRIMARY KEY(IDutilisateurs);

-- c'est à partir de là que Oracle SQL et PostgreSQL ne sont pas d'accord
-- ID: test@gmail.com Pass: password
INSERT INTO utilisateurs(IDutilisateurs, email, unsecured_password) VALUES (nextval('SeqIDutilisateurs'), 'test@gmail.com', '$2b$10$qQGzUHQlo/Yy7SWVjCaruuR692KRzD1XhuyqXlz6hWejdBl9I7r/a');

-- création table listes
CREATE TABLE listes 
(
  IDlistes INTEGER,
  IDutilisateurs INTEGER REFERENCES utilisateurs (IDutilisateurs) NOT NULL,
  titre VARCHAR(20),
  content VARCHAR(50)
);

CREATE SEQUENCE SeqIDlistes START WITH 20000 INCREMENT BY 10;
ALTER TABLE listes ADD CONSTRAINT PK_IDlistes PRIMARY KEY(IDlistes);

-- Ces 2 listes appartiennent à l'utilisateur "test"(numero 10000)
INSERT INTO listes(IDlistes, titre, content, IDutilisateurs) VALUES (nextval('SeqIDlistes'), 'Coucou', 'something interesting', 10000);
INSERT INTO listes(IDlistes, titre, content, IDutilisateurs) VALUES (nextval('SeqIDlistes'), 'Yeah', 'something else !', 10000);

-- création table taches
CREATE TABLE taches 
(
  IDtaches INTEGER,
  IDlistes INTEGER REFERENCES listes (IDlistes) NOT NULL,
  contenuTache VARCHAR(50)
  --rajouter un boolean "is_checked" Attention BOOLEAN n'existe que dans PostgreSQL!!
);

CREATE SEQUENCE SeqIDtaches START WITH 30000 INCREMENT BY 10;
ALTER TABLE taches ADD CONSTRAINT PK_IDtaches PRIMARY KEY(IDtaches);

-- Tache appartenant à la liste "coucou"
INSERT INTO taches(IDtaches, contenuTache, IDlistes) VALUES (nextval('SeqIDtaches'), 'Finir le projet', 20000);
-- Tache appartenant à la liste "Yeah"
INSERT INTO taches(IDtaches, contenuTache, IDlistes) VALUES (nextval('SeqIDtaches'), 'Bosser le projet', 20010);
INSERT INTO taches(IDtaches, contenuTache, IDlistes) VALUES (nextval('SeqIDtaches'), 'En chier pour le projet', 20010);

CREATE TABLE etapes
(
  IDetape INTEGER,
  IDtaches INTEGER REFERENCES taches (IDtaches) NOT NULL,
  contenuEtape VARCHAR(100)
);

CREATE SEQUENCE SeqIDetape START WITH 40000 INCREMENT BY 10;
ALTER TABLE etapes ADD CONSTRAINT PK_IDetape PRIMARY KEY(IDetape);

-- Etape appartenant à la tache "Bosser le projet"
INSERT INTO etapes(IDetape, contenuEtape, IDtaches) VALUES (nextval('SeqIDetape'), 'Commencer la base de donnée SQL', 30010);
INSERT INTO etapes(IDetape, contenuEtape, IDtaches) VALUES (nextval('SeqIDetape'), 'Tester la BDD sous Oracle SQL', 30010);
INSERT INTO etapes(IDetape, contenuEtape, IDtaches) VALUES (nextval('SeqIDetape'), 'Se rendre compte que Oracle SQL et PostgreSQL ont des difference', 30010);
INSERT INTO etapes(IDetape, contenuEtape, IDtaches) VALUES (nextval('SeqIDetape'), 'Pester pendant 24h pourquoi tout le monde ne fait pas le même SQL', 30010);
INSERT INTO etapes(IDetape, contenuEtape, IDtaches) VALUES (nextval('SeqIDetape'), 'HAAAAAAAAAAAAAA!!!!!!!!!!!', 30010);