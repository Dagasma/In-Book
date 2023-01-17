
function richiedi_prenotazioni(filtro) {
  // Dati fornitore
  let ex_data = [
    {
      "ID": 26,
      "ID_utente": "2",
      "ID_fornitore": "6",
      "ID_servizio": 6,
      "Orario_richiesta": "2023-01-11T14:36:15.000Z",
      "Orario_prenotazione_inizio": "2023-01-17T14:00:00.000Z",
      "Orario_prenotazione_fine": "2023-01-17T15:00:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 4,
      "ID_servizio_SERVIZI": {
        "ID": 6,
        "ID_fornitore": "6",
        "Tipologia": "Capelli",
        "Descrizione": "Taglio capelli",
        "Durata": "01:00:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 25,
      "ID_utente": "2",
      "ID_fornitore": "6",
      "ID_servizio": 6,
      "Orario_richiesta": "2023-01-11T14:33:49.000Z",
      "Orario_prenotazione_inizio": "2023-01-17T14:00:00.000Z",
      "Orario_prenotazione_fine": "2023-01-17T15:00:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 4,
      "ID_servizio_SERVIZI": {
        "ID": 6,
        "ID_fornitore": "6",
        "Tipologia": "Capelli",
        "Descrizione": "Taglio capelli",
        "Durata": "01:00:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 24,
      "ID_utente": "2",
      "ID_fornitore": "6",
      "ID_servizio": 6,
      "Orario_richiesta": "2023-01-11T12:25:43.000Z",
      "Orario_prenotazione_inizio": "2023-01-16T14:00:00.000Z",
      "Orario_prenotazione_fine": "2023-01-16T15:00:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 4,
      "ID_servizio_SERVIZI": {
        "ID": 6,
        "ID_fornitore": "6",
        "Tipologia": "Capelli",
        "Descrizione": "Taglio capelli",
        "Durata": "01:00:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 23,
      "ID_utente": "7",
      "ID_fornitore": "6",
      "ID_servizio": 6,
      "Orario_richiesta": "2024-01-11T12:23:53.000Z",
      "Orario_prenotazione_inizio": "2024-01-16T12:00:00.000Z",
      "Orario_prenotazione_fine": "2024-01-16T15:00:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 2,
      "ID_servizio_SERVIZI": {
        "ID": 6,
        "ID_fornitore": "6",
        "Tipologia": "Capelli",
        "Descrizione": "Taglio capelli",
        "Durata": "01:00:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 22,
      "ID_utente": "2",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-02T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-17T10:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-17T10:30:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 1,
      "ID_servizio_SERVIZI": {
        "ID": 5,
        "ID_fornitore": "6",
        "Tipologia": "Barba",
        "Descrizione": "Taglio della barba con musica",
        "Durata": "00:30:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 21,
      "ID_utente": "7",
      "ID_fornitore": "6",
      "ID_servizio": 6,
      "Orario_richiesta": "2022-01-02T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-17T16:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-17T17:00:00.000Z",
      "Stato": "Annullato",
      "Numero_clienti": 2,
      "ID_servizio_SERVIZI": {
        "ID": 6,
        "ID_fornitore": "6",
        "Tipologia": "Capelli",
        "Descrizione": "Taglio capelli",
        "Durata": "01:00:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 20,
      "ID_utente": "4",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-01T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-17T10:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-17T10:30:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 1,
      "ID_servizio_SERVIZI": {
        "ID": 5,
        "ID_fornitore": "6",
        "Tipologia": "Barba",
        "Descrizione": "Taglio della barba con musica",
        "Durata": "00:30:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 19,
      "ID_utente": "3",
      "ID_fornitore": "6",
      "ID_servizio": 6,
      "Orario_richiesta": "2022-01-02T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-17T11:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-17T12:00:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 1,
      "ID_servizio_SERVIZI": {
        "ID": 6,
        "ID_fornitore": "6",
        "Tipologia": "Capelli",
        "Descrizione": "Taglio capelli",
        "Durata": "01:00:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 18,
      "ID_utente": "2",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-02T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-17T10:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-17T10:30:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 2,
      "ID_servizio_SERVIZI": {
        "ID": 5,
        "ID_fornitore": "6",
        "Tipologia": "Barba",
        "Descrizione": "Taglio della barba con musica",
        "Durata": "00:30:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 17,
      "ID_utente": "7",
      "ID_fornitore": "6",
      "ID_servizio": 6,
      "Orario_richiesta": "2022-01-01T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-17T10:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-17T11:00:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 1,
      "ID_servizio_SERVIZI": {
        "ID": 6,
        "ID_fornitore": "6",
        "Tipologia": "Capelli",
        "Descrizione": "Taglio capelli",
        "Durata": "01:00:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 16,
      "ID_utente": "4",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-01T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-16T16:30:00.000Z",
      "Orario_prenotazione_fine": "2022-01-16T17:00:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 3,
      "ID_servizio_SERVIZI": {
        "ID": 5,
        "ID_fornitore": "6",
        "Tipologia": "Barba",
        "Descrizione": "Taglio della barba con musica",
        "Durata": "00:30:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 15,
      "ID_utente": "3",
      "ID_fornitore": "6",
      "ID_servizio": 6,
      "Orario_richiesta": "2022-01-02T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-16T16:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-16T17:00:00.000Z",
      "Stato": "Annullato",
      "Numero_clienti": 1,
      "ID_servizio_SERVIZI": {
        "ID": 6,
        "ID_fornitore": "6",
        "Tipologia": "Capelli",
        "Descrizione": "Taglio capelli",
        "Durata": "01:00:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 14,
      "ID_utente": "2",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-02T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-16T16:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-16T16:30:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 1,
      "ID_servizio_SERVIZI": {
        "ID": 5,
        "ID_fornitore": "6",
        "Tipologia": "Barba",
        "Descrizione": "Taglio della barba con musica",
        "Durata": "00:30:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 12,
      "ID_utente": "2",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-02T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-17T10:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-17T10:30:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 1,
      "ID_servizio_SERVIZI": {
        "ID": 5,
        "ID_fornitore": "6",
        "Tipologia": "Barba",
        "Descrizione": "Taglio della barba con musica",
        "Durata": "00:30:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 11,
      "ID_utente": "7",
      "ID_fornitore": "6",
      "ID_servizio": 6,
      "Orario_richiesta": "2022-01-02T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-17T16:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-17T17:00:00.000Z",
      "Stato": "Annullato",
      "Numero_clienti": 2,
      "ID_servizio_SERVIZI": {
        "ID": 6,
        "ID_fornitore": "6",
        "Tipologia": "Capelli",
        "Descrizione": "Taglio capelli",
        "Durata": "01:00:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 10,
      "ID_utente": "4",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-01T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-17T10:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-17T10:30:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 1,
      "ID_servizio_SERVIZI": {
        "ID": 5,
        "ID_fornitore": "6",
        "Tipologia": "Barba",
        "Descrizione": "Taglio della barba con musica",
        "Durata": "00:30:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 8,
      "ID_utente": "2",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-02T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-17T10:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-17T10:30:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 2,
      "ID_servizio_SERVIZI": {
        "ID": 5,
        "ID_fornitore": "6",
        "Tipologia": "Barba",
        "Descrizione": "Taglio della barba con musica",
        "Durata": "00:30:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 7,
      "ID_utente": "7",
      "ID_fornitore": "6",
      "ID_servizio": 6,
      "Orario_richiesta": "2022-01-01T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-17T10:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-17T11:00:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 1,
      "ID_servizio_SERVIZI": {
        "ID": 6,
        "ID_fornitore": "6",
        "Tipologia": "Capelli",
        "Descrizione": "Taglio capelli",
        "Durata": "01:00:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 6,
      "ID_utente": "4",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-01T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-16T16:30:00.000Z",
      "Orario_prenotazione_fine": "2022-01-16T17:00:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 3,
      "ID_servizio_SERVIZI": {
        "ID": 5,
        "ID_fornitore": "6",
        "Tipologia": "Barba",
        "Descrizione": "Taglio della barba con musica",
        "Durata": "00:30:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 5,
      "ID_utente": "3",
      "ID_fornitore": "6",
      "ID_servizio": 6,
      "Orario_richiesta": "2022-01-02T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-16T16:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-16T17:00:00.000Z",
      "Stato": "Annullato",
      "Numero_clienti": 1,
      "ID_servizio_SERVIZI": {
        "ID": 6,
        "ID_fornitore": "6",
        "Tipologia": "Capelli",
        "Descrizione": "Taglio capelli",
        "Durata": "01:00:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 4,
      "ID_utente": "2",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-02T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-16T16:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-16T16:30:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 1,
      "ID_servizio_SERVIZI": {
        "ID": 5,
        "ID_fornitore": "6",
        "Tipologia": "Barba",
        "Descrizione": "Taglio della barba con musica",
        "Durata": "00:30:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 3,
      "ID_utente": "2",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-01T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-16T10:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-16T10:30:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 2,
      "ID_servizio_SERVIZI": {
        "ID": 5,
        "ID_fornitore": "6",
        "Tipologia": "Barba",
        "Descrizione": "Taglio della barba con musica",
        "Durata": "00:30:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 2,
      "ID_utente": "2",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-01T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-16T10:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-16T10:30:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 2,
      "ID_servizio_SERVIZI": {
        "ID": 5,
        "ID_fornitore": "6",
        "Tipologia": "Barba",
        "Descrizione": "Taglio della barba con musica",
        "Durata": "00:30:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 1,
      "ID_utente": "2",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-01T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-16T10:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-16T10:30:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 2,
      "ID_servizio_SERVIZI": {
        "ID": 5,
        "ID_fornitore": "6",
        "Tipologia": "Barba",
        "Descrizione": "Taglio della barba con musica",
        "Durata": "00:30:00"
      },
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipo_Attivita": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    }
  ]
  console.log(ex_data)
  /* DONE */
  // const response = await fetch('/prenotazioni/api/prenotazioni_filtrate_utente/' + id_utente, {
  //     method: 'GET',
  //     headers: {
  //         "Access-Control-Request-Method": "GET",
  //         "Accept": "application/json",
  //         'Content-Type': 'application/json;charset-UTF-8'
  //     }
  // });
  // const dati_fornitore = await response.json(); //extract JSON from the http response



  

  let dati_filtrati = []
  var cont = 0;
  console.log(filtro)
  for (let i = ex_data.length - 1; i >= 0; i--) {
    console.log(filtro.Numero_clienti);
    if (ex_data[i].Orario_prenotazione_inizio.substring(0, 10) != filtro.Giorno && filtro.Giorno != "") {

    }
    else if (ex_data[i].Numero_clienti > filtro.Numero_clienti && filtro.Numero_clienti != "") {
      
    }
    else if (ex_data[i].ID_servizio_SERVIZI.Durata.substring(0, 5) != filtro.Durata && filtro.Durata != "") {
      
    }
    else if (ex_data[i].ID_fornitore_FORNITORI.Tipo_Attivita != filtro.Tipo_Attivita && filtro.Tipo_Attivita != "") {
      
    }
    else {
      let istance = {}
      istance.id = ex_data[i].ID;;
      istance.id_utente = ex_data[i].ID_utente;;
      istance.Giorno = ex_data[i].Orario_prenotazione_inizio.substring(0, 10);
      istance.Numero_clienti = ex_data[i].Numero_clienti;
      istance.Tipologia = ex_data[i].ID_servizio_SERVIZI.Tipologia;
      istance.Descrizione = ex_data[i].ID_servizio_SERVIZI.Descrizione;
      istance.Durata = ex_data[i].ID_servizio_SERVIZI.Durata;
      istance.Nome_Attivita = ex_data[i].ID_fornitore_FORNITORI.Nome_Attivita;
      istance.Tipo_Attivita = ex_data[i].ID_fornitore_FORNITORI.Tipo_Attivita;
      istance.indirizzo = ex_data[i].ID_fornitore_FORNITORI.Indirizzo;
      dati_filtrati.push(istance)
    }
  }
  console.log(dati_filtrati)
  return dati_filtrati;
}

function generateTableHead(table, data, columns) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of columns) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
  let th = document.createElement("th");
  let text = document.createTextNode("");
  th.appendChild(text);
  row.appendChild(th);
  th = document.createElement("th");
  text = document.createTextNode("");
  th.appendChild(text);
  row.appendChild(th);
}

function generateTable(table, data, index) {
  for (let element of data) {
    let row = table.insertRow();
    //console.log(element);
    for (key of index) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
    // Aggiungi una nuova cella alla fine della riga
    let buttonCell = row.insertCell();
    // Crea un bottone e aggiungilo alla cella
    let button = document.createElement("button");
    button.innerHTML = "Annulla";
    button.type= 'submit';
    button.value= element.id;
    button.onclick = function exe_botton() { Annulla_prenotazione(button.value); }
    buttonCell.appendChild(button);
  }
}

function Annulla_prenotazione(ID) {
  
console.log(ID)
  
// fetch('/prenotazioni/api/annulla_prenotazione/'+ID, {
//   method: 'PUT',
//   body: JSON.stringify({
//     "Stato" : "Annullato"
//   }),
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error))

}

let en_page = 0;

function create_table_prenotazioni(ex_data, en_page = 0) {

  //let table = document.querySelector("table");// create table
  let columns = ["Giorno", "Durata", "Descrizione", "Nome_Attivita", "Numero_clienti", "Tipologia", "indirizzo"];
  let keys = ["Giorno", "Durata", "Descrizione", "Nome_Attivita", "Numero_clienti", "Tipologia", "indirizzo"];


  if (en_page == 0) {
    console.log("entro")
    Tipo_Attivita
  }
  else { ex_data }
  var table = document.getElementById("json-table");
  table.innerHTML = "";

  if (ex_data.length > 0) {
    let data = Object.keys(ex_data[0]);//save the keys
    generateTableHead(table, data, columns);//create header
    generateTable(table, ex_data, keys);
  }//print table}
  else { table.innerHTML = "Non è presente nessuna prenotazione..."; }
}

//listener bottone prenotazione
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn_prenotazioni_filtro").addEventListener("click", function (e) {
    e.preventDefault();
    en_page = 1
    console.log("premuto btn : ")


    let filtro = {}
    filtro.Giorno = document.getElementById("Giorno").value;
    filtro.Tipo_Attivita = document.getElementById("Tipo_Attivita").value;
    filtro.Durata = document.getElementById("Durata").value;
    filtro.Numero_clienti = document.getElementById("Persone_max").value;

    console.log("filtro", filtro)

    // DA CANCELLARE
    
    ex_data = richiedi_prenotazioni(filtro);

    console.log(ex_data)
    create_table_prenotazioni(ex_data, 1);
  });
});
