let id_cliente = document.cookie.substring(3, 40);

async function richiedi_utente() {
	console.log(id_cliente)
	/* DONE */
	const response = await fetch('/cliente/api/get_profilo/' + id_cliente, {
		method: 'GET',
		headers: {
			"Access-Control-Request-Method": "GET",
			"Accept": "application/json",
			'Content-Type': 'application/json;charset-UTF-8'
		}
	});
	let data = await response.json(); //extract JSON from the http response
	console.log(data);
	return data;
}


async function form_profilo() {

	let data =  await richiedi_utente();
	console.log("form_Data", data);

	// Create a break line element
	var br = document.createElement("br");

	// Create a form dynamically
	var form = document.createElement("form");
	form.id = "form_profilo";

	// Create an input element for Full Name
	var L_Nome = document.createElement("label");
	L_Nome.setAttribute("for", "Nome");
	L_Nome.innerHTML = "Nome: "
	var Nome = document.createElement("input");
	Nome.type = "text";
	Nome.id = "Nome";
	Nome.value = data.Nome;
	Nome.placeholder = data.Nome;

	var L_Cognome = document.createElement("label");
	L_Cognome.setAttribute("value", "Cognome");
	L_Cognome.innerHTML = "Cognome: ";
	var Cognome = document.createElement("input");
	Cognome.type = "text";
	Cognome.id = "Cognome";
	Cognome.value = data.Cognome;
	Cognome.placeholder = data.Cognome;




	var L_Data_di_nascita = document.createElement("label");
	L_Data_di_nascita.setAttribute("value", "Data_di_nascita");
	L_Data_di_nascita.innerHTML = "Data di nascita: ";
	var Data_di_nascita = document.createElement("input");
	Data_di_nascita.type = "date";
	Data_di_nascita.id = "Data_di_nascita";
	Data_di_nascita.value = data.Data_di_nascita;
	Data_di_nascita.placeholder = data.Data_di_nascita;


	var L_Telefono = document.createElement("label");
	L_Telefono.setAttribute("value", "Telefono");
	L_Telefono.innerHTML = "Telefono: ";
	var Telefono = document.createElement("input");
	Telefono.type = "tel";
	Telefono.id = "Telefono";
	Telefono.value = data.Telefono;
	Telefono.placeholder = data.Telefono;


	// Append the full name input to the form
	form.appendChild(L_Nome);
	form.appendChild(Nome);
	form.appendChild(br.cloneNode());

	form.appendChild(L_Cognome);
	form.appendChild(Cognome);
	form.appendChild(br.cloneNode());



	form.appendChild(L_Data_di_nascita);
	form.appendChild(Data_di_nascita);
	form.appendChild(br.cloneNode());

	form.appendChild(L_Telefono);
	form.appendChild(Telefono);

	// form.appendChild(s);
	// form.appendChild(br.cloneNode());

	document.getElementsByTagName("form")[0].appendChild(form);
}

//listener bottone prenotazione
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("btn_modifica").addEventListener("click",  async function (e) {
		e.preventDefault();
		
		console.log("FINE : ")

		let profilo_up = {}
		profilo_up.Nome = document.getElementById("Nome").value;
		profilo_up.Cognome = document.getElementById("Cognome").value;
		profilo_up.Data_di_nascita = document.getElementById("Data_di_nascita").value;
		profilo_up.Telefono = document.getElementById("Telefono").value;

		console.log(profilo_up);

		/*DONE*/
		const response = await fetch('/cliente/api/aggiorna_profilo/' + id_cliente, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "Nome": document.getElementById("Nome").value,
			'Cognome' : document.getElementById("Cognome").value,
			'Data_di_nascita' : document.getElementById("Data_di_nascita").value,
			'Telefono' : document.getElementById("Telefono").value})
		})
		
		const risposta =await response.json();
		console.log(risposta.message);
		if(risposta.message=='User was updated successfully.')
		{
			window.alert("Aggiornato");
		}
		else{
			window.alert("Errore, I campi inseriti non sono validi oppure non hai modificato nessun dato");
		}
		location.reload();

	});
	});
