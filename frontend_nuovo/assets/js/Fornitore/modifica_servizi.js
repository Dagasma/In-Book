var data = {
	"Tipologia": "Tutto a 0,09cent",
	"Descrizione": "Tozza bancone",
	"Durata": "20:00",
	"Capienza_massima": "2022"
};


//document.body.onload = create_table;

function form_profilo() {
	var down = document.getElementById("GFG_DOWN");

	// Create a break line element
	var br = document.createElement("br");

	// Create a form dynamically
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", "/");

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

	// create a submit button
	var s = document.createElement("input");
	s.setAttribute("type", "submit");
	s.setAttribute("value", "Modifica s");

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

	// Append the Password to the form
	

	// Append the submit button to the form
	form.appendChild(s);

	document.getElementsByTagName("form")[0].appendChild(form);
	//document.getElementsByTagName("form").appendChild(form);

}

