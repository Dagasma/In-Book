
function richiedi_fornitori() {
  // Dati fornitore
  let ex_data = [
    {
      "ID": 2,
      "ID_fornitore": "5",
      "Tipologia": "Controllo peso",
      "Descrizione": "Controllo da",
      "Durata": "00:30:00"
    },
    {
      "ID": 3,
      "ID_fornitore": "5",
      "Tipologia": "Consulenza",
      "Descrizione": "Scelta di un piano",
      "Durata": "02:00:00"
    },
    {
      "ID": 4,
      "ID_fornitore": "5",
      "Tipologia": "Piscina",
      "Descrizione": "2:00 in piscina",
      "Durata": "02:00:00"
    }]

  /* TODO */
  // const response = await fetch('notifiche/api/get_notifiche_per_cliente/' + id_cliente, {
  //     method: 'GET',
  //     headers: {
  //         "Access-Control-Request-Method": "GET",
  //         "Accept": "application/json",
  //         'Content-Type': 'application/json;charset-UTF-8'
  //     }
  // });
  // const dati_fornitore = await response.json(); //extract JSON from the http response
  // // do something with myJson
  console.log("presi i dati");
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
    button.innerHTML = "Visualizza";
    button.setAttribute("data-id", element["ID"]);
    button.setAttribute("data-column", "Visualizza");
    button.setAttribute("id", "Annulla");
    button.onclick = function exe_botton() { stampa(element["ID"], button.getAttribute("data-column")); }
    buttonCell.appendChild(button);
  }
}

function stampa(a, b) {
  console.log(a, b);
}

let en_page = 0;

function create_table_prenotazioni(ex_data, en_page = 0) {
  console.log("creo la tab:");
  //let table = document.querySelector("table");// create table
  let columns = ["Fornitore", "Tipologia", "Descrizione", "Durata"];
  let keys = ["ID_fornitore", "Tipologia", "Descrizione",
    "Durata"];
  if (en_page == 0) {
    console.log("per la prima volta")
    //ex_data = richiedi_fornitori();
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

create_table_prenotazioni(richiedi_fornitori(), en_page = 0);

//listener bottone prenotazione
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("filtra").addEventListener("click", function (e) {
    e.preventDefault();
    en_page = 1
    console.log("FINE : ")

    let ex_data = [    ]

    // document.getElementById("myForm").style.display = "none";
    // const Data_disponibilita = document.getElementById("Data").value;
    // const numero_persone = document.getElementById("Numero_persone").value;
    // const id_servizio = document.getElementById("Select_Servizio").value;
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
    create_table_prenotazioni(ex_data, 1);
  });
});
