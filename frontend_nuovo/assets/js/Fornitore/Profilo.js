
function richiedi_fornitore() {
	// Dati fornitore
	var data = {
		"Nome_Attivita": "Tutto a 0,09cent",
		"Tipo_Attivita": "Tozza bancone",
		"Indirizzo": "Casa tua , 66666, SO",
		"Capienza_massima": "2022",
		"Nome": "pepp",
		"Cognome": "de coglio",
		"Email": "Casa sua , 66666, SO",
		"Telefono": "42342342",
		"Data_di_nascita": "2000-10-01"
	};
	console.log("entrato in richiedi");

	/* DONE */
	// const response = await fetch('cliente/api/get_profilo/' + id_utente, {
	//     method: 'GET',
	//     headers: {
	//         "Access-Control-Request-Method": "GET",
	//         "Accept": "application/json",
	//         'Content-Type': 'application/json;charset-UTF-8'
	//     }
	// });
	// const dati_fornitore = await response.json(); //extract JSON from the http response
	// // do something with myJson
	return data;
}

//document.body.onload = create_table
function form_profilo() {
	var down = document.getElementById("GFG_DOWN");
	let data = richiedi_fornitore();
	// Create a break line element
	var br = document.createElement("br");

	// Create a form dynamically
	var form = document.createElement("form");
	form.setAttribute("method", "get");
	form.setAttribute("action", "/");

	// Create an input element for Full Name
	var L_Nome = document.createElement("label");
	L_Nome.setAttribute("for", "Nome");
	L_Nome.innerHTML = "Nome: "

	var Nome = document.createElement("input");
	Nome.type = "text";
	Nome.id = "Nome";
	Nome.value = data.Nome;
	Nome.placeholder = data.Nome;


	// Create an input element for Full Name
	var L_Cognome = document.createElement("label");
	L_Cognome.setAttribute("value", "Cognome");
	L_Cognome.innerHTML = "Cognome: ";
	var Cognome = document.createElement("input");
	Cognome.type = "text";
	Cognome.id = "Cognome";
	Cognome.value = data.Cognome;
	Cognome.placeholder = data.Cognome;

	// Create an input element for Full Name
	var L_Email = document.createElement("label");
	L_Email.setAttribute("value", "Email");
	L_Email.innerHTML = "Email: ";
	var Email = document.createElement("input");
	Email.type = "email";
	Email.id = "Email";
	Email.value = data.Email;
	Email.placeholder = data.Email;

	// Create an input element for Full Name
	var L_Data_di_nascita = document.createElement("label");
	L_Data_di_nascita.setAttribute("value", "Data_di_nascita");
	L_Data_di_nascita.innerHTML = "Data di nascita: ";
	var Data_di_nascita = document.createElement("input");
	Data_di_nascita.type = "date";
	Data_di_nascita.id = "Data_di_nascita";
	Data_di_nascita.value = data.Data_di_nascita;
	Data_di_nascita.placeholder = data.Data_di_nascita;

	// Create an input element for Full Name
	var L_Telefono = document.createElement("label");
	L_Telefono.setAttribute("value", "Telefono");
	L_Telefono.innerHTML = "Telefono: ";
	var Telefono = document.createElement("input");
	Telefono.type = "tel";
	Telefono.id = "Telefono";
	Telefono.value = data.Telefono;
	Telefono.placeholder = data.Telefono;

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
	Capienza_massima.type = "number";
	Capienza_massima.id = "Capienza_massima";
	Capienza_massima.value = data.Capienza_massima;
	Capienza_massima.placeholder = data.Capienza_massima;


	// create a submit button
	var s = document.createElement("button");
	s.setAttribute("type", "submit");
	s.setAttribute("value", "Modifica profilo");
	s.setAttribute("id", "btn_modifica_profilo");
	s.innerHTML = "Modifica profilo";
	// Append the full name input to the form
	form.appendChild(L_Nome);
	form.appendChild(Nome);
	// Inserting a line break
	form.appendChild(br.cloneNode());

	// Append the DOB to the form
	form.appendChild(L_Cognome);
	form.appendChild(Cognome);
	form.appendChild(br.cloneNode());

	// Append the emailID to the form
	form.appendChild(L_Email);
	form.appendChild(Email);
	form.appendChild(br.cloneNode());

	// Append the emailID to the form
	form.appendChild(L_Data_di_nascita);
	form.appendChild(Data_di_nascita);
	form.appendChild(br.cloneNode());

	// Append the Password to the form
	form.appendChild(L_Telefono);
	form.appendChild(Telefono);
	form.appendChild(br.cloneNode());


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


function richiedi_orario() {
	// Dati fornitore
	let ex_data = [
		{
			"ID": 1,
			"ID_fornitore": "5",
			"Giorno_della_settimana": "Lunedi",
			"Orario_apertura": "08:00:00",
			"Orario_chiusura": "13:00:00"
		},
		{
			"ID": 2,
			"ID_fornitore": "5",
			"Giorno_della_settimana": "Mercoledi",
			"Orario_apertura": "08:00:00",
			"Orario_chiusura": "13:00:00"
		},
		{
			"ID": 3,
			"ID_fornitore": "5",
			"Giorno_della_settimana": "Giovedi",
			"Orario_apertura": "08:00:00",
			"Orario_chiusura": "13:00:00"
		},
		{
			"ID": 4,
			"ID_fornitore": "5",
			"Giorno_della_settimana": "Venerdi",
			"Orario_apertura": "08:00:00",
			"Orario_chiusura": "13:00:00"
		}
	];

	console.log("entrato in orario");

	/* DONE */
	// const response = await fetch('cliente/api/get_profilo/' + id_utente, {
	//     method: 'GET',
	//     headers: {
	//         "Access-Control-Request-Method": "GET",
	//         "Accept": "application/json",
	//         'Content-Type': 'application/json;charset-UTF-8'
	//     }
	// });
	// const dati_fornitore = await response.json(); //extract JSON from the http response
	// // do something with myJson
	return ex_data;
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
		// Aggiungi una nuova cella alla fine della riga
		let buttonCell = row.insertCell();
		// Crea un bottone e aggiungilo alla cella
		let button = document.createElement("button");
		button.innerHTML = "Elimina";
		button.setAttribute("type", "submit");
		button.setAttribute("data_id", element["ID"]);
		button.setAttribute("data_column", "Elimina");
		button.setAttribute("id", "btn_elimina");
		button.onclick = function exe_botton() { elimina_orario(element["ID"]); }
		buttonCell.appendChild(button);
	}
}

