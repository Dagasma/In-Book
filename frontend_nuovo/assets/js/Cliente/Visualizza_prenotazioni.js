let id_cliente = document.cookie.substring(3, 40);

async function richiedi_prenotazioni(filtro) {
  // Dati fornitore
  console.log(id_fornitore);
  const response = await fetch('/prenotazioni/api/prenotazioni_filtrate_merge_utente/' + id_fornitore, {
    method: 'GET',
    headers: {
      "Access-Control-Request-Method": "GET",
      "Accept": "application/json",
      'Content-Type': 'application/json;charset-UTF-8'
    }
  });
  ex_data = await response.json(); //extract JSON from the http response

  let dati_filtrati = []
  for (let i = ex_data.length - 1; i >= 0; i--) {
    if (ex_data[i].Orario_prenotazione_inizio.substring(0, 10) != filtro.Giorno && filtro.Giorno != "") {
    }
    else if ((ex_data[i].Numero_clienti < filtro.Numero_clienti) && (filtro.Numero_clienti != "")) {

    }
    else if (ex_data[i].ID_servizio_SERVIZI.Durata.substring(0, 5) != filtro.Durata && filtro.Durata != '' && filtro.Durata != ',' ) {
    console.log("qui");
    }
    else if (ex_data[i].ID_servizio_SERVIZI.Tipologia != filtro.Tipologia && filtro.Tipologia != "") {

    }
    else {
      let istance = {}
      istance.id = ex_data[i].ID;;
      istance.id_utente = ex_data[i].ID_utente;;
      istance.Giorno = ex_data[i].Orario_prenotazione_inizio.substring(0, 10) +' '+ ex_data[i].Orario_prenotazione_inizio.substring(11, 16) ;      istance.Numero_clienti = ex_data[i].Numero_clienti;
      istance.Tipologia = ex_data[i].ID_servizio_SERVIZI.Tipologia;
      istance.Descrizione = ex_data[i].ID_servizio_SERVIZI.Descrizione;
      istance.Durata = ex_data[i].ID_servizio_SERVIZI.Durata;
      istance.Nome_Attivita = ex_data[i].ID_fornitore_FORNITORI.Nome_Attivita;
      istance.Tipo_Attivita = ex_data[i].ID_fornitore_FORNITORI.Tipo_Attivita;
      istance.indirizzo = ex_data[i].ID_fornitore_FORNITORI.Indirizzo;
      istance.Stato = ex_data[i].Stato;
      dati_filtrati.push(istance)
    }
  }
  console.log(dati_filtrati);
  create_table_prenotazioni(dati_filtrati, 1);

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
    if (element.Stato == 'Attivo') {
      // Aggiungi una nuova cella alla fine della riga
      let buttonCell = row.insertCell();
      // Crea un bottone e aggiungilo alla cella
      let button = document.createElement("button");
      button.innerHTML = "Annulla";
      button.type = 'submit';
      button.value = element.id;
      button.onclick = function exe_botton() { Annulla_prenotazione(button.value); }
      buttonCell.appendChild(button);
    }
  }
}

async function Annulla_prenotazione(id_prenotazione) {
  console.log(id_prenotazione, id_fornitore)
  var Annulato = "Annullato"
  const response = await fetch('/prenotazioni/api/annulla_prenotazione_cliente/' + id_prenotazione + '/' + id_fornitore, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "Stato": Annulato })
  })
    .then(response => response.json())
    .then(data => { console.log(data); })
    .catch(error => console.error(error));

  window.alert("Annullata");

}

let en_page = 0;

async function create_table_prenotazioni(ex_data, en_page = 0) {

  //let table = document.querySelector("table");// create table
  let columns = ["Giorno", "Durata", "Descrizione", "Nome Attivita", "Numeroclienti", "Tipologia", "indirizzo","Stato"];
  let keys = ["Giorno", "Durata", "Descrizione", "Nome_Attivita", "Numero_clienti", "Tipologia", "indirizzo","Stato"];
  var table = document.getElementById("json-table");
  table.innerHTML = "";

  if (en_page == 0) {
    filtro = { "Giorno": "", "Tipologia": "", "Durata": ",", "Numero_clienti": "" };
    let ex_data = await richiedi_prenotazioni(filtro);
  }

  if (ex_data.length > 0) {
    let data = Object.keys(ex_data[0]);//save the keys
    generateTableHead(table, data, columns);//create header
    generateTable(table, ex_data, keys);
  }//print table}
  else { table.innerHTML = "Non è presente nessuna prenotazione..."; }
}

//listener bottone prenotazione
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn_prenotazioni_filtro").addEventListener("click", async function (e) {
    e.preventDefault();
    en_page = 1
    console.log("premuto btn : ")


    let filtro = {}
    filtro.Giorno = document.getElementById("Giorno").value;
    filtro.Tipologia = document.getElementById("Tipologia").value;
    filtro.Durata = document.getElementById("Durata").value;
    filtro.Numero_clienti = document.getElementById("Persone_max").value;

    ex_data = await richiedi_prenotazioni(filtro);
  });
});
