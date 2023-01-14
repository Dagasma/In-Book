var data = {
	"Nome_Attivita": "Tutto a 0,09cent",
	"Tipo_Attivita": "Tozza bancone",
	"Indirizzo": "Casa tua , 66666, SO",
	"Capienza_massima": "2022"
};


//document.body.onload = create_table;

function GFG_Fun() {
	var down = document.getElementById("GFG_DOWN");

	// Create a break line element
	var br = document.createElement("br");

	// Create a form dynamically
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", "/");

	// Create an input element for Full Name
	var L_Nome_Attivita = document.createElement("label");
	L_Nome_Attivita.setAttribute("for", "Nome_Attivita");
	L_Nome_Attivita.innerHTML = "Nome Attivita: "

	var Nome_Attivita = document.createElement("input");
	Nome_Attivita.type = "text";
	Nome_Attivita.id = "Nome_Attivita";
	Nome_Attivita.value = data.Nome_Attivita;
	Nome_Attivita.placeholder = data.Nome_Attivita;


	// Create an input element for Full Name
	var L_Tipo_Attivita = document.createElement("label");
	L_Tipo_Attivita.setAttribute("value", "Tipo_Attivita");
	L_Tipo_Attivita.innerHTML = "Tipo Attivita: ";
	var Tipo_Attivita = document.createElement("input");
	Tipo_Attivita.type = "text";
	Tipo_Attivita.id = "Tipo_Attivita";
	Tipo_Attivita.value = data.Tipo_Attivita;
	Tipo_Attivita.placeholder = data.Tipo_Attivita;


	var L_indirizzo = document.createElement("label");
	L_indirizzo.setAttribute("value", "indirizzo");
	L_indirizzo.innerHTML = "indirizzo: ";
	var indirizzo = document.createElement("input");
	indirizzo.type = "text";
	indirizzo.id = "Tipo_Attivita";
	indirizzo.value = data.Indirizzo;
	indirizzo.placeholder = data.Indirizzo;


	var L_Capienza_massima = document.createElement("label");
	L_Capienza_massima.setAttribute("value", "indirizzo");
	L_Capienza_massima.innerHTML = "Capienza massima: ";
	var Capienza_massima = document.createElement("input");
	Capienza_massima.type = "text";
	Capienza_massima.id = "Capienza_massima";
	Capienza_massima.value = data.Capienza_massima;
	Capienza_massima.placeholder = data.Capienza_massima;


	// create a submit button
	var s = document.createElement("input");
	s.setAttribute("type", "submit");
	s.setAttribute("value", "Modifica profilo");

	// Append the full name input to the form
	form.appendChild(L_Nome_Attivita);
	form.appendChild(Nome_Attivita);
	// Inserting a line break
	form.appendChild(br.cloneNode());

	// Append the DOB to the form
	form.appendChild(L_Tipo_Attivita);
	form.appendChild(Tipo_Attivita);
	form.appendChild(br.cloneNode());

	// Append the emailID to the form
	form.appendChild(L_indirizzo);
	form.appendChild(indirizzo);
	form.appendChild(br.cloneNode());

	// Append the Password to the form
	form.appendChild(L_Capienza_massima);
	form.appendChild(Capienza_massima);
	form.appendChild(br.cloneNode());

	// Append the submit button to the form
	form.appendChild(s);

	document.getElementsByTagName("form")[0].appendChild(form);
	//document.getElementsByTagName("form").appendChild(form);

}



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
	  let buttonCell = row.insertCell();
	  // Crea un bottone e aggiungilo alla cella
	  let button = document.createElement("button");
	  button.innerHTML = "Modifica";
	  button.setAttribute("data-id", element["ID"]);
	  button.setAttribute("data-column", "Modifica");
	  button.onclick = function exe_botton(){stampa(element["ID"],button.getAttribute("data-column"));}
	  buttonCell.appendChild(button);

	  // Aggiungi una nuova cella alla fine della riga
	  buttonCell = row.insertCell();
	  // Crea un bottone e aggiungilo alla cella
	  button1 = document.createElement("button");
	  button1.innerHTML = "Elimina";
	  button1.setAttribute("data-id", element["name"]);
	  button1.setAttribute("data-column", "Elimina");
	  button1.onclick = function exe_botton(){stampa(element["ID"],button1.getAttribute("data-column"));}
	  buttonCell.appendChild(button1);

    }
  }
  
  function stampa(a,b){
    console.log(a,b);
  }
  


  function create_table_prenotazioni() {
    //let table = document.querySelector("table");// create table
	let keys=["Tipologia", "Descrizione", "Durata"];
	console.log("sono entrato");
    var table = document.getElementById("json-table");
    let data = Object.keys(ex_data[0]);//save the keys
    generateTableHead(table, data,keys);//create header
    generateTable(table, ex_data,keys);//print table
  }