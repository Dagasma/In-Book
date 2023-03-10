let id_utente = document.cookie.split('; ').reduce((prev, current) => {
    const [name, ...value] = current.split('=');
    prev[name] = value.join('=');
    return prev;
  }, {}).id;;




function showPopup(ID_fornitore) {
  var popup = document.createElement("div");
  popup.style.cssText = "position: fixed; top: 20%; left: 10%; width: 80%; background-color: #22b3c1; padding: 20px; z-index: 999; border-radius:10px; text-align:center; font-size:40px; color: white; font-weight:bold;";
  document.body.appendChild(popup);
  popup.innerHTML = "Vuoi andare alla pagina del fornitore selezionato?";

  var btn = document.createElement("BUTTON");
  var t = document.createTextNode("Conferma");
  btn.appendChild(t);
  btn.style.cssText = "position: relative; margin: 10px auto; padding: 10px 20px; background-color: #22b3c1; color: white; border-radius:10px; font-size:20px;";
  btn.onclick = function () {
    document.body.removeChild(popup);
    let url = "/cliente/visualizza_fornitore?id=" + ID_fornitore;
    window.location.href = url;
  };
  var linebreak = document.createElement("br");
  popup.appendChild(linebreak);
  popup.appendChild(btn);
  popup.appendChild(btn);
}

async function richiedi_fornitori(filtro) {

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
    else if (((ex_data[i].Tipologia).toLowerCase().indexOf(filtro.Tipologia.toLowerCase())==-1) && (filtro.Tipologia != "")) {

    }
    else if (((ex_data[i].ID_fornitore_FORNITORI.Indirizzo).toLowerCase().indexOf(filtro.Indirizzo.toLowerCase())==-1) && (filtro.Indirizzo != "")) {
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
    let button = document.createElement("section");
    button.style.backgroundColor = "#22b3c1";
    button.style.color = "white";
    button.style.textAlign = "center";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.borderRadius = "10px";
    button.style.margin = "0";
    button.style.padding = "20%";
    button.innerHTML = "Visualizza Fornitore";
    button.setAttribute("data-id", element["ID_fornitore"]);
    button.setAttribute("id", element["ID_fornitore"]);
    button.onclick = function exe_botton() { vai_dal_fornitore(element["ID_fornitore"]); }
    buttonCell.appendChild(button);
  }
}

function vai_dal_fornitore(ID_fornitore) {
  console.log(ID_fornitore);
  showPopup(ID_fornitore);
  // window.location.href = `/visualizza_forntiore?id=${ID_fornitore}`;
}

let en_page = 0;
async function create_table_prenotazioni(ex_data, en_page = 0) {
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
      "Durata": ""
    };
    ex_data = await richiedi_fornitori(filtro);

  }

  var table = document.getElementById("json-table");
  table.innerHTML = " ";

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
