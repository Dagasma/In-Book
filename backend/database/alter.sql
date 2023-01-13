-- FOREIGN KEYS CONSTRAINTS

ALTER TABLE `INBOOK`.`FORNITORI`
ADD CONSTRAINT fk_fornitori_utenti FOREIGN KEY FORNITORI(ID_utente_fornitore) REFERENCES UTENTI(ID)
ON DELETE CASCADE;
-- Aggiungere vincolo per stabilire che tutti i fornitori nella tabella FORNITORI abbiano un'istanza nella tabella UTENTI_VISITATORI con TIPO = FORNITORE (da fare con una funzione in mysql o da gestire in js)

ALTER TABLE `INBOOK`.`ORARI_ATTIVITA`
ADD CONSTRAINT fk_orari_fornitori FOREIGN KEY ORARI(ID_fornitore) REFERENCES FORNITORI(ID_utente_fornitore)
ON DELETE NO ACTION;

ALTER TABLE `INBOOK`.`PRENOTAZIONI`
ADD CONSTRAINT fk_prenotazioni_servizi FOREIGN KEY PRENOTAZIONI(ID_servizio) REFERENCES SERVIZI(ID)
ON DELETE NO ACTION;


ALTER TABLE `INBOOK`.`PRENOTAZIONI`
ADD CONSTRAINT fk_prenotazioni_utenti FOREIGN KEY PRENOTAZIONI(ID_utente) REFERENCES UTENTI(ID)
ON DELETE NO ACTION;

ALTER TABLE `INBOOK`.`PRENOTAZIONI`
ADD CONSTRAINT fk_prenotazioni_fornitori FOREIGN KEY PRENOTAZIONI(ID_fornitore) REFERENCES FORNITORI(ID_utente_fornitore)
ON DELETE NO ACTION;


ALTER TABLE `INBOOK`.`SERVIZI`
ADD CONSTRAINT fk_servizi_fornitori FOREIGN KEY SERVIZI(ID_fornitore) REFERENCES FORNITORI(ID_utente_fornitore)
ON DELETE NO ACTION;

ALTER TABLE `INBOOK`.`VOTAZIONI`
ADD CONSTRAINT fk_votazioni_fornitori FOREIGN KEY VOTAZIONI(ID_fornitore) REFERENCES FORNITORI(ID_utente_fornitore)
ON DELETE NO ACTION;

ALTER TABLE `INBOOK`.`VOTAZIONI`
ADD CONSTRAINT fk_votazioni_utenti FOREIGN KEY VOTAZIONI(ID_utente) REFERENCES UTENTI(ID)
ON DELETE NO ACTION;


ALTER TABLE `INBOOK`.`NOTIFICHE`
ADD CONSTRAINT fk_notifiche_fornitori FOREIGN KEY NOTIFICHE(ID_fornitore) REFERENCES FORNITORI(ID_utente_fornitore)
ON DELETE NO ACTION;

ALTER TABLE `INBOOK`.`NOTIFICHE`
ADD CONSTRAINT fk_notifiche_utenti FOREIGN KEY NOTIFICHE(ID_utente) REFERENCES UTENTI(ID)
ON DELETE NO ACTION;


-- DOMAIN CONSTRAINTS (i piu complicati vengono gestiti nella logica di business (js))

-- vincolo su ORARI_ATTIVITA: orario apertura < chiusura, e su 0<orario<24
ALTER TABLE `INBOOK`.`ORARI_ATTIVITA`
ADD CONSTRAINT chk_ORARI_ATTIVITA_apertura CHECK (Orario_apertura>'00:00:00' and Orario_apertura<'23:59:59');
ALTER TABLE `INBOOK`.`ORARI_ATTIVITA`
ADD CONSTRAINT chk_ORARI_ATTIVITA_chiusura CHECK (Orario_chiusura>'00:00:00' and Orario_chiusura<'23:59:59');
ALTER TABLE `INBOOK`.`ORARI_ATTIVITA`
ADD CONSTRAINT chk_ORARI_ATTIVITA_apertura_chiusura CHECK (Orario_apertura<Orario_chiusura);

-- vincolo su PRENOTAZIONI: orario prenotazione - Orario_richiesta > 4h
ALTER TABLE `INBOOK`.`PRENOTAZIONI`                                                     
ADD CONSTRAINT chk_PRENOTAZIONI_orario_prenotazione_richiesta CHECK ((TIMEDIFF(Orario_prenotazione_inizio, Orario_richiesta)) < '4:00:00');


--vincolo FORNITORE NON PUO FARE VOTAZIONE AL SUO STESSO SERVIZIO
ALTER TABLE `INBOOK`.`VOTAZIONI`
ADD CONSTRAINT chk_VOTAZIONI_FORNITORE_UTENTE CHECK (ID_fornitore <> ID_utente);

-- GIULIANO : vincoli in modo tale che un utente non bloca un admin 
-- ALTER TABLE `INBOOK`.`BLOCCATI`
-- ADD CONSTRAINT chk_Amministratori CHECK (SELECT U.Stato from `INBOOK`.`UTENTI` as U WHERE ID_utente=U.ID <> 'Amministratore');
-- ALTER TABLE `INBOOK`.`BLOCCATI`
-- ADD CONSTRAINT chk_Amministratori CHECK (SELECT U.Stato from `INBOOK`.`UTENTI` as U WHERE ID_amministratore=U.ID  == 'Amministratore');

-- questi vincoli possono essere gestiti solo con le funzioni/trigger, altrimenti in js
-- capienza MAX rispetto alle prenotazioni
-- vincolo sull'intervallo [orario apertura2,orario chiusura2] dev'essere disgiunto da [orario apertura1,orario apertura1]
-- vincolo su utente che non può effettuare piu richieste di prenotazione 
-- per uno stesso orario (o orari non disgiunti)
