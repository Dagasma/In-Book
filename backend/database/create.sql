    CREATE DATABASE INBOOK;

    USE INBOOK;
    
    CREATE TABLE IF NOT EXISTS `INBOOK`.`UTENTI`(
        ID varchar(36) NOT NULL PRIMARY KEY, #mappato con keycloak
        Nome char(255) NOT NULL ,
        Cognome char(255) NOT NULL ,
        Email varchar(255) NOT NULL UNIQUE,
        Data_di_nascita date,
        Telefono varchar(30) NOT NULL UNIQUE,
        Tipo ENUM('Cliente', 'Amministratore', 'Fornitore') NOT NULL,
        Bloccato BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS `INBOOK`.`FORNITORI`(
        ID_utente_fornitore varchar(36) NOT NULL PRIMARY KEY,
        Nome_Attivita varchar(50) NOT NULL,
        Tipo_Attivita varchar(30) NOT NULL,
        Indirizzo varchar(60),  #tolto unique
        Capienza_massima int DEFAULT 1 NOT NULL
    );

    CREATE TABLE IF NOT EXISTS `INBOOK`.`ORARI_ATTIVITA`(
        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ID_fornitore varchar(36) NOT NULL,
        Giorno_della_settimana ENUM('Lunedi','Martedi','Mercoledi','Giovedi','Venerdi','Sabato','Domenica') NOT NULL,
        Orario_apertura TIME(0) NOT NULL,   # modificato orario dell'attività(per gestire più orari in base all'attività es. 10:00-13:00 e 16:00-20:00)
        Orario_chiusura TIME(0) NOT NULL    # hh:mm:ss -> per avere in output hh:mm -> TIME_FORMAT(orario, '%k:%i')
    );


    CREATE TABLE IF NOT EXISTS `INBOOK`.`SERVIZI`(
        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ID_fornitore varchar(36) NOT NULL,
        Tipologia char(30) NOT NULL,
        Descrizione char(200),
        Durata TIME(0) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS `INBOOK`.`PRENOTAZIONI`(
        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ID_utente varchar(36) NOT NULL ,
        ID_fornitore varchar(36) NOT NULL,         #inserito per accedere piu facilmente alla tabella prenotazioni evitando di passare per la tab. servizi
        ID_servizio int NOT NULL ,
        Orario_richiesta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        Orario_prenotazione_inizio DATETIME NOT NULL,
        Orario_prenotazione_fine DATETIME NOT NULL,
        Stato ENUM('Attivo', 'Annullato', 'Completato'),
        Numero_clienti int DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS `INBOOK`.`VOTAZIONI`(
        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ID_fornitore varchar(36) NOT NULL ,
        ID_utente varchar(36) NOT NULL ,
        Voto integer 
    );

    CREATE TABLE IF NOT EXISTS `INBOOK`.`NOTIFICHE`(
        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ID_prenotazione int NOT NULL,
        ID_utente varchar(36) NOT NULL,
        ID_fornitore varchar(36) NOT NULL,
        Descrizione_notifica varchar(255)
    );
