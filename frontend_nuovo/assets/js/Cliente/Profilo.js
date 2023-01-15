function richiedi_utente(){
    // Dati fornitore
	var data = {
		"Nome": "pepp",
		"Cognome": "due coglio",
		"Email": "ad@sda.it",
		"Telefono": "42342342",
		"Data_di_nascita": "2000-10-01"
	};
	
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


function form_profilo() {

	let data =richiedi_utente();
	console.log(data);

	// Create a break line element
	var br = document.createElement("br");

	// Create a form dynamically
	var form = document.createElement("form");
	form.id="form_profilo"
	form.setAttribute("method", "post");
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
	
	var L_Cognome = document.createElement("label");
	L_Cognome.setAttribute("value", "Cognome");
	L_Cognome.innerHTML = "Cognome: ";
	var Cognome = document.createElement("input");
	Cognome.type = "text";
	Cognome.id = "Cognome";
	Cognome.value = data.Cognome;
	Cognome.placeholder = data.Cognome;

	
	var L_Email = document.createElement("label");
	L_Email.setAttribute("value", "Email");
	L_Email.innerHTML = "Email: ";
	var Email = document.createElement("input");
	Email.type = "email";
	Email.id = "Email";
	Email.value = data.Email;
	Email.placeholder = data.Email;

	
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

	// create a submit button
	var s = document.createElement("button");
	s.setAttribute("id",'btn_modifica_profilo');
	s.innerHTML ="Modifica profilo";

	// Append the full name input to the form
	form.appendChild(L_Nome);
	form.appendChild(Nome);
	form.appendChild(br.cloneNode());

	form.appendChild(L_Cognome);
	form.appendChild(Cognome);
	form.appendChild(br.cloneNode());

	form.appendChild(L_Email);
	form.appendChild(Email);
	form.appendChild(br.cloneNode());

	form.appendChild(L_Data_di_nascita);
	form.appendChild(Data_di_nascita);
	form.appendChild(br.cloneNode());

	form.appendChild(L_Telefono);
	form.appendChild(Telefono);
	form.appendChild(br.cloneNode());

	form.appendChild(s);
	form.appendChild(br.cloneNode());

	document.getElementsByTagName("form")[0].appendChild(form);
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