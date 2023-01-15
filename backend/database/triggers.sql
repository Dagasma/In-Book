CREATE TRIGGER `INBOOK`.`crea_notifica_NUOVA` AFTER INSERT ON `INBOOK`.`PRENOTAZIONI`
  FOR EACH ROW INSERT INTO INBOOK.NOTIFICHE (ID_prenotazione, ID_utente, ID_fornitore, Descrizione_notifica) VALUES (NEW.ID, NEW.ID_utente, NEW.ID_fornitore, "Nuova prenotazione");

CREATE TRIGGER `INBOOK`.`crea_notifica_ANNULLATA` AFTER UPDATE ON `INBOOK`.`PRENOTAZIONI`
  FOR EACH ROW 
  BEGIN
  IF NEW.Stato = "Annullato" THEN
    INSERT INTO INBOOK.NOTIFICHE (ID_prenotazione, ID_utente, ID_fornitore, Descrizione_notifica) VALUES (NEW.ID, NEW.ID_utente, NEW.ID_fornitore, "Prenotazione Annullata");
  END IF;

CREATE TRIGGER `INBOOK`.`crea_notifica_ELIMINATA` BEFORE DELETE ON `INBOOK`.`PRENOTAZIONI`
  FOR EACH ROW INSERT INTO INBOOK.NOTIFICHE (ID_prenotazione, ID_utente, ID_fornitore, Descrizione_notifica) VALUES (OLD.ID, OLD.ID_utente, OLD.ID_fornitore, "Prenotazione Eliminata");
