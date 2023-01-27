let id_cliente = document.cookie.substring(3, 40);

async function showPopup(Action) {

    var popup = document.createElement("div");
    popup.style.cssText = "position: fixed; top: 20%; left: 10%; width: 80%; background-color: #22b3c1; padding: 20px; z-index: 999; border-radius:10px; text-align:center; font-size:40px; color: white; font-weight:bold;";
    document.body.appendChild(popup);

    if (Action == "Aggiornato") { popup.innerHTML = "Dati del profilo aggiornati"; }
    else{ popup.innerHTML = "Errore : Nessun dato è stato modificato oppure numero di telefono gia presente nel database"; }

    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Chiudi");
    btn.appendChild(t);
    btn.style.cssText = "position: relative; margin: 10px auto; padding: 10px 20px; background-color: #22b3c1; color: white; border-radius:10px; font-size:20px;";
    btn.onclick = function () {
        document.body.removeChild(popup);

        if (Action == "Aggiornato") {
			location.reload()
        }
        else { location.reload() }


    };
    var linebreak = document.createElement("br");
    popup.appendChild(linebreak);
    popup.appendChild(btn);
    popup.appendChild(btn);
}

async function richiedi_utente() {
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
	return data;
}


async function form_profilo() {

	let data =  await richiedi_utente();

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
		

		let profilo_up = {}
		profilo_up.Nome = document.getElementById("Nome").value;
		profilo_up.Cognome = document.getElementById("Cognome").value;
		profilo_up.Data_di_nascita = document.getElementById("Data_di_nascita").value;
		profilo_up.Telefono = document.getElementById("Telefono").value;


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
		if(risposta.message=='User was updated successfully.')
		{
			let Action = "Aggiornato"
			showPopup(Action)
		}
		else{
			let Action = "Non Aggiornato"
			showPopup(Action)
		}

	});
	});
