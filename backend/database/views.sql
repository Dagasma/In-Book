
CREATE OR REPLACE VIEW `INBOOK`.`VISTA_PRENOTAZIONI_CLIENTI_PER_FORNITORE` 
AS SELECT p.ID, p.ID_fornitore, p.ID_servizio, p.Orario_richiesta, p.Orario_prenotazione_inizio, p.Orario_prenotazione_fine, p.Stato, p.Numero_clienti, u.Nome, u.Cognome, u.Email, u.Telefono 
FROM `PRENOTAZIONI` as p INNER JOIN `UTENTI` as u ON p.ID_utente = u.ID;

