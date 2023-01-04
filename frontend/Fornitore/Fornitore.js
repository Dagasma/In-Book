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
    });
  }