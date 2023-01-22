
// TAKE ID_FORNITORE AND ID_CLIENTE
const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);
const id_fornitore = searchParams.get('id');
let id_cliente = document.cookie.substring(3, 40);

// GLOBAL VARIABLE 
let Durata_servizi = {};
let form1_prenotazione = {};
let en_voto_fatto = 1;
let id_voto = 0;




async function showPopup(Action) {
    console.log(Action == "Prenotazione");

    var popup = document.createElement("div");
    popup.style.cssText = "position: fixed; top: 20%; left: 10%; width: 80%; background-color: #22b3c1; padding: 20px; z-index: 999; border-radius:10px; text-align:center; font-size:40px; color: white; font-weight:bold;";
    document.body.appendChild(popup);

    if (Action == "Prenotazione") { popup.innerHTML = "Prenotazione effettuata"; }
    else if (Action == "Errore") { popup.innerHTML = "Errore qualcosa è andato storto"; }
    else if (Action == "Voto1") { popup.innerHTML = "Voto Salvato"; }
    else if (Action == "Voto2") { popup.innerHTML = "Voto Aggiornato"; }
    else if (Action == "Nessuna Disponibilita") { popup.innerHTML = "Non è presente nessun orario"; }
    else if (Action == "Giorno passato") { popup.innerHTML = "Hai selezionato un giorno gia passato"; }

    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Chiudi");
    btn.appendChild(t);
    btn.style.cssText = "position: relative; margin: 10px auto; padding: 10px 20px; background-color: #22b3c1; color: white; border-radius:10px; font-size:20px;";
    btn.onclick = function () {
        document.body.removeChild(popup);

        if (Action == "Prenotazione") {
            let url = "/cliente/visualizza_prenotazioni";
            window.location.href = url;
        }
        else if (Action == "Errore") { location.reload() }
        else if (Action == "Voto1") { location.reload() }
        else if (Action == "Voto2") { location.reload() }
        else if (Action == "Nessuna Disponibilita") { location.reload() }
        else { location.reload() }

    };
    var linebreak = document.createElement("br");
    popup.appendChild(linebreak);
    popup.appendChild(btn);
    popup.appendChild(btn);
}


// DIFF TIME
function diff_time_hhmm(time1, time2) {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    let minutesDiff = (hours1 * 60 + minutes1) - (hours2 * 60 + minutes2);
    if (minutesDiff < 0) minutesDiff = minutesDiff + 1440; // 1440 is the total minutes in a day.
    let hoursDiff = Math.floor(minutesDiff / 60);
    let minutesDiffRemaining = minutesDiff % 60;

    return `${hoursDiff.toString().padStart(2, '0')}:${minutesDiffRemaining.toString().padStart(2, '0')}`;
}

//SUM TIME
function sumTime(time1, time2) {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    let minutesDiff = (hours1 * 60 + minutes1) + (hours2 * 60 + minutes2);
    let hoursDiff = Math.floor(minutesDiff / 60);
    let minutesDiffRemaining = minutesDiff % 60;
    return `${hoursDiff.toString().padStart(2, '0')}:${minutesDiffRemaining.toString().padStart(2, '0')}`;
}

//DIV TIME
function Rapporto_time(time1, time2) {
    console.log(time1, time2)
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    const minutes1Total = hours1 * 60 + minutes1;
    const minutes2Total = hours2 * 60 + minutes2;
    return minutes1Total / minutes2Total;
}

//GET ELEMENT FORNITORE
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

//GENEARATE TABLE
function generazione_table(table, data, keys, index) {
    for (key of keys) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = "<b>" + index[key] + "<b>";
        cell2.innerHTML = data[key];
    }

}

// GET MEDIA
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

// INSERT SERVICE IN THE FORME
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
        Durata_servizi[servizi_fornitore_ex[i].ID] = servizi_fornitore_ex[i].Durata;
        optionElement.text = servizi_fornitore_ex[i].Tipologia + " - " + servizi_fornitore_ex[i].Durata.substring(0, 5);
        select.appendChild(optionElement);
    }

}

//INSERT TABLE
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

// CALCULATE TIME AVAILABLE
function Calc_slot_liberi(slot, capacita, durata) {
    let orari_disponibili = []
    console.log(durata)

    let slot_durata = diff_time_hhmm(slot[1].Orario_inizio, slot[0].Orario_inizio)
    let rapporto = Rapporto_time(durata, slot_durata)

    //console.log(rapporto, slot_durata, slot);

    let cnt = 0; // conteggio slot
    for (let i = 0; i < slot.length - rapporto + 1; i++) { // scorro tutti gli slot
        //console.log(slot[i + j].Posti_disponibili , capacita)
        //console.log("slot ", i, "orario :", slot[i].Orario_inizio, "slot durata :", slot_durata);
        for (let j = 0; j < rapporto; j++) { // scorro gli slot successivi che copre la prenotazione
            if ((j == rapporto - 1 && slot[i + j].Posti_disponibili >= capacita) || (i + j >= slot.length)) {
                cnt++;
                if (cnt == rapporto) {
                    orari_disponibili.push(slot[i].Orario_inizio);
                }
            }
            else if (slot[i + j].Posti_disponibili >= capacita && (diff_time_hhmm(slot[i + j + 1].Orario_inizio, slot[i + j].Orario_inizio) == slot_durata || i + j == slot.length - 1)) {
                cnt++;
            }
            else { }
        }
        cnt = 0;
    }
    console.log(orari_disponibili)
    return orari_disponibili;
}

