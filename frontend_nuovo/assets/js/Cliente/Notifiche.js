let id_utente = document.cookie.substring(3, 40);

async function richiedi_notifiche() {

	/* TODO */
	const response = await fetch('/notifiche/api/findAllcliente_unione/' + id_utente, {
		method: 'GET',
		headers: {
			"Access-Control-Request-Method": "GET",
			"Accept": "application/json",
			'Content-Type': 'application/json;charset-UTF-8'
		}
	});
	const notifiche = await response.json(); //extract JSON from the http response
	// // do something with myJson
	console.log(notifiche)
	return notifiche;
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
	}
}


async function create_table_notifiche() {
	//let table = document.querySelector("table");// create table
	let columns = ["Descrizione notifica", "Orario prenotazione inizio", "Tipologia", "Indirizzo", "Nome Attivita","Stato"];
	let keys = ["Descrizione_notifica", "Orario_prenotazione_inizio", "Tipologia", "Indirizzo", "Nome_Attivita","Stato"];
	let ex_data = await richiedi_notifiche();
	var table = document.getElementById("json-table");

	table.innerHTML = "";
	console.log(ex_data)
	
	let data = Object.keys(ex_data[0]);//save the keys
	generateTableHead(table, data, columns);//create header
	generateTable(table, ex_data, keys);//print table
	
}