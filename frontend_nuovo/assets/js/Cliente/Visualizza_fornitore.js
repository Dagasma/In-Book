let id_fornitore = 6;
let id_cliente = document.cookie.substring(3, 40);
/* richiedere i dati del fornitore
Questo codice JavaScript crea una funzione asincrona chiamata "richiedi_fornitore". La parola chiave "async" 
indica che la funzione può utilizzare la sintassi "await" all'interno della funzione per attendere 
la risoluzione di una promessa prima di continuare l'esecuzione del codice.
*/
async function richiedi_fornitore() {
    // Dati fornitore
    console.log("richiesta ..")

    const response = await fetch('/fornitori/api/cliente_get_profilo_fornitore/' + id_fornitore, {
        method: 'GET',
        headers: {
            "Access-Control-Request-Method": "GET",
            "Accept": "application/json",
            'Content-Type': 'application/json;charset-UTF-8'
        }
    });
    const dati_fornitore = await response.json(); //extract JSON from the http response
    console.log(dati_fornitore);
    dati_fornitore.Email = dati_fornitore.ID_utente_fornitore_UTENTI.Email
    dati_fornitore.Telefono = dati_fornitore.ID_utente_fornitore_UTENTI.Telefono

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

async function calcolo_media() {
    //let media = [{ "media": "5.0000" }];

    const response = await fetch('/Votazioni/api/get_media_fornitore/' + id_fornitore, {
        method: 'GET',
        headers: {
            "Access-Control-Request-Method": "GET",
            "Accept": "application/json",
            'Content-Type': 'application/json;charset-UTF-8'
        }
    });
    const media = await response.json(); //extract JSON from the http response
    console.log(media);
    return media;
}

async function inserisci_servizi_form() {

    const response = await fetch('/servizi/api/get_servizi_per_fornitore/' + id_fornitore, {
        method: 'GET',
        headers: {
            "Access-Control-Request-Method": "GET",
            "Accept": "application/json",
            'Content-Type': 'application/json;charset-UTF-8'
        }
    });
    const servizi_fornitore_ex = await response.json(); //extract JSON from the http response

    console.log(servizi_fornitore_ex);

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
async function Aggiorna_Table() {
    //let table = document.querySelector("table");// create table
    let keys = ["Nome_Attivita", "Tipo_Attivita",
        "Indirizzo", "Capienza_massima", "Email", "Telefono", "media"];

    let index = {
        "Nome_Attivita": "Nome Attività", "Tipo_Attivita": "Tipo Attività",
        "Indirizzo": "Indirizzo", "Capienza_massima": "Capienza massima", "Email": "Email", "Telefono": "Telefono", "media": "Voto medio"
    };
    let dati_fornitore = await richiedi_fornitore();
    let media_fornitore = await calcolo_media()
    if (media_fornitore[0].media == null) { dati_fornitore.media = "Nessun Voto"; }
    else { dati_fornitore.media = media_fornitore[0].media; }

    var table = document.getElementById("table-fornitori");
    generazione_table(table, dati_fornitore, keys, index);//print table
    inserisci_servizi_form();
}

/*calcolo orarario disponibili in base al json di orario e capacita
restituisce gli orari con posti>capacita*/
function Calc_slot_liberi(slot, capacita) {
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
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn_voto").addEventListener("click", async function (e) {
        e.preventDefault();


        const voto = document.getElementById("Voto").value;
        console.log(voto);

        /*DONE*/
        const response1 = await fetch('/Votazioni/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "ID_fornitore": id_fornitore,
                "ID_utente": id_cliente,
                "Voto": voto
            })
        })
            .then(response => response.json())
            .then(data => { console.log(data); })
            .catch(error => console.error(error));

        console.log(response1.json());
    });
});

/*listener bottone disponibilità se cliccato
prende json orario_inizio capacita
salva gli orari congrui
passa all'input select-orari solo quei parametri*/
document.addEventListener("DOMContentLoaded", function () { // aspetta il caricamento della pagina
    document.getElementById("btn_disponibilita").addEventListener("click", async function (e) {
        e.preventDefault();
        //json slot

        const numero_persone = document.getElementById("Numero_persone").value;
        let form1_prenotazione = {}
        // const Data_disponibilita = document.getElementById("Data").value;
        form1_prenotazione.numero_persone = document.getElementById("Numero_persone").value;
        form1_prenotazione.Data_disponibilita = document.getElementById("Data").value;
        form1_prenotazione.id_servizio = document.getElementById("Select_Servizio").value;
        console.log("prima della get");
        const response = await fetch('/prenotazioni/api/get_slot_liberi', {
            method: 'GET',
            headers: {
                "Access-Control-Request-Method": "GET",
                "Accept": "application/json",
                'Content-Type': 'application/json;charset-UTF-8'
            },
            body: JSON.stringify(
                {
                    'Data_giorno': form1_prenotazione.Data_disponibilita,
                    'ID_fornitore': id_fornitore
                })
        });
        const slot_orari = await response.json();
        console.log("dopo della get");
        console.log(slot_orari);

        const select = document.getElementById("Select_orario");

        list_orari = Calc_slot_liberi(esempio_slot, numero_persone)

        select.innerHTML = "";
        list_orari.forEach(function (option) {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.text = option;
            select.appendChild(optionElement);
        });
        select.setAttribute("dati", form1_prenotazione);
    });
});

//listener bottone prenotazione
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn_prenota").addEventListener("click", function (e) {
        e.preventDefault();

        console.log("FINE : ", servizi_fornitore_ex)

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