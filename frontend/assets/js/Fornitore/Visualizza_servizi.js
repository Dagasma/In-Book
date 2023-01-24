let id_fornitore = document.cookie.substring(3, 40);

async function richiedi_servizi() {
	/* DONE */
	console.log("richiedi servizio")
	const response = await fetch('/servizi/api/get_servizi_by_fornitore/' + id_fornitore, {
		method: 'GET',
		headers: {
			"Access-Control-Request-Method": "GET",
			"Accept": "application/json",
			'Content-Type': 'application/json;charset-UTF-8'
		}
	});
	const servizi = await response.json(); //extract JSON from the http response
	// // do something with myJson
	console.log(servizi)
	return servizi;
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
		let buttonCell = row.insertCell();
		// Crea un bottone e aggiungilo alla cella
		let button = document.createElement("button");
		button.innerHTML = "Modifica";
		button.setAttribute("data-id", element["ID"]);
		button.setAttribute("data-column", "Modifica");
		button.onclick = function exe_botton() { Modifica_func(element["ID"]); }
		buttonCell.appendChild(button);

		// Aggiungi una nuova cella alla fine della riga
		buttonCell = row.insertCell();
		// Crea un bottone e aggiungilo alla cella
		button1 = document.createElement("button");
		button1.innerHTML = "Elimina";
		button1.setAttribute("data-id", element["name"]);
		button1.setAttribute("data-column", "Elimina");
		button1.onclick = function exe_botton() { Elimina_func(element["ID"]); }
		buttonCell.appendChild(button1);

	}
}

function Modifica_func(ID) {
	console.log(ID);
	//href
	window.alert("Vuoi modificare il servizio");
	let url = "/fornitore/modifica_servizi?id=" + ID;
	window.location.href = url;
}

async function Elimina_func(id_servizio) {
	console.log(id_servizio);

	const response = await fetch('/servizi/api/delete_servizio/' + id_servizio+'/'+id_fornitore, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	})

	const risposta= await response;
	if(response.status==200){
		window.alert('Eliminata con successo');
	}
	else{
		window.alert('C e un errore');
	}

	window.alert("eliminato");
}


let en_page = 0
async function create_table_prenotazioni(ex_data, en_page = 0) {
	//let table = document.querySelector("table");// create table
	let keys = ["Tipologia", "Descrizione", "Durata"];

	if (en_page == 0) {
		console.log("entro")
		ex_data = await richiedi_servizi();
	}
	else { ex_data }

	var table = document.getElementById("json-table");
	table.innerHTML = "";

	if (ex_data.length > 0) {
		console.log(ex_data);
		let data = Object.keys(ex_data[0]);//save the keys
		generateTableHead(table, data, keys);//create header
		generateTable(table, ex_data, keys);
	}//print table}
	else { table.innerHTML = "Non è presente nessuna prenotazione..."; }
}