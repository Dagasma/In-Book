/* richiedere i dati del fornitore
Questo codice JavaScript crea una funzione asincrona chiamata "richiedi_fornitore". La parola chiave "async" 
indica che la funzione può utilizzare la sintassi "await" all'interno della funzione per attendere 
la risoluzione di una promessa prima di continuare l'esecuzione del codice.
*/
function richiedi_fornitore(){
    // Dati fornitore
    var dati_fornitore = {
        "Nome_Attivita": "Tutto a 0,09cent",
        "Tipo_Attivita": "Tozza bancone",
        "Indirizzo": "Casa tua , 66666, SO",
        "Capienza_massima": "2022",
        "Nome": "pepp",
        "Cognome": "de coglio",
        "Email": "Casa sua , 66666, SO",
        "Telefono": "42342342",
        "Data_di_nascita": "2000-10-01"
    };

    /* DONE */
    // const response = await fetch('servizi/api/get_fornitore/' + id_fornitore, {
    //     method: 'GET',
    //     headers: {
    //         "Access-Control-Request-Method": "GET",
    //         "Accept": "application/json",
    //         'Content-Type': 'application/json;charset-UTF-8'
    //     }
    // });
    // const dati_fornitore = await response.json(); //extract JSON from the http response
    // // do something with myJson

    return dati_fornitore
}

//Genera la tabella
function generazione_table(table, data, keys, index) {
    for (key of keys) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = "<b>" + index[key] + "<b>";
        cell2.innerHTML = data[key];
    }
}

function calcolo_media(){
    media= [{"media":"5.0000"}];

    /* DONE */
    // fetch('/Votazioni/api/get_media_fornitore/'+ id_fornitore, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         "Data_giorno": Data_disponibilita,
    //         "ID_fornitore": id_fornitore
    //     })
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.success) {
    //             // show the form
    //             document.getElementById("form_effettua_prenotazione").style.display = "block";
    //         } else {
    //             // show an error message
    //             console.log("Error: " + data.message);
    //         }
    //     })
    //     .catch(error => console.error(error));

    return media;
}

function inserisci_servizi_form(){
    servizi_fornitore_ex = [
        {
            "ID": 2,
            "ID_fornitore": "5",
            "Tipologia": "Controllo peso",
            "Descrizione": "Controllo da",
            "Durata": "00:30:00"
        },
        {
            "ID": 3,
            "ID_fornitore": "5",
            "Tipologia": "Consulenza",
            "Descrizione": "Scelta di un piano",
            "Durata": "02:00:00"
        },
        {
            "ID": 4,
            "ID_fornitore": "5",
            "Tipologia": "Piscina",
            "Descrizione": "2:00 in piscina",
            "Durata": "02:00:00"
        },
        {
            "ID": 9,
            "ID_fornitore": "5",
            "Tipologia": "Controllo peso",
            "Descrizione": "Controllo da",
            "Durata": "00:30:00"
        }
    ]

    // fetch('/servizi/api/get_servizi_per_fornitore/'+id_fornitore, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         "Data_giorno": Data_disponibilita,
    //         "ID_fornitore": id_fornitore
    //     })
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.success) {
    //             // show the form
    //             document.getElementById("form_effettua_prenotazione").style.display = "block";
    //         } else {
    //             // show an error message
    //             console.log("Error: " + data.message);
    //         }
    //     })
    //     .catch(error => console.error(error));

    const select = document.getElementById("Select_Servizio");
    select.innerHTML = "Inserisci il servizio";

    for (let i = 0; i < servizi_fornitore_ex.length; i++) {
                const optionElement = document.createElement("option");
        optionElement.value = servizi_fornitore_ex[i].ID;
        optionElement.text = servizi_fornitore_ex[i].Tipologia;
        select.appendChild(optionElement);
    }
}

//inserisce la tabella in HTML
function Aggiorna_Table() {
    //let table = document.querySelector("table");// create table
    let keys = ["Nome_Attivita", "Tipo_Attivita",
        "Indirizzo", "Capienza_massima", "Nome",
        "Cognome", "Email", "Telefono","media"];

    let index = {
        "Nome_Attivita": "Nome Attività", "Tipo_Attivita": "Tipo Attività",
        "Indirizzo": "Indirizzo", "Capienza_massima": "Capienza massima", "Nome": "Nome",
        "Cognome": "Cognome", "Email": "Email", "Telefono": "Telefono","media":"Voto medio"
    }; 
    let dati_fornitore=richiedi_fornitore();
    dati_fornitore['media']=calcolo_media()[0].media;

    var table = document.getElementById("table-fornitori");
    generazione_table(table, dati_fornitore, keys, index);//print table
    inserisci_servizi_form();
}

