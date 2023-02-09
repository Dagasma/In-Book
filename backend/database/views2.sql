CREATE OR REPLACE VIEW `INBOOK`.`VISTA_CAPIENZA_ATTIVITA_ORARIO_ATTIVITA` 
AS SELECT f.Capienza_massima, o.Giorno_della_settimana, o.Orario_apertura, o.Orario_chiusura
FROM `FORNITORE` as f INNER JOIN `ORARI_ATTIVITA` as o ON o.ID_fornitore = f.ID_utente_fornitore;


CREATE OR REPLACE VIEW `INBOOK`.`VISTA_PRENOTAZIONI_PER_INTERVALLO` 
AS SELECT *
FROM (`PRENOTAZIONI` as p INNER JOIN `SERVIZI` as s ON p.ID_servizio = s.ID) INNER JOIN ORARI_ATTIVITA as o ON o.ID_fornitore = p.ID_fornitore
WHERE TIME(p.Orario_prenotazione) BETWEEN o.orario_apertura AND o.orario_chiusura
AND Date(p.Orario_prenotazione) = var_data_prenotazione and o.giorno_della_settimana = var_giorno and p.Stato = 'Attivo';


SELECT *
FROM (`PRENOTAZIONI` as p INNER JOIN `SERVIZI` as s ON p.ID_servizio = s.ID) INNER JOIN ORARI_ATTIVITA as o ON o.ID_fornitore = p.ID_fornitore
WHERE TIME(p.Orario_prenotazione) BETWEEN o.orario_apertura AND o.orario_chiusura
AND Date(p.Orario_prenotazione) = var_data_prenotazione and o.giorno_della_settimana = var_giorno and p.Stato = 'Attivo';



SELECT *
FROM (`PRENOTAZIONI` as p INNER JOIN `SERVIZI` as s ON p.ID_servizio = s.ID) INNER JOIN ORARI_ATTIVITA as o ON o.ID_fornitore = p.ID_fornitore
WHERE "16:00:00" <= TIME(p.Orario_prenotazione_inizio) AND  TIME(p.Orario_prenotazione_fine) <= "16:30:00"
AND TIME(p.Orario_prenotazione_inizio) >= o.Orario_apertura AND TIME(p.Orario_prenotazione_fine) <= o.Orario_chiusura
AND Date(p.Orario_prenotazione_inizio) = "2022-01-16" and o.giorno_della_settimana = "Domenica" and p.Stato = 'Attivo'
UNION
SELECT *
FROM (`PRENOTAZIONI` as p INNER JOIN `SERVIZI` as s ON p.ID_servizio = s.ID) INNER JOIN ORARI_ATTIVITA as o ON o.ID_fornitore = p.ID_fornitore
WHERE  TIME(p.Orario_prenotazione_inizio) <= "16:00:00" AND  "16:30:00" <= TIME(p.Orario_prenotazione_fine) 
AND TIME(p.Orario_prenotazione_inizio) >= o.Orario_apertura AND TIME(p.Orario_prenotazione_fine) <= o.Orario_chiusura
AND Date(p.Orario_prenotazione_inizio) = "2022-01-16" and o.giorno_della_settimana = "Domenica" and p.Stato = 'Attivo'


----------------------------------------------------keycloak


CREATE TRIGGER copy_keycloak_user AFTER INSERT ON `KEYCLOAK`.`USER_ENTITY`
BEGIN
  INSERT INTO `INBOOK`.`UTENTI` (ID,Nome,Cognome,Email) VALUES (`NEW`.`ID` ,`NEW`.`FIRST_NAME` ,`NEW`.`LAST_NAME` ,`NEW`.`EMAIL`);
  UPDATE `INBOOK`.`UTENTI` SET `Data_di_nascita` = (SELECT `VALUE` FROM `KEYCLOAK`.`USER_ATTRIBUTE` WHERE `USER_ID` = `NEW`.`ID` AND NAME='dob') WHERE `INBOOK`.`ID` =`NEW`.`ID`;
  UPDATE `INBOOK`.`UTENTI` SET `Telefono` = (SELECT `VALUE` FROM `KEYCLOAK`.`USER_ATTRIBUTE` WHERE `USER_ID` = `NEW`.`ID` AND NAME='mobile') WHERE `INBOOK`.`ID` =`NEW`.`ID`;
END;

