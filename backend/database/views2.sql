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




#chest è a bon



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