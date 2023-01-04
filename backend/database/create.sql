    CREATE DATABASE INBOOK;
    
    CREATE TABLE IF NOT EXISTS `INBOOK`.`UTENTI`(
        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        Nome char(16) NOT NULL ,
        Cognome char(16) NOT NULL ,
        Email varchar(20) NOT NULL UNIQUE,
        Password_acc varchar(20) NOT NULL,
        Data_di_nascita date,
        Telefono varchar(10) NOT NULL UNIQUE,
        Tipo ENUM('Cliente', 'Amministratore', 'Fornitore','Bloccato') NOT NULL,
        Autenticato BOOLEAN
    );

    CREATE TABLE IF NOT EXISTS `INBOOK`.`FORNITORI`(
        ID_utente_fornitore int NOT NULL PRIMARY KEY,
        Nome_Attivita varchar(50) NOT NULL,
        Tipo_Attivita varchar(30) NOT NULL,
        Indirizzo varchar(60),  -- tolto unique
        Capienza_massima int DEFAULT 1 NOT NULL
    );

    CREATE TABLE IF NOT EXISTS `INBOOK`.`ORARI_ATTIVITA`(
        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ID_fornitore int NOT NULL,
        Giorno_della_settimana ENUM('Lunedi','Martedi','Mercoledi','Giovedi','Venerdi','Sabato','Domenica') NOT NULL,
        Orario_apertura TIME(0) NOT NULL,   -- modificato orario dell'attività(per gestire più orari in base all'attività es. 10:00-13:00 e 16:00-20:00)
        Orario_chiusura TIME(0) NOT NULL    -- hh:mm:ss -> per avere in output hh:mm -> TIME_FORMAT(orario, '%k:%i')
    );


    CREATE TABLE IF NOT EXISTS `INBOOK`.`SERVIZI`(
        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ID_fornitore int NOT NULL,
        Tipologia char(30) NOT NULL,
        Descrizione char(30),
        Durata TIME(0) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS `INBOOK`.`PRENOTAZIONI`(
        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ID_utente int NOT NULL ,
        ID_servizio int NOT NULL ,
        Orario_richiesta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        Orario_prenotazione DATETIME NOT NULL,
        Stato ENUM('Attivo', 'Annullato', 'Completato'),
        Numero_clienti int DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS `INBOOK`.`VOTAZIONI`(
        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ID_fornitore int NOT NULL ,
        ID_utente int NOT NULL ,
        Voto integer 
    );

    CREATE TABLE IF NOT EXISTS `INBOOK`.`NOTIFICHE`(
        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ID_prenotazione int NOT NULL,
        ID_utente int NOT NULL,
        ID_fornitore int NOT NULL,
        Descrizione_notifica varchar(255)
    );

    CREATE TABLE IF NOT EXISTS `INBOOK`.`BLOCCATI`(
        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ID_utente int NOT NULL,
        ID_amministratore int NOT NULL,
        Descrizione_notifica varchar(255)
    );