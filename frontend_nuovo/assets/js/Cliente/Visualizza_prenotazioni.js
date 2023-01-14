
// JSON
 let ex_data =[
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
  
function generateTableHead(table, data,columns) {
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
  
  function generateTable(table, data,index) {
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
          button.setAttribute("data-id", element["ID"]);
          button.setAttribute("data-column", "Annulla");
          button.onclick = function exe_botton(){stampa(element["ID"],button.getAttribute("data-column"));}
          buttonCell.appendChild(button);
    }
  }
  
  function stampa(a,b){
    console.log(a,b);
  }
  
  function create_table_prenotazioni() {
	
    //let table = document.querySelector("table");// create table
	let columns= ["Orario richiesta","Orario d'inizio","Servizio",
		"Numero clienti"];
	let keys=["Orario_richiesta", "Orario_prenotazione_inizio", "ID_servizio", 
			"Numero_clienti"];
    var table = document.getElementById("json-table");
    let data = Object.keys(ex_data[0]);//save the keys
    generateTableHead(table, data,columns);//create header
    generateTable(table, ex_data,keys);//print table
  }

  