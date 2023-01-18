
async function richiedi_fornitori(filtro) {
  // Dati fornitore
  /*let ex_data = [
    {
      "ID": 2,
      "ID_fornitore": "5",
      "Tipologia": "Controllo peso",
      "Descrizione": "Controllo da",
      "Durata": "00:30:00",
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "5",
        "Nome_Attivita": "Gym",
        "Tipologia": "GymLuca",
        "Indirizzo": "Via marina , 42011",
        "Capienza_massima": 70
      }
    },
    {
      "ID": 3,
      "ID_fornitore": "5",
      "Tipologia": "Consulenza",
      "Descrizione": "Scelta di un piano",
      "Durata": "01:00:00",
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "5",
        "Nome_Attivita": "Gym",
        "Tipologia": "GymLuca",
        "Indirizzo": "Via marina , 42011",
        "Capienza_massima": 70
      }
    },
    {
      "ID": 4,
      "ID_fornitore": "5",
      "Tipologia": "Piscina",
      "Descrizione": "2:00 in piscina",
      "Durata": "02:00:00",
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "5",
        "Nome_Attivita": "Gym",
        "Tipologia": "GymLuca",
        "Indirizzo": "Via marina , 42011",
        "Capienza_massima": 70
      }
    },
    {
      "ID": 9,
      "ID_fornitore": "5",
      "Tipologia": "Controllo peso",
      "Descrizione": "Controllo da",
      "Durata": "00:30:00",
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "5",
        "Nome_Attivita": "Gym",
        "Tipologia": "GymLuca",
        "Indirizzo": "Via marina , 42011",
        "Capienza_massima": 70
      }
    },
    {
      "ID": 10,
      "ID_fornitore": "5",
      "Tipologia": "Prova",
      "Descrizione": "primo tipo",
      "Durata": "10:00:00",
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "5",
        "Nome_Attivita": "Gym",
        "Tipologia": "GymLuca",
        "Indirizzo": "Via marina , 42011",
        "Capienza_massima": 70
      }
    },
    {
      "ID": 5,
      "ID_fornitore": "6",
      "Tipologia": "Barba",
      "Descrizione": "Taglio della barba con musica",
      "Durata": "00:30:00",
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipologia": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 6,
      "ID_fornitore": "6",
      "Tipologia": "Capelli",
      "Descrizione": "Taglio capelli",
      "Durata": "01:00:00",
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipologia": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    },
    {
      "ID": 8,
      "ID_fornitore": "6",
      "Tipologia": "Pulizia dentale",
      "Descrizione": "Pulizia dei",
      "Durata": "01:00:00",
      "ID_fornitore_FORNITORI": {
        "ID_utente_fornitore": "6",
        "Nome_Attivita": "Barbiere",
        "Tipologia": "BarbiereLuca",
        "Indirizzo": "via enrico , 12084",
        "Capienza_massima": 10
      }
    }
  ] */

  const response = await fetch('/servizi/api/get_Servizi_e_fornitori', {
      method: 'GET',
      headers: {
          "Access-Control-Request-Method": "GET",
          "Accept": "application/json",
          'Content-Type': 'application/json;charset-UTF-8'
      }
  });
  const ex_data = await response.json(); //extract JSON from the http response
  console.log(ex_data);

  var cont = 0;
  console.log("filtro è: ", filtro);
  let dati_filtrati = [];
  for (let i = ex_data.length - 1; i >= 0; i--) {
    if ((ex_data[i].Durata.substring(0, 5)) != filtro.Durata && filtro.Durata != "") {
    }
    else if ((ex_data[i].ID_fornitore_FORNITORI.Capienza_massima <= filtro.Capienza_massima) && (filtro.Capienza_massima != "")) {
    }
    else if ((ex_data[i].Tipologia != filtro.Tipologia) && (filtro.Tipologia != "")) {

    }
    else if ((ex_data[i].ID_fornitore_FORNITORI.Indirizzo != filtro.Indirizzo) && (filtro.Indirizzo != "")) {
    }
    else {
      let istance = {};
      istance.id = ex_data[i].ID;;
      istance.ID_fornitore = ex_data[i].ID_fornitore;;
      istance.Descrizione = ex_data[i].Descrizione;
      istance.Numero_clienti = ex_data[i].Numero_clienti;
      istance.Tipologia = ex_data[i].Tipologia;
      istance.Durata = ex_data[i].Durata;
      istance.Nome_Attivita = ex_data[i].ID_fornitore_FORNITORI.Nome_Attivita;
      istance.indirizzo = ex_data[i].ID_fornitore_FORNITORI.Indirizzo;
      dati_filtrati.push(istance)
    }
  }

  console.log("dati filtrati :", dati_filtrati);
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
    for (key of index) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
    // Aggiungi una nuova cella alla fine della riga
    let buttonCell = row.insertCell();
    // Crea un bottone e aggiungilo alla cella
    let button = document.createElement("button");
    button.innerHTML = "Visualizza Fornitore";
    button.setAttribute("data-id", element["id"]);
    button.setAttribute("id",  element["id"]);
    button.onclick = function exe_botton() { stampa(element["id"]); }
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
  let columns = ["Nome Attivita", "Tipologia",
    "Durata", "Descrizione", "indirizzo",];
  let keys = ["Nome_Attivita", "Tipologia",
    "Durata", "Descrizione", "indirizzo",];
  if (en_page == 0) {
    let filtro = {
      "Tipologia": "",
      "Indirizzo": "",
      "Capienza_massima": "",
      "Durata": ""    };
    ex_data = richiedi_fornitori(filtro);
  }

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
  document.getElementById("btn_cerca").addEventListener("click", async function (e) {
    e.preventDefault();
    en_page = 1
    console.log("il bottone cerca è stato premuto : ")

    let ex_data = []

    let filtro = {}

    filtro.Tipologia = document.getElementById("Tipologia").value;
    filtro.Indirizzo = document.getElementById("Indirizzo").value;
    filtro.Capienza_massima = document.getElementById("Capienza_massima").value;
    filtro.Durata = document.getElementById("Durata").value;

    ex_data = await richiedi_fornitori(filtro);

    create_table_prenotazioni(ex_data, 1);

  });
});
