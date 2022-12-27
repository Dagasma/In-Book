use dagasma;

CREATE TABLE FORNITORE(
  	ID char(16) NOT NULL UNIQUE  PRIMARY KEY,
  	Nome varchar(16),
    Cognome varchar(16),
    Nome_Attivita varchar(50) NOT NULL,
    Tipo_Attivita varchar(30) NOT NULL,
    Email varchar(30) NOT NULL UNIQUE,
    Telefono int NOT NULL UNIQUE ,
    Indirizzo varchar(60) UNIQUE,
    Capienza_massima int DEFAULT 1,
    Orario date
);

CREATE TABLE FORNITORE(
  	ID char(16) NOT NULL UNIQUE  PRIMARY KEY,
  	ID-Fornitore char(16) NOT NULL,
    Giorno date,
    Ora-inizio date,
    Ora-fine date,
);

CREATE TABLE SERVIZI(
    ID char(16) NOT NULL UNIQUE PRIMARY KEY,
    ID_fornitore char(16) NOT NULL,
    Tipologia char(30),
    Durata date
);

CREATE TABLE PRENOTAZIONI(
ID char(16) NOT NULL UNIQUE PRIMARY KEY,
ID_utente char(16) NOT NULL ,
ID_servizio char(16) NOT NULL ,
Orario_richiesta date,
Orario_prenotazione date,
Stato ENUM('Attivo', 'Annullato', 'Completato'),
Numero_clienti int DEFAULT 1
);

CREATE TABLE UTENTE(
ID char(16) NOT NULL UNIQUE PRIMARY KEY,
Nome char(16) NOT NULL ,
Cognome char(16) NOT NULL ,
Email varchar(20) NOT NULL UNIQUE,
Password_acc varchar(20) NOT NULL,
Data_di_nascita date,
Telefono varchar(10) NOT NULL UNIQUE
);

ALTER TABLE FORNITORE
ADD CONSTRAINT fk_o1 FOREIGN KEY SERVIZI(ID_fornitore) REFERENCES ORARIO(ID_fornitore);

ALTER TABLE PRENOTAZIONI
ADD CONSTRAINT fk_p1 FOREIGN KEY (ID_servizio) REFERENCES SERVIZI(ID);

ALTER TABLE PRENOTAZIONI
ADD CONSTRAINT fk_p2 FOREIGN KEY (ID_utente) REFERENCES UTENTE(ID);

ALTER TABLE SERVIZI
ADD CONSTRAINT fk_s1 FOREIGN KEY (ID_fornitore) REFERENCES FORNITORE(ID);