function stampa(a, b) {
	console.log(a, b);
}

function create_table_fornitori() {
	//let table = document.querySelector("table");// create table
	let columns = ["Giorno della settimana",
		"Orario Apertura",
		"Orario Chiusura"];
	let keys = ["Giorno_della_settimana",
		"Orario_apertura", "Orario_chiusura"];
	var data_ora = richiedi_orario();
	console.log(data_ora);
	var table = document.getElementById("json-table");
	let data = Object.keys(data_ora[0]);//save the keys
	console.log(data)
	generateTableHead(table, data, columns);//create header
	generateTable(table, data_ora, keys);//print table
}

//listener bottone orario
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("btn_new_orario").addEventListener("click", function (e) {
		e.preventDefault();


		// document.getElementById("myForm").style.display = "none";

		const Giorno = document.getElementById("Giorno").value;
		const Orario_I = document.getElementById("Orario_I").value;
		const Orario_F = document.getElementById("Orario_F").value;
		console.log("btn_new_orario : ", Giorno ,Orario_I);

		/**/
		// fetch('/cliente/api/aggiorna_profilo' + id_cliente, {
		//     method: 'PUT',
		//     headers: {
		//         'Content-Type': 'application/json'
		//     },
		//     body: JSON.stringify({
		// "Nome": Nome,
		// "Cognome": Cognome,
		// "Email": Email,
		// "Data_di_nascita": Data_di_nascita,
		// "Telefono": Telefono
		//     })
		// })
		//     .then(response => response.json())
		//     .then(data => { console.log(data); })
		//     .catch(error => console.error(error));
		//      esempio_slot = response;

	});
});

function elimina_orario (ID ){
	console.log(ID);

		/*  */
	// const response = await fetch('cliente/api/get_profilo/' + id_utente, {
	//     method: 'GET',
	//     headers: {
	//         "Access-Control-Request-Method": "GET",
	//         "Accept": "application/json",
	//         'Content-Type': 'application/json;charset-UTF-8'
	//     }
	// });
	// const dati_fornitore = await response.json(); //extract JSON from the http response
	// // do something with myJson

}

//listener bottone prenotazione
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("btn_modifica_profilo").addEventListener("click",function (e){
		e.preventDefault();
	

		console.log("FINE : " )
		// document.getElementById("myForm").style.display = "none";

		const Nome = document.getElementById("Nome").value;
		const Cognome = document.getElementById("Cognome").value;
		const Email = document.getElementById("Email").value;
		const Data_di_nascita = document.getElementById("Data_di_nascita").value;
		const Telefono = document.getElementById("Telefono").value;

		/*DONE*/
		// fetch('/cliente/api/aggiorna_profilo' + id_cliente, {
		//     method: 'PUT',
		//     headers: {
		//         'Content-Type': 'application/json'
		//     },
		//     body: JSON.stringify({
			// "Nome": Nome,
			// "Cognome": Cognome,
			// "Email": Email,
			// "Data_di_nascita": Data_di_nascita,
			// "Telefono": Telefono
		//     })
		// })
		//     .then(response => response.json())
		//     .then(data => { console.log(data); })
		//     .catch(error => console.error(error));
		//      esempio_slot = response;
		
	});
	});