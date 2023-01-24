CREATE TRIGGER `INBOOK`.`crea_notifica_NUOVA` AFTER INSERT ON `INBOOK`.`PRENOTAZIONI`
  FOR EACH ROW INSERT INTO INBOOK.NOTIFICHE (ID_prenotazione, ID_utente, ID_fornitore, Descrizione_notifica) VALUES (NEW.ID, NEW.ID_utente, NEW.ID_fornitore, "Nuova prenotazione");

DELIMITER $$
CREATE TRIGGER `INBOOK`.`crea_notifica_ANNULLATA` AFTER UPDATE ON `INBOOK`.`PRENOTAZIONI`
  FOR EACH ROW 
  BEGIN
    IF NEW.Stato = "Annullato" THEN
    INSERT INTO INBOOK.NOTIFICHE (ID_prenotazione, ID_utente, ID_fornitore, Descrizione_notifica) VALUES (NEW.ID, NEW.ID_utente, NEW.ID_fornitore, "Prenotazione Annullata");
    END IF;
  END;
$$



DELIMITER $$
CREATE EVENT aggiorna_stato_prenotazioni
    ON schedule
        EVERY 1 HOUR
    DO UPDATE INBOOK.PRENOTAZIONI, (SELECT ID FROM PRENOTAZIONI WHERE TIMESTAMPDIFF(SECOND,Orario_prenotazione_fine, NOW()) > 0 AND Stato = 'Attivo') AS finite SET Stato = 'Completato' WHERE INBOOK.PRENOTAZIONI.ID = finite.ID;
$$

