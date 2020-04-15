-- vidage table et sequence
DROP TABLE utilisateurs CASCADE CONSTRAINT;
DROP TABLE listes CASCADE CONSTRAINT;
DROP TABLE taches CASCADE CONSTRAINT;
DROP SEQUENCE SeqIDutilisateurs;
DROP SEQUENCE SeqIDlistes;
DROP SEQUENCE SeqIDtaches;


-- création table utilisateurs

CREATE TABLE utilisateurs 
(
  IDutilisateurs INTEGER,
  username VARCHAR(20),
  email VARCHAR(50),
  password VARCHAR(60)
);

CREATE SEQUENCE SeqIDutilisateurs START WITH 10000 INCREMENT BY 10;
ALTER TABLE utilisateurs ADD CONSTRAINT PK_IDutilisateurs PRIMARY KEY(IDutilisateurs);

INSERT INTO utilisateurs(IDutilisateurs, username, email, password) VALUES (SeqIDutilisateurs.NEXTVAL, 'test', 'test@gmail.com', '123');

-- création table listes
CREATE TABLE listes 
(
  IDlistes INTEGER,
  titre VARCHAR(20),
  contentemail VARCHAR(20)
);

CREATE SEQUENCE SeqIDlistes START WITH 20000 INCREMENT BY 10;
ALTER TABLE listes ADD CONSTRAINT PK_IDlistes PRIMARY KEY(IDlistes);
ALTER TABLE listes ADD (IDutilisateurs INTEGER);
ALTER TABLE listes MODIFY (IDutilisateurs INTEGER CONSTRAINT FK_IDutilisateurs REFERENCES utilisateurs(IDutilisateurs));
ALTER TABLE listes MODIFY (IDutilisateurs NOT NULL);

INSERT INTO listes(IDlistes, titre, contentemail, IDutilisateurs) VALUES (SeqIDlistes.NEXTVAL, 'liste de test', 'hein', 10000);

-- création table taches
CREATE TABLE taches 
(
  IDtaches INTEGER,
  contenuTache VARCHAR(50)
);

CREATE SEQUENCE SeqIDtaches START WITH 30000 INCREMENT BY 10;
ALTER TABLE taches ADD CONSTRAINT PK_IDtaches PRIMARY KEY(IDtaches);
ALTER TABLE taches ADD (IDlistes INTEGER);
ALTER TABLE taches MODIFY (IDlistes INTEGER CONSTRAINT FK_IDlistes REFERENCES listes(IDlistes));
ALTER TABLE taches MODIFY (IDlistes NOT NULL);

INSERT INTO taches(IDtaches, contenuTache, IDlistes) VALUES (SeqIDtaches.NEXTVAL, 'commencer le projet', 20000);
INSERT INTO taches(IDtaches, contenuTache, IDlistes) VALUES (SeqIDtaches.NEXTVAL, 'travailler le projet', 20000);
INSERT INTO taches(IDtaches, contenuTache, IDlistes) VALUES (SeqIDtaches.NEXTVAL, 'chier sur le projet', 20000);