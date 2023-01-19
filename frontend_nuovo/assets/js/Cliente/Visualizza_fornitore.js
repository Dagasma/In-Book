let id_fornitore = 6;
let id_cliente = document.cookie.substring(3, 40);
let Durata_servizio = '';

function diffTime(time1, time2) {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    let minutesDiff = (hours1 * 60 + minutes1) - (hours2 * 60 + minutes2);
    if (minutesDiff < 0) minutesDiff = minutesDiff + 1440; // 1440 is the total minutes in a day.
    let hoursDiff = Math.floor(minutesDiff / 60);
    let minutesDiffRemaining = minutesDiff % 60;

    return `${hoursDiff.toString().padStart(2, '0')}:${minutesDiffRemaining.toString().padStart(2, '0')}`;
}

function sumTime(time1, time2) {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    let minutesDiff = (hours1 * 60 + minutes1) + (hours2 * 60 + minutes2);
    let hoursDiff = Math.floor(minutesDiff / 60);
    let minutesDiffRemaining = minutesDiff % 60;
    return `${hoursDiff.toString().padStart(2, '0')}:${minutesDiffRemaining.toString().padStart(2, '0')}`;
}

function Rapporto_time(time1, time2) {
    console.log(time1, time2)
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    const minutes1Total = hours1 * 60 + minutes1;
    const minutes2Total = hours2 * 60 + minutes2;
    return minutes1Total / minutes2Total;
}

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
        Durata_servizio = servizi_fornitore_ex[i].Durata;
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
function Calc_slot_liberi(slot, capacita, durata) {
    let orari_disponibili = []
    console.log(durata, slot)

    let slot_durata = diffTime(slot[1].Orario_inizio, slot[0].Orario_inizio)
    let rapporto = Rapporto_time(durata, slot_durata)

    console.log(rapporto, slot_durata, slot);

    let cnt = 0; // conteggio slot
    for (let i = 0; i < slot.length - rapporto + 1; i++) { // scorro tutti gli slot
        for (let j = 0; j < rapporto; j++) { // scorro gli slot successivi
            if (slot[i + j].Posti_disponibili >= capacita) {
                cnt++;
                if (cnt == rapporto - 1) {
                    orari_disponibili.push(slot[i].Orario_inizio);
                }
            }
        }
        cnt = 0;
    }
    console.log(orari_disponibili)
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

        window.alert("voto salvato");
    });
});

let form1_prenotazione = {}

/*listener bottone disponibilità se cliccato
prende json orario_inizio capacita
salva gli orari congrui
passa all'input select-orari solo quei parametri*/
document.addEventListener("DOMContentLoaded", function () { // aspetta il caricamento della pagina
    document.getElementById("btn_disponibilita").addEventListener("click", async function (e) {
        e.preventDefault();
        //json slot

        const numero_persone = document.getElementById("Numero_persone").value;

        // const Data_disponibilita = document.getElementById("Data").value;
        form1_prenotazione.numero_persone = document.getElementById("Numero_persone").value;
        form1_prenotazione.Data_disponibilita = document.getElementById("Data").value;
        form1_prenotazione.id_servizio = document.getElementById("Select_Servizio").value;
        console.log("prima della get");
        const response = await fetch('/prenotazioni/api/get_slot_liberi/' + form1_prenotazione.Data_disponibilita + '/' + id_fornitore, {
            method: 'GET',
            headers: {
                "Access-Control-Request-Method": "GET",
                "Accept": "application/json",
                'Content-Type': 'application/json;charset-UTF-8'
            }
        });

        const slot_orari = await response.json();
        console.log("dopo della get");
        console.log(slot_orari);

        const select = document.getElementById("Select_orario");

        list_orari = Calc_slot_liberi(slot_orari, numero_persone, Durata_servizio)

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

        form1_prenotazione.orario = document.getElementById("Select_orario").value;
        console.log(form1_prenotazione);

        Valori_inviati={
            "ID_utente": id_cliente,
            "ID_fornitore": id_fornitore,
            "ID_servizio": form1_prenotazione.id_servizio,
            "Orario_prenotazione_inizio": form1_prenotazione.Data_disponibilita + ' ' + form1_prenotazione.orario,
            "Orario_prenotazione_fine": form1_prenotazione.Data_disponibilita+ ' ' + sumTime(form1_prenotazione.orario,Durata_servizio),
            "Numero_clienti": form1_prenotazione.numero_persone
        };
        console.log(Valori_inviati);

        /*DONE*/
        const response = fetch('/servizi/api/effettua_prenotazione', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "ID_utente": id_cliente,
                "ID_fornitore": id_fornitore,
                "ID_servizio": form1_prenotazione.id_servizio,
                "Orario_prenotazione_inizio": form1_prenotazione.Data_disponibilita + ' ' + form1_prenotazione.orario,
                "Orario_prenotazione_fine": form1_prenotazione.Data_disponibilita+ ' ' + sumTime(form1_prenotazione.orario,Durata_servizio),
                "Numero_clienti": form1_prenotazione.numero_persone
            })
        })

        window.alert("prenotato");

    });
});