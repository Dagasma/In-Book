// JSON
let ex_data= [
    {
        "ID": 2,
        "ID_fornitore": "6",
        "ID_utente": "3",
        "Voto": 7
    },
    {
        "ID": 3,
        "ID_fornitore": "6",
        "ID_utente": "1",
        "Voto": 3
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
  
  function generateTable(table, data,columns) {
    for (let element of data) {
      let row = table.insertRow();
      console.log(element);
      for (key of columns) {
        console.log(key)
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
          // Aggiungi una nuova cella alla fine della riga
          buttonCell = row.insertCell();
          // Crea un bottone e aggiungilo alla cella
          button = document.createElement("button");
          button.innerHTML = "Modifica";
          button.setAttribute("data-id", element["name"]);
          button.setAttribute("data-column", "Modifica");
          button.onclick = function exe_botton(){stampa(element["ID"],button.getAttribute("data-column"));}
          buttonCell.appendChild(button);
    }
  }
  
  function stampa(a,b){
    console.log(a,b);
  }
  
  function create_table() {
    //let table = document.querySelector("table");// create table
    var columns= ['ID_utente','ID_fornitore','Voto'];
    var tbl = document.createElement("table");
    var table = document.getElementById("json-table");
    let data = Object.keys(ex_data[0]);//save the keys
    generateTableHead(table, data,columns);//create header
    generateTable(table, ex_data,columns);//print table
  }


  
  //document.body.onload = create_table;
  

  /*
  
   <body onload="create_table()"></body>
  
  */