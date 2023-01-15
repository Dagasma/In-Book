
// JSON
 let ex_data =[
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
          button.innerHTML = "Visualizza";
          button.setAttribute("data-id", element["ID"]);
          button.setAttribute("data-column", "Visualizza");
          button.onclick = function exe_botton(){stampa(element["ID"],button.getAttribute("data-column"));}
          buttonCell.appendChild(button);
    }
  }
  
  function stampa(a,b){
    console.log(a,b);
  }
  

  function create_table_prenotazioni() {
	
    //let table = document.querySelector("table");// create table
	let columns= ["Fornitore","Tipologia","Descrizione","Durata"];
	let keys=["ID_fornitore", "Tipologia", "Descrizione", 
			"Durata"];
    var table = document.getElementById("json-table");
    let data = Object.keys(ex_data[0]);//save the keys
    generateTableHead(table, data,columns);//create header
    generateTable(table, ex_data,keys);//print table
  }