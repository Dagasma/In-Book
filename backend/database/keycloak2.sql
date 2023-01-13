DELIMITER $$
CREATE PROCEDURE procedura_bella (ID_u VARCHAR(36), FIRST_NAME_u VARCHAR(255), LAST_NAME_u VARCHAR(255), EMAIL_u VARCHAR(255))
BEGIN
  DECLARE telefono_utente VARCHAR(30);
  DECLARE data_nascita DATE;
  DECLARE tipo VARCHAR(255);
  DECLARE presente VARCHAR(255);
  
  set telefono_utente := (SELECT VALUE FROM KEYCLOAK.USER_ATTRIBUTE WHERE USER_ID = ID_u AND NAME='mobile');
  set data_nascita := (SELECT STR_TO_DATE(VALUE,'%Y-%m-%d') FROM KEYCLOAK.USER_ATTRIBUTE WHERE USER_ID = ID_u AND NAME='dob');
  set tipo := (SELECT VALUE FROM KEYCLOAK.USER_ATTRIBUTE WHERE USER_ID = ID_u AND NAME='tipo');
  set presente := (SELECT Nome FROM INBOOK.UTENTI WHERE ID = ID_u);
  IF EMAIL_u is NOT NULL AND telefono_utente IS NOT NULL AND data_nascita IS NOT NULL THEN
    IF presente is NULL THEN
      INSERT INTO INBOOK.UTENTI (ID,Nome,Cognome,Email,Telefono,Data_di_nascita,Tipo) VALUES (ID_u ,FIRST_NAME_u ,LAST_NAME_u ,EMAIL_u, telefono_utente, data_nascita,tipo);
    ELSE
      UPDATE INBOOK.UTENTI SET Nome = FIRST_NAME_u, Cognome = LAST_NAME_u, Email = EMAIL_u, Telefono = telefono_utente, Data_di_nascita = data_nascita WHERE ID = ID_u;
    END IF;
  END IF;
END;
$$
DELIMITER ;

CREATE TRIGGER `pippozzo_trigger` AFTER UPDATE ON KEYCLOAK.`USER_ENTITY`
  FOR EACH ROW call procedura_bella(NEW.ID, NEW.FIRST_NAME ,NEW.LAST_NAME ,NEW.EMAIL);