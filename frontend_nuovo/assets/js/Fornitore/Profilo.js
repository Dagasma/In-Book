let id_fornitore = document.cookie.substring(3, 40);
let en_create = 1;
var data_ora

var erbottone = document.createElement("button");
erbottone.id = "btn_modifica";
erbottone.innerHTML = "Modifica";


async function showPopup(Action) {
    var popup = document.createElement("div");
    popup.style.cssText = "position: fixed; top: 20%; left: 10%; width: 80%; background-color: #22b3c1; padding: 20px; z-index: 999; border-radius:10px; text-align:center; font-size:40px; color: white; font-weight:bold;";
    document.body.appendChild(popup);

    if (Action == "Aggiornato") { popup.innerHTML = "Dati del profilo aggiornati"; }
    else if (Action == "New_orario"){popup.innerHTML = "Orario inserito"}
	else if (Action == "Err_orario"){popup.innerHTML = "Gia aperto in un sotto intervallo temporale"}
	else if (Action == "Elimina"){popup.innerHTML = "Orario eliminato"}
	else{ popup.innerHTML = "Error"; }

    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Chiudi");
    btn.appendChild(t);
    btn.style.cssText = "position: relative; margin: 10px auto; padding: 10px 20px; background-color: #22b3c1; color: white; border-radius:10px; font-size:20px;";
    btn.onclick = function () {
        document.body.removeChild(popup);
		location.reload() 
    };
    var linebreak = document.createElement("br");
    popup.appendChild(linebreak);
    popup.appendChild(btn);
    popup.appendChild(btn);
}

//DIFF TIME
function diffTime(time1, time2) {
	const [hours1, minutes1] = time1.split(':').map(Number);
	const [hours2, minutes2] = time2.split(':').map(Number);

	let minutesDiff = (hours1 * 60 + minutes1) - (hours2 * 60 + minutes2);
	return minutesDiff;
}

async function richiedi_fornitore() {
	console.log(id_fornitore);

	// DATI UTENTE
	let dati_fornitore;

	const response1 = await fetch('/fornitori/api/get_profilo/' + id_fornitore, {
		method: 'GET',
		headers: {
			"Access-Control-Request-Method": "GET",
			"Accept": "application/json",
			'Content-Type': 'application/json;charset-UTF-8'
		}
	});

	if (response1.status == 200) {
		dati_fornitore = await response1.json(); //extract JSON from the http response
		dati_fornitore.Data_di_nascita = dati_fornitore.ID_utente_fornitore_UTENTI.Data_di_nascita;
		dati_fornitore.Cognome = dati_fornitore.ID_utente_fornitore_UTENTI.Cognome;
		dati_fornitore.Nome = dati_fornitore.ID_utente_fornitore_UTENTI.Nome;
		dati_fornitore.Telefono = dati_fornitore.ID_utente_fornitore_UTENTI.Telefono;
		en_create = 0;
	}
	else {
		const response = await fetch('/fornitori/api/get_profilo_cliente/' + id_fornitore, {
			method: 'GET',
			headers: {
				"Access-Control-Request-Method": "GET",
				"Accept": "application/json",
				'Content-Type': 'application/json;charset-UTF-8'
			}
		});
		dati_fornitore = await response.json(); //extract JSON from the http response

		dati_fornitore.Nome_Attivita = "vuoto";
		dati_fornitore.Tipo_Attivita = "vuoto";
		dati_fornitore.Indirizzo = "vuoto";
		dati_fornitore.Capienza_massima = "vuoto";
		en_create = 1;
	}
	console.log(dati_fornitore);
	console.log(en_create);


	return dati_fornitore;
}

