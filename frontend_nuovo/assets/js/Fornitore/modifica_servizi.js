let id_servizio =2;
let id_fornitore = document.cookie.substring(3, 40);

async function richiedi_servizi(){
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

function form_modifica() {

	// Create a break line element
	var br = document.createElement("br");

	data = richiedi_servizi();
	console.log(data);
	// Create a form dynamically
	var form = document.createElement("form");


	// Create an input element for Full Name
	var L_Tipologia = document.createElement("label");
	L_Tipologia.setAttribute("for", "Tipologia");
	L_Tipologia.innerHTML = "Tipologia "

	var Tipologia = document.createElement("input");
	Tipologia.type = "text";
	Tipologia.id = "Tipologia";
	Tipologia.value = data.Tipologia;
	Tipologia.placeholder = data.Tipologia;


	// Create an input element for Full Name
	var L_Descrizione = document.createElement("label");
	L_Descrizione.setAttribute("value", "Descrizione");
	L_Descrizione.innerHTML = "Descrizione";
	var Descrizione = document.createElement("input");
	Descrizione.type = "text";
	Descrizione.id = "Descrizione";
	Descrizione.value = data.Descrizione;
	Descrizione.placeholder = data.Descrizione;


	var L_Durata = document.createElement("label");
	L_Durata.setAttribute("value", "Durata");
	L_Durata.innerHTML = "Durata";
	var Durata = document.createElement("input");
	Durata.type = "time";
	Durata.id = "Durata";
	Durata.value = data.Durata;
	Durata.placeholder = data.Durata;

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
		fetch('/servizi/api/aggiorna_servizio/'+id_servizio+'/'+id_fornitore , {
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
			.then(response => response.json())
			.then(data => { console.log(data); })
			.catch(error => console.error(error));


		window.alert("Aggiornato");
		location.reload();

	});
});