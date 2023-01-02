Ho eliminato "Cliente_controller.js"" ed è diventato "Utente_Controller.js"

- Find One : cerca per uno specifico ID che inviamo
- Fin All : cerca in base alla condizione che inviamo
- Update :  aggiorna per uno specifico ID , dato che per modificare un elemento bisogna visualizzarlo ,allora ogni volta che lo visualizziamo prendiamo l'ID cosi da aggiornarlo piu facilemente.

controller UTENTE:

* [X] CREATE ( ho un interfaccia specifica per il cliente)
* [X] UPDATE
* [X] FIND ONE
* [X] FIND ALL

controller FORNITORI:

* [X] CREATE ( ho un interfaccia specifica per il fornitore)
* [X] UPDATE
* [X] FIND ONE
* [X] FIND ALL

controller ORARI_ATTIVITA:

* [X] CREATE ( ogni volta che chiamo il create creo una sola istanza , ricordarsi di chiamarlo n-volte)
* [X] UPDATE
* [X] FIND ONE
* [X] FIND ALL

controller SERVIZI:

* [X] CREATE
* [X] UPDATE
* [X] FIND ONE
* [X] FIND ALL

controller PRENOTAZIONI:

* [X] CREATE ( orario_di_richiesta non inserito perche lo fa gia la tabella giusto? quando creo, metto Stato ='attivo')
* [X] UPDATE
* [X] FIND ONE
* [X] FIND ALL

controller VOTAZIONI:

* [X] CREATE
* [X] UPDATE
* [X] FIND ONE
* [X] FIND ALL

controller NOTIFICHE:

* [X] CREATE (ho creato un ID apposito nel database)
* [X] UPDATE
* [X] FIND ONE
* [X] FIND ALL



controller BLOCCATI:

* [X] CREATE (ho creato un ID apposito nel database)
* [X] UPDATE
* [X] FIND ONE
* [X] FIND ALL
