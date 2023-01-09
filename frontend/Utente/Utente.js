// Ascolta l'evento di invio del form
window.onload = function () {
  document.getElementById("myForm").addEventListener("submit", function(event) {
    // Previene l'invio del form (che ricaricherebbe la pagina)
    event.preventDefault();
    // Recupera l'ID del pulsante di invio selezionato
    var form_name = event.target.getAttribute("name");
    var form = document.getElementById("myForm");
    var inputs = form.elements;
    var formData = {};
    formData['name_form'] = form_name
    for (var i = 0; i < inputs.length-1; i++) {
      formData[inputs[i].name] = inputs[i].value;
    }
    console.log(formData)
    // send JSON
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Risposta dal server:', data);
    });

    console.log("inviato")
  });
}

// func modulo da definire ancora
function Modulo() {
  var Nome = document.modulo.Nome.value;
  var Cognome = document.modulo.Cognome.value;
  var Data_di_nascita = document.modulo.Data_di_nascita.value;
  var Email = document.modulo.Email.value;
  var Password_acc = document.modulo.Password_acc.value;
  var Telefono = document.modulo.Telefono.value;

  var Nome_attivita = document.modulo.Nome_attivita.value;
  var Tipo_Attivita = document.modulo.citta.Tipo_Attivita[document.modulo.Tipo_Attivita.selectedIndex].value;
  var Indirizzo = document.modulo.Indirizzo.value;

  var Orario_Lunedi_I = document.modulo.Orario_Lunedi_I.value;
  var Orario_Lunedi_F = document.modulo.Orario_Lunedi_F.value;
  var Orario_Martedi_I = document.modulo.Orario_Martedi_I.value;
  var Orario_Martedi_F = document.modulo.Orario_Martedi_F.value;


  document.modulo.action = "elabora_dati.asp";
  document.modulo.submit();
}

//lettura prova
function readinjson(name_form) {
  var form = document.getElementById(name_form);
  var inputs = form.elements;
  var formData = {};
  formData['name_form'] = name_form
  for (var i = 0; i < inputs.length; i++) {
    formData[inputs[i].name] = inputs[i].value;
  }
  console.log(formData)
}