//document.body.onload = create_table
async function form_profilo() {
	let data = await richiedi_fornitore();
	console.log("la funzione mi ritorna", data)

	// Create a break line element
	var br = document.createElement("br");

	// Create a form dynamically
	var form = document.createElement("form");

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
	indirizzo.id = "Indirizzo";
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

	// Append the full name input to the form
	form.appendChild(L_Nome);
	form.appendChild(Nome);
	// Inserting a line break
	form.appendChild(br.cloneNode());

	// Append the DOB to the form
	form.appendChild(L_Cognome);
	form.appendChild(Cognome);
	form.appendChild(br.cloneNode());


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

	form.appendChild(L_indirizzo);
	form.appendChild(indirizzo);
	form.appendChild(br.cloneNode());

	// Append the Password to the form
	form.appendChild(L_Capienza_massima);
	form.appendChild(Capienza_massima);
	form.appendChild(br.cloneNode());


	form.appendChild(erbottone);
	// Inserting a line break
	form.appendChild(br.cloneNode());

	document.getElementsByTagName("form")[0].appendChild(form);
	//document.getElementsByTagName("form").appendChild(form);

}

let profilo_aggiornato = {}

//listener bottone modifica
document.addEventListener("DOMContentLoaded", function () {
	erbottone.addEventListener("click", async function (e) {
		e.preventDefault();

		console.log("FINE : ")
		// document.getElementById("myForm").style.display = "none";

		profilo_aggiornato.Nome = document.getElementById("Nome").value;
		profilo_aggiornato.Cognome = document.getElementById("Cognome").value;
		profilo_aggiornato.Data_di_nascita = document.getElementById("Data_di_nascita").value;
		profilo_aggiornato.Telefono = document.getElementById("Telefono").value;
		profilo_aggiornato.Nome_Attivita = document.getElementById("Nome_Attivita").value;
		profilo_aggiornato.Tipo_Attivita = document.getElementById("Tipo_Attivita").value;
		profilo_aggiornato.indirizzo = document.getElementById("Indirizzo").value;
		profilo_aggiornato.Capienza_massima = document.getElementById("Capienza_massima").value;

		console.log(profilo_aggiornato);
		let risposta_fornitore;

		const response = await fetch('/fornitori/api/aggiorna_profilo_cliente_fornitore/' + id_fornitore, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"Nome": profilo_aggiornato.Nome,
				'Cognome' : profilo_aggiornato.Cognome,
				'Data_di_nascita' : profilo_aggiornato.Data_di_nascita,
				'Telefono' : profilo_aggiornato.Telefono
			})
		})
		risposta_fornitore = await response; //extract JSON from the http response
		console.log(risposta_fornitore);

		console.log(en_create);
 let risposta_fornitore1;
		if (en_create == 1) {
			const response = await fetch('/fornitori/api/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"ID_utente_fornitore": id_fornitore,
					"Nome_Attivita": profilo_aggiornato.Nome_Attivita,
					"Tipo_Attivita": profilo_aggiornato.Tipo_Attivita,
					"Indirizzo": profilo_aggiornato.Indirizzo,
					"Capienza_massima": profilo_aggiornato.Capienza_massima
				})
			})
			risposta_fornitore1 = await response; //extract JSON from the http response
			console.log(risposta_fornitore1)
			en_create = 0;
		}
		else {
			/*DONE*/
			const response = await fetch('/fornitori/api/aggiorna_profilo_cliente_fornitore/'+id_fornitore, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"ID_utente_fornitore": id_fornitore,
					"Nome_Attivita": profilo_aggiornato.Nome_Attivita,
					"Tipo_Attivita": profilo_aggiornato.Tipo_Attivita,
					"Indirizzo": profilo_aggiornato.Indirizzo,
					"Capienza_massima": profilo_aggiornato.Capienza_massima
				})
			})
			risposta_fornitore1 = await response; //extract JSON from the http response
		}


		if (risposta_fornitore.status == 200 || risposta_fornitore1.status == 200) {
			let Text="Aggiornato"
			showPopup(Text);
		}
		else {
			let Text="Non Aggiornato"
			showPopup(Text);
		}


	});
});

