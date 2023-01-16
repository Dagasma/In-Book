
function richiedi_prenotazioni() {
  // Dati fornitore
  let ex_data = [
    {
      "ID": 2,
      "ID_utente": "2",
      "ID_fornitore": "6",
      "ID_servizio": 5,
      "Orario_richiesta": "2022-01-01T00:00:00.000Z",
      "Orario_prenotazione_inizio": "2022-01-16T10:00:00.000Z",
      "Orario_prenotazione_fine": "2022-01-16T10:30:00.000Z",
      "Stato": "Attivo",
      "Numero_clienti": 2
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
      "Numero_clienti": 2
    }
  ]

  /* DONE */
  // const response = await fetch('cliente/api/get_profilo/' + id_utente, {
  //     method: 'GET',
  //     headers: {
  //         "Access-Control-Request-Method": "GET",
  //         "Accept": "application/json",
  //         'Content-Type': 'application/json;charset-UTF-8'
  //     }
  // });
  // const dati_fornitore = await response.json(); //extract JSON from the http response
  // // do something with myJson

  return ex_data;
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
    console.log(element);
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
    button.setAttribute("type","submit");
    button.setAttribute("data-id", element["ID"]);
    button.setAttribute("data-column", "Annulla");
    button.onclick = function exe_botton() { annulla_prenotazione(element["ID"]); }
    buttonCell.appendChild(button);
  }
}

function annulla_prenotazione(id) {
  console.log(id);

    /*DONE*/
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

let en_page = 0;

function create_table_prenotazioni(ex_data, en_page = 0) {
  //let table = document.querySelector("table");// create table
  let columns = ["Orario richiesta", "Orario d'inizio", "Servizio",
    "Numero clienti"];
  let keys = ["Orario_richiesta", "Orario_prenotazione_inizio", "ID_servizio",
    "Numero_clienti"];
  if (en_page == 0) {
    console.log("entro")
    ex_data = richiedi_prenotazioni();
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

create_table_prenotazioni(richiedi_prenotazioni(), en_page = 0);

/*
var button = document.getElementById("myButton");
  
// Assegna un evento al bottone quando viene cliccato
button.addEventListener("click", function() {
    // Esegui una funzione
    console.log("Funzione eseguita");
    
    // Reindirizza l'utente alla nuova pagina
    location.href = "http://www.example.com";
});
*/