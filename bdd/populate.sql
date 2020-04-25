-- vidage table et sequence
--DROP TABLE utilisateurs CASCADE CONSTRAINT;
DROP TABLE IF EXISTS utilisateurs;
--DROP TABLE listes CASCADE CONSTRAINT;
DROP TABLE IF EXISTS listes;
--DROP TABLE taches CASCADE CONSTRAINT;
DROP TABLE IF EXISTS taches;
DROP SEQUENCE IF EXISTS SeqIDutilisateurs;
DROP SEQUENCE IF EXISTS SeqIDlistes;
DROP SEQUENCE IF EXISTS SeqIDtaches;


-- création table utilisateurs
CREATE TABLE utilisateurs 
(
  IDutilisateurs INTEGER,
  username VARCHAR(20),
  email VARCHAR(50),
  unsecured_password VARCHAR(60)
);

CREATE SEQUENCE SeqIDutilisateurs START WITH 10000 INCREMENT BY 10;
ALTER TABLE utilisateurs ADD CONSTRAINT PK_IDutilisateurs PRIMARY KEY(IDutilisateurs);