CREATE TRIGGER copy_keycloak_user AFTER INSERT ON KEYCLOAK.USER_ENTITY
  FOR EACH ROW
  BEGIN
    INSERT INTO INBOOK.UTENTI (ID,Nome,Cognome,Email) VALUES (NEW.ID ,NEW.FIRST_NAME ,NEW.LAST_NAME ,NEW.EMAIL);
    UPDATE INBOOK.UTENTI SET Data_di_nascita = (SELECT VALUE FROM KEYCLOAK.USER_ATTRIBUTE WHERE USER_ID = NEW.ID AND NAME='dob') WHERE INBOOK.UTENTI.ID =NEW.ID;
    UPDATE INBOOK.UTENTI SET Telefono = (SELECT VALUE FROM KEYCLOAK.USER_ATTRIBUTE WHERE USER_ID = NEW.ID AND NAME='mobile') WHERE INBOOK.UTENTI.ID =NEW.ID;
  END;



DECLARE @telefono_utente VARCHAR(10);
DECLARE @data_utente DATE


set @telefono_utente := (SELECT Telefono FROM INBOOK.UTENTI WHERE INBOOK.UTENTI.ID = "ppozioz");
INSERT INTO INBOOK.UTENTI (ID,Nome,Cognome,Email,Telefono,Tipo) VALUES (NEW.ID ,NEW.FIRST_NAME ,NEW.LAST_NAME ,NEW.EMAIL, "342234","Cliente");


delimiter //
CREATE TRIGGER before_insert_money BEFORE INSERT ON money
FOR EACH
ROW
BEGIN
    UPDATE accounts SET balance=10.0;
END;
//
delimiter ;


CREATE TRIGGER `pippozzo` AFTER UPDATE ON `USER_ENTITY`
 FOR EACH ROW
 BEGIN
    set @telefono_utente := (SELECT VALUE FROM KEYCLOAK.USER_ATTRIBUTE WHERE USER_ID = NEW.ID AND NAME='mobile');
    set @data_nascita := (SELECT VALUE FROM KEYCLOAK.USER_ATTRIBUTE WHERE USER_ID = NEW.ID AND NAME='dob');
    INSERT INTO INBOOK.UTENTI (ID,Nome,Cognome,Email,Telefono,Data_di_nascita,Tipo) VALUES (NEW.ID ,NEW.FIRST_NAME ,NEW.LAST_NAME ,NEW.EMAIL, @telefono_utente, @data_nascita,"Cliente");
 END




 CREATE TRIGGER `pippozzo3` AFTER INSERT ON KEYCLOAK.`USER_ENTITY`
	FOR EACH ROW BEGIN   
         procedura_bella(NEW.ID ,NEW.FIRST_NAME ,NEW.LAST_NAME ,NEW.EMAIL);
	END;



--procedura_bella
DELIMITER $$

CREATE PROCEDURE procedura_bella (OLD_FIRST_NAME_u VARCHAR(255), ID_u VARCHAR(36), FIRST_NAME_u VARCHAR(255), LAST_NAME_u VARCHAR(255), EMAIL_u VARCHAR(255))
BEGIN
  DECLARE telefono_utente VARCHAR(30);
  DECLARE data_nascita DATE;
  
  set telefono_utente := (SELECT VALUE FROM KEYCLOAK.USER_ATTRIBUTE WHERE USER_ID = ID_u AND NAME='mobile');
  set data_nascita := (SELECT STR_TO_DATE(VALUE,'%Y-%m-%d') FROM KEYCLOAK.USER_ATTRIBUTE WHERE USER_ID = ID_u AND NAME='dob');
  
  IF OLD_FIRST_NAME_u is NULL THEN
    INSERT INTO INBOOK.UTENTI (ID,Nome,Cognome,Email,Telefono,Data_di_nascita,Tipo) VALUES (ID_u ,FIRST_NAME_u ,LAST_NAME_u ,EMAIL_u, telefono_utente, data_nascita,"Cliente");
  END IF;
END;
$$

DELIMITER ;

CREATE TRIGGER `pippozzo_trigger` AFTER UPDATE ON KEYCLOAK.`USER_ENTITY`
  FOR EACH ROW call procedura_bella(OLD.FIRST_NAME,NEW.ID, NEW.FIRST_NAME ,NEW.LAST_NAME ,NEW.EMAIL);