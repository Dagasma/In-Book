
	var down = document.getElementById("GFG_DOWN");
	// Create a break line element
	var br = document.createElement("br");

	function GFG_Fun() {
	
    var data= {"name":"giuliano",
                "Cognome":"DiGiuseppe",
                "Email":"digigiu00",
                "data":"2000-04-24",
                "telefono":"3841397112"};

	// Create a form dynamically
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", "/");

	// Create an input element for Full Name
    var L_Nome = document.createElement("label");
    L_Nome.setAttribute("for","Nome");

    L_Nome.innerHTML="Nome: "

    var name = document.createElement("input");
    name.type="text"
    name.id=name
    name.value=data.name
    name.placeholder=data.name

    console.log(name);

    // Create an input element for Full Name
    var L_Cognome = document.createElement("label");  
    L_Cognome.setAttribute("value","Cognome");
    L_Cognome.innerHTML="Cognome: ";
	var surname = document.createElement("input");
	surname.setAttribute("type", "text");
	surname.setAttribute("name",  data.Cognome);
	surname.setAttribute("placeholder", data.Cognome);

    console.log(surname);

    var Data_di_nascita = document.createElement("input");
	Data_di_nascita.setAttribute("type", "date");
	Data_di_nascita.setAttribute("name", data.Data_di_nascita);
	Data_di_nascita.setAttribute("placeholder", data.Data_di_nascita);

	// Create an input element for emailID
	var Email = document.createElement("input");
	Email.setAttribute("type", "Email");
	Email.setAttribute("name", data.Email);
	Email.setAttribute("placeholder", data.Email);

	// Create an input element for password
	var PWD = document.createElement("input");
	PWD.setAttribute("type", "password");
	PWD.setAttribute("name", "password");
	PWD.setAttribute("placeholder", "Password");

	// Create an input element for retype-password
	var NewPassword = document.createElement("input");
	NewPassword.setAttribute("type", "password");
	NewPassword.setAttribute("name", "NewPassword");
	NewPassword.setAttribute("placeholder", "NewPassword");

    // Create an input element for retype-password
	var Telefono = document.createElement("input");
	Telefono.setAttribute("type", "tel");
	Telefono.setAttribute("name", data.telefono);
	Telefono.setAttribute("placeholder", data.telefono);

				// create a submit button
				var s = document.createElement("input");
				s.setAttribute("type", "submit");
				s.setAttribute("value", "Modifica profilo");
				
				// Append the full name input to the form
				form.appendChild(L_Nome);
                form.appendChild(name);
				// Inserting a line break
				form.appendChild(br.cloneNode());
				
				// Append the DOB to the form
                form.appendChild(L_Cognome);
				form.appendChild(surname);
				form.appendChild(br.cloneNode());
				
				// Append the emailID to the form
				form.appendChild(Data_di_nascita);
				form.appendChild(br.cloneNode());
				
				// Append the Password to the form
				form.appendChild(Email);
				form.appendChild(br.cloneNode());
				
				// Append the ReEnterPassword to the form
				form.appendChild(PWD);
				form.appendChild(br.cloneNode());
				
                // Append the ReEnterPassword to the form
				form.appendChild(NewPassword);
				form.appendChild(br.cloneNode());
				
                // Append the ReEnterPassword to the form
				form.appendChild(Telefono);
				form.appendChild(br.cloneNode());				

				// Append the submit button to the form
				form.appendChild(s);

				document.getElementsByTagName("body")[0].appendChild(form);
				//document.getElementsByTagName("body").appendChild(form);

			}