//listener bottone orario
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("btn_new_orario").addEventListener("click", async function (e) {
		e.preventDefault();

		const Giorno = document.getElementById("Giorno").value;
		const Orario_I = document.getElementById("Orario_I").value;
		const Orario_F = document.getElementById("Orario_F").value;
		console.log("btn_new_orario : ", Giorno, Orario_I, Orario_F);
		console.log(diffTime(Orario_F, Orario_I))
		let disponibilita = 1;


		for (let element of data_ora) {
			if (element.Giorno_della_settimana == Giorno) {
				console.log(Orario_I, element.Orario_chiusura, Orario_F, element.Orario_apertura)
				console.log(diffTime(Orario_I, element.Orario_chiusura), diffTime(Orario_F, element.Orario_apertura))
				if (diffTime(Orario_I, element.Orario_chiusura) > 0) { // DOPO

				}
				else if (diffTime(Orario_F, element.Orario_apertura) < 0) {
				}
				else {
					disponibilita = 0;
				}
			}
		}

		let risposta;
		if (disponibilita == 0) {
			window.alert('In questo slot o un suo sub slot temporale gia sei aperto');
		}
		else {
			if (diffTime(Orario_F, Orario_I) > 0) {
				/**/
				const response = await fetch('/OrarioAttivita/api/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"ID_fornitore": id_fornitore,
						"Giorno_della_settimana": Giorno,
						"Orario_apertura": Orario_I,
						"Orario_chiusura": Orario_F
					})
				})
				risposta = await response;
				console.log(risposta.status)
			}
			else { risposta = 500; }

			if (risposta.status == 200) {
				window.alert('Orario creato');
				window.onload();
			}
			else {
				window.alert('Dati inseriti non validi');
			}
		}

	});
});


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
	th.appendChild(text);;
	row.appendChild(th);
}


async function richiedi_orario() {
	/* DONE */
	const response = await fetch('/OrarioAttivita/api/Orario_fornitore/' + id_fornitore, {
		method: 'GET',
		headers: {
			"Access-Control-Request-Method": "GET",
			"Accept": "application/json",
			'Content-Type': 'application/json;charset-UTF-8'
		}
	});
	const orari_tornati = await response.json(); //extract JSON from the http response
	// // do something with myJson
	console.log("orari: ", orari_tornati);
	return orari_tornati;
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
		let button = document.createElement("button");
		button.innerHTML = "Elimina";
		button.setAttribute("type", "submit");
		button.setAttribute("data_id", element["ID"]);

		button.setAttribute("id", "btn_elimina");
		button.onclick = function exe_botton() { elimina_orario(element["ID"]); }
		buttonCell.appendChild(button);
	}
}


async function elimina_orario(ID) {
	console.log(ID);

	const response = await fetch('/OrarioAttivita/api/delete_orario/' + ID + '/' + id_fornitore, {
		method: 'DELETE',
		headers: {
			"Accept": "application/json",
			'Content-Type': 'application/json;charset-UTF-8'
		},
		body: { ID_fornitore: id_fornitore }
	});
	const risposta = await response; //extract JSON from the http response
	// // do something with myJson
	console.log(risposta)
	if (risposta.status = 200) {
		window.alert("eliminato correttamente");
	}
	else {
		window.alert("Errore");
	}


	location.reload();
}

async function create_table_orari() {
	//let table = document.querySelector("table");// create table
	let columns = ["Giorno della settimana",
		"Orario Apertura",
		"Orario Chiusura"];
	let keys = ["Giorno_della_settimana",
		"Orario_apertura", "Orario_chiusura"];

	console.log("entro in crea tabella")
	data_ora = await richiedi_orario();
	console.log(data_ora);
	data_ora = data_ora.sort(function (a, b) {
		return a.Giorno_della_settimana.localeCompare(b.Giorno_della_settimana);
	});

	if (data_ora.length > 0) {
		var table = document.getElementById("json-table");
		table.innerHTML = ""
		let data = Object.keys(data_ora[0]); //save the keys
		console.log(data)
		generateTableHead(table, data, columns); //create header
		generateTable(table, data_ora, keys); //print table
	}
	else { table.innerHTML = "Non è presente nessuna prenotazione..."; }
}