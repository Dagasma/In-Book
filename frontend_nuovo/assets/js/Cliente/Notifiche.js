// JSON
 let ex_data =[
    {
        "ID": 4,
        "ID_fornitore": "5",
        "Tipologia": "Piscina",
        "Descrizione": "2:00 in piscina",
        "Durata": "02:00:00"
    },
    {
        "ID": 9,
        "ID_fornitore": "5",
        "Tipologia": "Controllo peso",
        "Descrizione": "Controllo da",
        "Durata": "00:30:00"
    },
    {
        "ID": 10,
        "ID_fornitore": "5",
        "Tipologia": "Prova",
        "Descrizione": "primo tipo",
        "Durata": "10:00:00"
    }
];
  
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
    }
  }
  
  function create_table_prenotazioni() {
    //let table = document.querySelector("table");// create table
	let columns=["Servizio", "Descrizione" , "Durata","Giorno","Descrizione"];
	let keys=["Tipologia", "Descrizione", "Durata"];
	console.log("sono entrato");
    var table = document.getElementById("json-table");
    let data = Object.keys(ex_data[0]);//save the keys
    generateTableHead(table, data,columns);//create header
    generateTable(table, ex_data,keys);//print table
  }