const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);
const id_servizio = searchParams.get('id');
let id_fornitore = document.cookie.substring(3, 40);

async function showPopup(Action, name) {
	var popup = document.createElement("div");
	popup.style.cssText = "position: fixed; top: 20%; left: 10%; width: 80%; background-color: #22b3c1; padding: 20px; z-index: 999; border-radius:10px; text-align:center; font-size:40px; color: white; font-weight:bold;";
	document.body.appendChild(popup);

	if (Action == "Modificato") { popup.innerHTML = "Il servizio " + name + " è stato Modificato"; }
	else { popup.innerHTML = "Inserire tutti i campi "; }

	var btn = document.createElement("BUTTON");
	var t = document.createTextNode("Chiudi");
	btn.appendChild(t);
	btn.style.cssText = "position: relative; margin: 10px auto; padding: 10px 20px; background-color: #22b3c1; color: white; border-radius:10px; font-size:20px;";
	btn.onclick = function () {
		if (Action == "Modificato") {
			let url = "/fornitore/visualizza_servizi";
			window.location.href = url;
		}
		else {
			window.location.reload;
		}


		document.body.removeChild(popup);
	};
	var linebreak = document.createElement("br");
	popup.appendChild(linebreak);
	popup.appendChild(btn);
	popup.appendChild(btn);
}

async function richiedi_servizi() {
	const response = await fetch('/servizi/api/get_servizio/' + id_servizio, {
		method: 'GET',
		headers: {
			"Access-Control-Request-Method": "GET",
			"Accept": "application/json",
			'Content-Type': 'application/json;charset-UTF-8'
		}
	});
	ex_data = await response.json(); //extract JSON from the http response

	return ex_data;
}

//document.body.onload = create_table;

async function form_modifica() {

	// Create a break line element
	var br = document.createElement("br");

	let data = await richiedi_servizi();
	console.log(data[0].ID);
	// Create a form dynamically
	var form = document.createElement("form");


	// Create an input element for Full Name
	var L_Tipologia = document.createElement("label");
	L_Tipologia.setAttribute("for", "Tipologia");
	L_Tipologia.innerHTML = "Tipologia "

	var Tipologia = document.createElement("input");
	Tipologia.type = "text";
	Tipologia.id = "Tipologia";
	Tipologia.value = data[0].Tipologia;
	Tipologia.placeholder = data[0].Tipologia;


	// Create an input element for Full Name
	var L_Descrizione = document.createElement("label");
	L_Descrizione.setAttribute("value", "Descrizione");
	L_Descrizione.innerHTML = "Descrizione";
	var Descrizione = document.createElement("input");
	Descrizione.type = "text";
	Descrizione.id = "Descrizione";
	Descrizione.value = data[0].Descrizione;
	Descrizione.placeholder = data[0].Descrizione;


	var L_Durata = document.createElement("label");
	L_Durata.setAttribute("value", "Durata");
	L_Durata.innerHTML = "Durata";
	var myParent = document.body;

	//Create array of options to be added
	var array = ["00:15", "00:30", "00:45", "01:00","01:30", "02:00", "02:30"];

	//Create and append select list
	var Durata = document.createElement("select");
	Durata.id = "Durata";
	//Create and append the options
	for (var i = 0; i < array.length; i++) {
		var option = document.createElement("option");
		option.value = array[i];
		option.text = array[i];
		Durata.appendChild(option);
	}

	Durata.placeholder = data[0].Durata;

	// Append the full name input to the form
	form.appendChild(L_Tipologia);
	form.appendChild(Tipologia);
	// Inserting a line break
	form.appendChild(br.cloneNode());

	// Append the DOB to the form
	form.appendChild(L_Descrizione);
	form.appendChild(Descrizione);
	form.appendChild(br.cloneNode());

	// Append the emailID to the form
	form.appendChild(L_Durata);
	form.appendChild(Durata);
	form.appendChild(br.cloneNode());


	document.getElementsByTagName("form")[0].appendChild(form);

}


document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("btn_modifica_servizi").addEventListener("click", async function (e) {
		e.preventDefault();

		console.log("FINE : ")

		const Tipologia = document.getElementById("Tipologia").value;
		const Descrizione = document.getElementById("Descrizione").value;
		const Durata = document.getElementById("Durata").value;

		/*DONE*/
		const response = await fetch('/servizi/api/aggiorna_servizio/' + id_servizio + '/' + id_fornitore, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"Tipologia": Tipologia,
				"Descrizione": Descrizione,
				"Durata": Durata
			})
		})
		const risposta = await response;

		if (risposta.status == 200) {
			let text = "Modificato";
			showPopup(text, Tipologia)
		}
		else {
			let text = "Non Modificato";
			showPopup(text)
		}


	});
});