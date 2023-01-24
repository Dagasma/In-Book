INSERT INTO `INBOOK`.`UTENTI`(ID,Nome,Cognome,Email,Data_di_nascita,Telefono,Tipo,Bloccato) VALUES (1,'Giovanni','Marescalco','MarLuca@gmail.com','1978-08-16',3405817073,'Cliente',0);
INSERT INTO `INBOOK`.`UTENTI`(ID,Nome,Cognome,Email,Data_di_nascita,Telefono,Tipo,Bloccato) VALUES (2,'Lucia','Rossi','Roa@gmail.com','1999-01-29',3351614699,'Cliente',0);
INSERT INTO `INBOOK`.`UTENTI`(ID,Nome,Cognome,Email,Data_di_nascita,Telefono,Tipo,Bloccato) VALUES (3,'Mario','Cavani','CaLuca@gmail.com','1988-07-19',3429964259,'Cliente',1);
INSERT INTO `INBOOK`.`UTENTI`(ID,Nome,Cognome,Email,Data_di_nascita,Telefono,Tipo,Bloccato) VALUES (4,'Maria','Luciano','Luciaca@gmail.com','1975-06-21',3360496720,'Cliente',0);
INSERT INTO `INBOOK`.`UTENTI`(ID,Nome,Cognome,Email,Data_di_nascita,Telefono,Tipo,Bloccato) VALUES (5,'Peppe','Magro','Magra@gmail.com','1980-12-30',3420949059,'Fornitore',0);
INSERT INTO `INBOOK`.`UTENTI`(ID,Nome,Cognome,Email,Data_di_nascita,Telefono,Tipo,Bloccato) VALUES (6,'Teresa','Verde','VerdeLuca@gmail.com','1979-09-22',3351013549,'Fornitore',0);
INSERT INTO `INBOOK`.`UTENTI`(ID,Nome,Cognome,Email,Data_di_nascita,Telefono,Tipo,Bloccato) VALUES (7,'Maria','Russo','Rca@gmail.com','1972-02-16',3334100204,'Cliente',0);
INSERT INTO `INBOOK`.`UTENTI`(ID,Nome,Cognome,Email,Data_di_nascita,Telefono,Tipo,Bloccato) VALUES (8,'Teresa','Esposito','Verca@gmail.com','1979-09-22',3351013540,'Fornitore',0);
INSERT INTO `INBOOK`.`UTENTI`(ID,Nome,Cognome,Email,Data_di_nascita,Telefono,Tipo,Bloccato) VALUES (9,'Luca','Esposito','Espoa@gmail.com','1983-12-20',3410439892,'Amministratore',0);



INSERT INTO `INBOOK`.`FORNITORI`(ID_utente_fornitore,Tipo_Attivita,Nome_Attivita,Indirizzo,Capienza_massima) VALUES (5,'Gym','GymLuca','Via marina , 42011',70);
INSERT INTO `INBOOK`.`FORNITORI`(ID_utente_fornitore,Tipo_Attivita,Nome_Attivita,Indirizzo,Capienza_massima) VALUES (6,'Barbiere','BarbiereLuca','via enrico , 12084',10);
INSERT INTO `INBOOK`.`FORNITORI`(ID_utente_fornitore,Tipo_Attivita,Nome_Attivita,Indirizzo,Capienza_massima) VALUES (8,'Dentista','DentistaLuca','C.so michelangelo, 13202',4);


INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (1,5,'Martedi','8:00','13:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (2,5,'Mercoledi','8:00','13:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (3,5,'Giovedi','8:00','13:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (4,5,'Venerdi','8:00','13:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (5,5,'Sabato','10:00','13:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (6,5,'Domenica','10:00','13:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (7,5,'Lunedi','15:00','17:30');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (8,5,'Martedi','15:00','19:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (9,5,'Mercoledi','15:00','19:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (10,5,'Giovedi','15:00','19:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (11,5,'Venerdi','15:00','19:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (12,5,'Sabato','15:00','18:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (13,6,'Lunedi','9:00','13:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (14,6,'Martedi','9:00','13:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (15,6,'Mercoledi','9:00','13:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (16,6,'Giovedi','9:00','13:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (17,6,'Venerdi','9:00','13:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (18,6,'Sabato','9:00','13:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (19,6,'Domenica','9:00','12:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (20,6,'Lunedi','15:00','17:30');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (21,6,'Martedi','15:00','19:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (22,6,'Mercoledi','15:00','19:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (23,6,'Giovedi','15:00','19:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (24,6,'Venerdi','15:00','19:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (25,6,'Sabato','15:00','18:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (26,6,'Domenica','9:00','17:30');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (27,8,'Lunedi','9:00','20:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (28,8,'Martedi','7:00','18:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (29,8,'Mercoledi','8:00','17:30');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (30,8,'Giovedi','9:30','20:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (31,8,'Venerdi','9:00','21:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (32,8,'Sabato','8:00','19:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (33,8,'Domenica','8:30','18:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (34,8,'Lunedi','9:00','20:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (35,8,'Martedi','7:00','18:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (36,8,'Mercoledi','8:00','17:30');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (37,8,'Giovedi','9:30','20:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (38,8,'Venerdi','9:00','21:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (39,8,'Sabato','8:00','19:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (40,8,'Domenica','8:30','18:00');
INSERT INTO `INBOOK`.`ORARI_ATTIVITA`(ID,ID_fornitore,Giorno_della_settimana,Orario_apertura,Orario_chiusura) VALUES (41,5,'Lunedi','8:00','13:00');



INSERT INTO `INBOOK`.`SERVIZI`(ID,ID_fornitore,Tipologia,Descrizione,Durata) VALUES (1,5,'Allenamento peronalizzato','Allenamento di 1:00  ','1:00');
INSERT INTO `INBOOK`.`SERVIZI`(ID,ID_fornitore,Tipologia,Descrizione,Durata) VALUES (2,5,'Prova','Giornata di prova nella ','1:30');
INSERT INTO `INBOOK`.`SERVIZI`(ID,ID_fornitore,Tipologia,Descrizione,Durata) VALUES (3,5,'Consulenza','Scelta di un piano','0:30');
INSERT INTO `INBOOK`.`SERVIZI`(ID,ID_fornitore,Tipologia,Descrizione,Durata) VALUES (4,5,'Piscina','2:00 in piscina','2:00');
INSERT INTO `INBOOK`.`SERVIZI`(ID,ID_fornitore,Tipologia,Descrizione,Durata) VALUES (5,6,'Barba','Taglio della barba con musica ','0:30');
INSERT INTO `INBOOK`.`SERVIZI`(ID,ID_fornitore,Tipologia,Descrizione,Durata) VALUES (6,6,'Capelli','Taglio capelli ','1:00');
INSERT INTO `INBOOK`.`SERVIZI`(ID,ID_fornitore,Tipologia,Descrizione,Durata) VALUES (7,8,'Controllo','Controllo denti e  ','0:30');
INSERT INTO `INBOOK`.`SERVIZI`(ID,ID_fornitore,Tipologia,Descrizione,Durata) VALUES (8,6,'Pulizia dentale','Pulizia dei ','1:00');
INSERT INTO `INBOOK`.`SERVIZI`(ID,ID_fornitore,Tipologia,Descrizione,Durata) VALUES (9,5,'Controllo peso','Controllo da','0:30');




INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (1,3,6,6,'2022-01-02 00:00:00','2022-01-16 10:30:00','2022-01-16 11:30:00','Attivo',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (2,4,6,5,'2022-01-01 00:00:00','2022-01-16 11:00:00','2022-01-16 11:30:00','Attivo',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (3,7,6,6,'2022-01-01 00:00:00','2022-01-16 11:00:00','2022-01-16 12:00:00','Attivo',2);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (4,2,6,5,'2022-01-02 00:00:00','2022-01-16 16:00:00','2022-01-16 16:30:00','Attivo',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (5,3,6,6,'2022-01-02 00:00:00','2022-01-16 16:00:00','2022-01-16 17:00:00','Annullato',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (6,4,6,5,'2022-01-01 00:00:00','2022-01-16 16:30:00','2022-01-16 17:00:00','Attivo',3);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (7,7,6,6,'2022-01-01 00:00:00','2022-01-17 10:00:00','2022-01-17 11:00:00','Attivo',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (8,2,6,5,'2022-01-02 00:00:00','2022-01-17 10:00:00','2022-01-17 10:30:00','Attivo',2);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (9,3,6,6,'2022-01-02 00:00:00','2022-01-17 11:00:00','2022-01-17 12:00:00','Attivo',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (10,4,6,5,'2022-01-01 00:00:00','2022-01-17 10:00:00','2022-01-17 10:30:00','Attivo',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (11,7,6,6,'2022-01-02 00:00:00','2022-01-17 16:00:00','2022-01-17 17:00:00','Annullato',2);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (12,2,6,5,'2022-01-02 00:00:00','2022-01-17 10:00:00','2022-01-17 10:30:00','Attivo',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (14,2,6,5,'2022-01-02 00:00:00','2022-01-16 16:00:00','2022-01-16 16:30:00','Attivo',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (15,3,6,6,'2022-01-02 00:00:00','2022-01-16 16:00:00','2022-01-16 17:00:00','Annullato',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (16,4,6,5,'2022-01-01 00:00:00','2022-01-16 16:30:00','2022-01-16 17:00:00','Attivo',3);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (17,7,6,6,'2022-01-01 00:00:00','2022-01-17 10:00:00','2022-01-17 11:00:00','Attivo',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (18,2,6,5,'2022-01-02 00:00:00','2022-01-17 10:00:00','2022-01-17 10:30:00','Attivo',2);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (19,3,6,6,'2022-01-02 00:00:00','2022-01-17 11:00:00','2022-01-17 12:00:00','Attivo',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (20,4,6,5,'2022-01-01 00:00:00','2022-01-17 10:00:00','2022-01-17 10:30:00','Attivo',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (21,7,6,6,'2022-01-02 00:00:00','2022-01-17 16:00:00','2022-01-17 17:00:00','Annullato',2);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (22,2,6,5,'2022-01-02 00:00:00','2022-01-17 10:00:00','2022-01-17 10:30:00','Attivo',1);
INSERT INTO `INBOOK`.`PRENOTAZIONI`(ID,ID_utente,ID_fornitore,ID_servizio,Orario_richiesta,Orario_prenotazione_inizio,Orario_prenotazione_fine,Stato,Numero_clienti) VALUES (24,2,6,5,'2022-01-01 00:00:00','2022-01-16 10:00:00','2022-01-16 10:30:00','Attivo',2);
