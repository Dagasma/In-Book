let id_fornitore = document.cookie.split('; ').reduce((prev, current) => {
    const [name, ...value] = current.split('=');
    prev[name] = value.join('=');
    return prev;
  }, {}).id;;

async function showPopup(Action,name,id) {
    var popup = document.createElement("div");
    popup.style.cssText = "position: fixed; top: 20%; left: 10%; width: 80%; background-color: #22b3c1; padding: 20px; z-index: 999; border-radius:10px; text-align:center; font-size:40px; color: white; font-weight:bold;";
    document.body.appendChild(popup);

    if (Action == "Modifica") { popup.innerHTML = "Vuoi modificare il servizio "+name; }
    else if (Action == "Elimina"){popup.innerHTML = "Vuoi eliminare il servizio "+name}
	else{ popup.innerHTML = "Error"; }

    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Chiudi");
    btn.appendChild(t);
    btn.style.cssText = "position: relative; margin: 10px auto; padding: 10px 20px; background-color: #22b3c1; color: white; border-radius:10px; font-size:20px;";
    btn.onclick = function () {
		if (Action == "Modifica") { 
			let url = "/fornitore/modifica_servizi?id=" + id;
		window.location.href = url;
		 }
		else if (Action == "Elimina"){
			Elimina_func(id);
			window.location.reload();
		}
		
        document.body.removeChild(popup);
    };
    var linebreak = document.createElement("br");
    popup.appendChild(linebreak);
    popup.appendChild(btn);
    popup.appendChild(btn);
}

async function richiedi_servizi() {
	/* DONE */
	console.log("richiedi servizio")
	const response = await fetch('/servizi/api/get_servizi_dal_fornitore/' + id_fornitore, {
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
		let button = document.createElement("section");
		button.style.backgroundColor = "#22b3c1";
		button.style.color = "white";
		button.style.textAlign = "center";
		button.style.display = "flex";
		button.style.alignItems = "center";
		button.style.justifyContent = "center";
		button.style.borderRadius = "10px";
		button.style.margin = "0";
		button.style.padding = "10%";
		button.innerHTML = "  Modifica  ";
		button.type = 'submit';
		button.value = element.ID;
		button.onclick = function exe_botton() { 
			let text="Modifica"
			showPopup(text,element.Tipologia,element.ID)
		 }
		buttonCell.appendChild(button);

		// Aggiungi una nuova cella alla fine della riga
		buttonCell = row.insertCell();
		let button1 = document.createElement("section");
		button1.style.backgroundColor = "#22b3c1";
		button1.style.color = "white";
		button1.style.textAlign = "center";
		button1.style.display = "flex";
		button1.style.alignItems = "center";
		button1.style.justifyContent = "center";
		button1.style.borderRadius = "10px";
		button1.style.margin = "0";
		button1.style.padding = "10%";
		button1.innerHTML = "  Elimina  ";
		button1.type = 'submit';
		button1.value = element.ID;
		console.log(element)
		button1.onclick = function exe_botton() { 
			let text="Elimina"
			showPopup(text,element.Tipologia,element.ID)
			 }
		buttonCell.appendChild(button1);

	}
}

function Modifica_func(ID) {
	console.log(ID);
	//href
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

	console.log("servizio eliminato")
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
	else { table.innerHTML = "Non è presente nessun servizio ..."; }
}