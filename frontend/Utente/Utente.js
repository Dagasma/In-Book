
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


