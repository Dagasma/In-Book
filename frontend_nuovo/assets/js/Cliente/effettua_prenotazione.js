//richiedere i dati del fornitore
const userAction = async () => {
    console.log("sono entrato in user action")
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
    // const response = await fetch('http://127.0.0.1:4000//servizi/api/get_fornitore/' + id_fornitore, {
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

console.log("risposta prima GET", userAction())

//json
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

//Genera la tabella
function generateTable(table, data, keys, index) {
    for (key of keys) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = "<b>" + index[key] + "<b>";
        cell2.innerHTML = data[key];
    }
}

//inserisce la tabella in HTML
function create_table_prenotazioni() {
    //let table = document.querySelector("table");// create table
    let keys = ["Nome_Attivita", "Tipo_Attivita",
        "Indirizzo", "Capienza_massima", "Nome",
        "Cognome", "Email", "Telefono"];

    let index = {
        "Nome_Attivita": "Nome Attività", "Tipo_Attivita": "Tipo Attività",
        "Indirizzo": "Indirizzo", "Capienza_massima": "Capienza massima", "Nome": "Nome",
        "Cognome": "Cognome", "Email": "Email", "Telefono": "Telefono"
    };

    var table = document.getElementById("table-fornitori");
    generateTable(table, dati_fornitore, keys, index);//print table
}

//json slot
esempio_slot = [{ "Orario_inizio": "09:00", "Posti_disponibili": 5 }, { "Orario_inizio": "09:30", "Posti_disponibili": 6 }, { "Orario_inizio": "10:00", "Posti_disponibili": 4 }, { "Orario_inizio": "10:30", "Posti_disponibili": 10 }, { "Orario_inizio": "11:00", "Posti_disponibili": 10 }, { "Orario_inizio": "11:30", "Posti_disponibili": 9 }, { "Orario_inizio": "12:00", "Posti_disponibili": 8 }]


/*calcolo orarario disponibili in base al json di orario e capacita
restituisce gli orari con posti>capacita*/
function saveStartTime(slot, capacita){
    let orari_disponibili = []
    for (let i = 0; i < slot.length; i++) {
        if (slot[i].Posti_disponibili >= capacita) {
            console.log()
            orari_disponibili.push(slot[i].Orario_inizio);
        }
    }
    return orari_disponibili;
}

/*listener bottone disponibilità se cliccato
prende json orario_inizio capacita
salva gli orari congrui
passa all'input select-orari solo quei parametri*/
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("btn_disponibilita").addEventListener("click", function (e) {
    e.preventDefault();

    // const Data_disponibilita = document.getElementById("Data").value;
    const numero_persone = document.getElementById("Numero_persone").value;
    // fetch('http://127.0.0.1:4000//servizi/api/get_slot_liberi/', {
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
   
    let list_orari =[]
    console.log(list_orari)
    list_orari=saveStartTime(esempio_slot, numero_persone)
    console.log("conversione slot:",list_orari);

    const select = document.getElementById("Select_orario");
    select.innerHTML = "";
    list_orari.forEach(function (option) {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        select.appendChild(optionElement);
    });
});});

//listener bottone prenotazione
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("btn_prenota").addEventListener("click",function (e){
    e.preventDefault();
    console.log("prenota");

    // document.getElementById("myForm").style.display = "none";
    // const Data_disponibilita = document.getElementById("Data").value;
    // const numero_persone = document.getElementById("Numero_persone").value;
    // fetch('/servizi/api/get_slot_liberi/', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         "Descrizione": Data_disponibilita,
    //         "ID_fornitore": id_fornitore
    //     })
    // })
    //     .then(response => response.json())
    //     .then(data => { console.log(data); })
    //     .catch(error => console.error(error));
    // esempio_slot = response;
});});