// CHECK VOTO
async function get_voto() {
    const response = await fetch('/Votazioni/api/get_voto/' + id_cliente + '/' + id_fornitore, {
        method: 'GET',
        headers: {
            "Access-Control-Request-Method": "GET",
            "Accept": "application/json",
            'Content-Type': 'application/json;charset-UTF-8'
        }
    });
    const servizi_fornitore_ex = await response.json(); //extract JSON from the http response

    var h4Element = document.getElementById("Testo_Voto");
    var btn_voto = document.getElementById("btn_voto");
    if (servizi_fornitore_ex.length >= 1) {
        h4Element.innerHTML = "Hai gia effettuato la votazione : " + servizi_fornitore_ex[0].Voto + ". Completa il form per modificare il voto.";
        en_voto_fatto = 1;
        btn_voto.innerHTML = "Aggiorna Voto";
        id_voto = servizi_fornitore_ex[0].ID
    }
    else {
        //h4Element.innerHTML = "Vota il fornitore";
        en_voto_fatto = 0;
    }

    console.log("voto", servizi_fornitore_ex[0].Voto);
}

get_voto();

//POST VOTO 
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn_voto").addEventListener("click", async function (e) {
        e.preventDefault();

        const voto = document.getElementById("Voto").value;
        let risposta;
        let Action = "Voto1";
        if (en_voto_fatto != 1) {
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
            risposta = await response1.status;
            console.log(risposta);
        }
        else {
            Action = "Voto2";
            const response1 = await fetch('/Votazioni/api/cambia_voto/' + id_voto + '/' + id_cliente, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Voto": voto
                })
            })
            risposta = await response1.status;
            console.log(risposta);
        }

        if (risposta == 200) {
            console.log(Action);
            showPopup(Action);
        }
        else {
            let Action = "Errore"
            showPopup(Action);
        }

    });
});

//GET DISPONIBILITA
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

        // data attuale
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);

        let today = new Date(`${year}-${month}-${day}`);
        let selectedDate = new Date(form1_prenotazione.Data_disponibilita)

        // calcola la differenza in millisecondi
        var diffInHours = (today.getTime() - selectedDate.getTime()) / (1000 * 3600);
        console.log(diffInHours, today.getTime(), selectedDate.getTime())
        // converti in giorni
        if (diffInHours > 0) {
            let Action = "Giorno passato"
            showPopup(Action)
        }

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
        if (response.status != 200) {
            let Action = "Nessuna Disponibilita";
            showPopup(Action);
        }
        const select = document.getElementById("Select_orario");

        list_orari = Calc_slot_liberi(slot_orari, numero_persone, Durata_servizi[form1_prenotazione.id_servizio])

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

//POST PRENOTAZIONE
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn_prenota").addEventListener("click", async function (e) {
        e.preventDefault();

        form1_prenotazione.orario = document.getElementById("Select_orario").value;
        console.log(form1_prenotazione);

        Valori_inviati = {
            "ID_utente": id_cliente,
            "ID_fornitore": id_fornitore,
            "ID_servizio": form1_prenotazione.id_servizio,
            "Orario_prenotazione_inizio": form1_prenotazione.Data_disponibilita + ' ' + form1_prenotazione.orario,
            "Orario_prenotazione_fine": form1_prenotazione.Data_disponibilita + ' ' + sumTime(form1_prenotazione.orario, Durata_servizi[form1_prenotazione.id_servizio]),
            "Numero_clienti": form1_prenotazione.numero_persone
        };
        console.log(Valori_inviati);

        /*DONE*/
        const response = await fetch('/prenotazioni/api/effettua_prenotazione', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "ID_utente": id_cliente,
                "ID_fornitore": id_fornitore,
                "ID_servizio": form1_prenotazione.id_servizio,
                "Orario_prenotazione_inizio": form1_prenotazione.Data_disponibilita + ' ' + form1_prenotazione.orario,
                "Orario_prenotazione_fine": form1_prenotazione.Data_disponibilita + ' ' + sumTime(form1_prenotazione.orario, Durata_servizi[form1_prenotazione.id_servizio]),
                "Numero_clienti": form1_prenotazione.numero_persone
            })
        })

        risposta = await response.status;
        console.log(risposta);

        if (risposta == 200) {
            let Action = "Prenotazione";
            showPopup(Action);
        }
        else {
            let Action = "Errore"
            showPopup(Action);
        }

    });
});