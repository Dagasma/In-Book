function salva_servizio(){

    const Tipologia = document.getElementById("Tipologia").value;
    const Descrizione = document.getElementById("Descrizione").value;
    const Durata = document.getElementById("Durata").value;

    
    console.log(Tipologia)
	  /* TODO */
	  // fetch('/servizi/api/effettua_prenotazione/', {
	  //     method: 'POST',
	  //     headers: {
	  //         'Content-Type': 'application/json'
	  //     },
	  //     body: JSON.stringify({
	  // "ID_utente": id_cliente,
	  // "ID_fornitore": servizi_fornitore_ex.ID_fornitore,
	  // "ID_servizio": id_servizio,
	  // "Orario_prenotazione_inizio": Data_disponibilita,
	  // "Numero_clienti": numero_persone
	  //     })
	  // })
	  //     .then(response => response.json())
	  //     .then(data => { console.log(data); })
	  //     .catch(error => console.error(error));
	  //      esempio_slot = response;

}