/*calcolo orarario disponibili in base al json di orario e capacita
restituisce gli orari con posti>capacita*/
function Calc_slot_liberi(slot, capacita){
    let orari_disponibili = []
    for (let i = 0; i < slot.length; i++) {
        if (slot[i].Posti_disponibili >= capacita) {
            console.log()
            orari_disponibili.push(slot[i].Orario_inizio);
        }
    }
    return orari_disponibili;
}

//listener bottone votazione
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btn_voto").addEventListener("click",function (e){
        e.preventDefault();
  

       const voto = document.getElementById("Voto").value;
        console.log(voto);
        /*DONE*/
        // fetch('/Votazioni/api/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
                    // "ID_fornitore": servizi_fornitore_ex.ID_fornitore,
                    // "ID_servizio": id_servizio,
                    // "Voto": Voto
        //     })
        // })
        //     .then(response => response.json())
        //     .then(data => { console.log(data); })
        //     .catch(error => console.error(error));
        //      esempio_slot = response;
    });
    });

/*listener bottone disponibilità se cliccato
prende json orario_inizio capacita
salva gli orari congrui
passa all'input select-orari solo quei parametri*/
document.addEventListener("DOMContentLoaded", function() { // aspetta il caricamento della pagina
document.getElementById("btn_disponibilita").addEventListener("click", function (e) {
    e.preventDefault();
    //json slot
    esempio_slot = [{ "Orario_inizio": "09:00", "Posti_disponibili": 5 }, { "Orario_inizio": "09:30", "Posti_disponibili": 6 }, { "Orario_inizio": "10:00", "Posti_disponibili": 4 }, { "Orario_inizio": "10:30", "Posti_disponibili": 10 }, { "Orario_inizio": "11:00", "Posti_disponibili": 10 }, { "Orario_inizio": "11:30", "Posti_disponibili": 9 }, { "Orario_inizio": "12:00", "Posti_disponibili": 8 }]
    
    const numero_persone = document.getElementById("Numero_persone").value;
    let form1_prenotazione={}
    // const Data_disponibilita = document.getElementById("Data").value;
    form1_prenotazione.numero_persone = document.getElementById("Numero_persone").value;
    form1_prenotazione.Data_disponibilita = document.getElementById("Data").value;
    form1_prenotazione.id_servizio = document.getElementById("Select_Servizio").value;

    /* DONE */
    // fetch('/servizi/api/get_slot_liberi/', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         "Data_giorno": Data_disponibilita,
    //         "ID_fornitore": id_fornitore
    //     })
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.success) {
    //             // show the form
    //             document.getElementById("form_effettua_prenotazione").style.display = "block";
    //         } else {
    //             // show an error message
    //             console.log("Error: " + data.message);
    //         }
    //     })
    //     .catch(error => console.error(error));

    const select = document.getElementById("Select_orario");
    list_orari=Calc_slot_liberi(esempio_slot,numero_persone)
    select.innerHTML = "";
    list_orari.forEach(function (option) {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        select.appendChild(optionElement);
    });
    select.setAttribute("dati",form1_prenotazione);
});});

//listener bottone prenotazione
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("btn_prenota").addEventListener("click",function (e){
    e.preventDefault();

    console.log("FINE : ",servizi_fornitore_ex )
   
    const orario = document.getElementById("Select_orario").value;
    const num_persone = document.getElementById("Numero_persone").value;
    console.log(num_persone);

    /*DONE*/
    // fetch('/servizi/api/effettua_prenotazione/', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
                // "ID_utente": id_cliente,
                // "ID_fornitore": servizi_fornitore_ex.ID_fornitore,
                // "ID_servizio": id_servizio,
                // "Orario_prenotazione_inizio": Data_disponibilita,
                // "Numero_clienti": numero_persone
    //     })
    // })
    //     .then(response => response.json())
    //     .then(data => { console.log(data); })
    //     .catch(error => console.error(error));
    //      esempio_slot = response;
});
});