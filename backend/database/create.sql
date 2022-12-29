
CREATE DATABASE INBOOK;

CREATE TABLE `INBOOK`.`UTENTI_VISITATORI`(
    ID char(16) NOT NULL UNIQUE PRIMARY KEY,
    Nome char(16) NOT NULL ,
    Cognome char(16) NOT NULL ,
    Email varchar(20) NOT NULL UNIQUE,
    Password_acc varchar(20) NOT NULL,
    Data_di_nascita date,
    Telefono varchar(10) NOT NULL UNIQUE,
    Created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    Tipo ENUM('Utente Autenticato', 'Amministratore', 'Fornitore')  --se NULL sono solo utente visitatore 
);

CREATE TABLE `INBOOK`.`FORNITORI`(
  	ID_utente_fornitore char(16) NOT NULL PRIMARY KEY,
    Nome_Attivita varchar(50) NOT NULL,
    Tipo_Attivita varchar(30) NOT NULL,
    Indirizzo varchar(60),  --tolto unique
    Capienza_massima int DEFAULT 1 NOT NULL
);

CREATE TABLE `INBOOK`.`ORARI_ATTIVITA`(
    ID char(16) NOT NULL UNIQUE  PRIMARY KEY,
    ID_fornitore char(16) NOT NULL,
    Orario_apertura TIME(0) NOT NULL,   --modificato orario dell'attività(per gestire più orari in base all'attività es. 10:00-13:00 e 16:00-20:00)
    Orario_chiusura TIME(0) NOT NULL    --hh:mm:ss -> per avere in output hh:mm -> TIME_FORMAT(orario, '%k:%i')
);


CREATE TABLE `INBOOK`.`SERVIZI`(
    ID char(16) NOT NULL UNIQUE PRIMARY KEY,
    ID_fornitore char(16) NOT NULL,
    Tipologia char(30) NOT NULL,
    Descrizione char(30),
    Durata TIME(0) NOT NULL
);

CREATE TABLE `INBOOK`.`PRENOTAZIONI`(
    ID char(16) NOT NULL UNIQUE PRIMARY KEY,
    ID_utente char(16) NOT NULL ,
    ID_servizio char(16) NOT NULL ,
    Orario_richiesta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Orario_prenotazione DATETIME NOT NULL,
    Stato ENUM('Attivo', 'Annullato', 'Completato'),
    Numero_clienti int DEFAULT 1
);



