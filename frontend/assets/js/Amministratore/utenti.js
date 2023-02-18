let id_fornitore = document.cookie.split('; ').reduce((prev, current) => {
    const [name, ...value] = current.split('=');
    prev[name] = value.join('=');
    return prev;
  }, {}).id;;

async function showPopup(Action, name, element) {
    var popup = document.createElement("div");
    popup.style.cssText = "position: fixed; top: 20%; left: 10%; width: 80%; background-color: #22b3c1; padding: 20px; z-index: 999; border-radius:10px; text-align:center; font-size:40px; color: white; font-weight:bold;";
    document.body.appendChild(popup);

    if (Action == "Blocca") { popup.innerHTML = "Hai bloccato " + name + " ?"; }
    else if (Action == "Sblocca") { popup.innerHTML = "Hai sblocato " + name + " ?" }
    else { popup.innerHTML = "Error"; }
    console.log(element)
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Chiudi");
    btn.appendChild(t);
    btn.style.cssText = "position: relative; margin: 10px auto; padding: 10px 20px; background-color: #22b3c1; color: white; border-radius:10px; font-size:20px;";
    btn.onclick = async function () {
        if (Action == "Blocca") {

            const response = await fetch('/amministratore/api/gestisci_utente/' + element.ID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Bloccato": true,
                })
            })

            window.location.reload();
        }
        else if (Action == "Sblocca") {
            const response = await fetch('/amministratore/api/gestisci_utente/' + element.ID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Bloccato": false,
                })
            })
            window.location.reload();
        }

        document.body.removeChild(popup);
    };
    var linebreak = document.createElement("br");
    popup.appendChild(linebreak);
    popup.appendChild(btn);
    popup.appendChild(btn);
}

async function richiedi_utenti() {
    /* DONE */
    console.log("richiedi utenti")
    const response = await fetch('/amministratore/api/get_utenti', {
        method: 'GET',
        headers: {
            "Access-Control-Request-Method": "GET",
            "Accept": "application/json",
            'Content-Type': 'application/json;charset-UTF-8'
        }
    });
    const utenti = await response.json(); //extract JSON from the http response
    // // do something with myJson
    return utenti;
}

function generateTableHead(table, data, columns) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of columns) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
    let th = document.createElement("th");
    let text = document.createTextNode("");
    th.appendChild(text);
    row.appendChild(th);
    th = document.createElement("th");
    text = document.createTextNode("");
    th.appendChild(text);
    row.appendChild(th);
}

function generateTable(table, data, index) {
    for (let element of data) {
        let row = table.insertRow();
        for (key of index) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }

        let buttonCell = row.insertCell();
        if (element.Bloccato == true && element.Tipo != "Amministratore") {
            // Crea un bottone e aggiungilo alla cella
            let button = document.createElement("section");
            button.style.backgroundColor = "#22b3c1";
            button.style.color = "white";
            button.style.textAlign = "center";
            button.style.display = "flex";
            button.style.alignItems = "center";
            button.style.justifyContent = "center";
            button.style.borderRadius = "10px";
            button.style.margin = "0";
            button.style.padding = "30%";
            button.innerHTML = "  Sblocca  ";
            button.type = 'submit';
            button.value = element.ID;
            button.onclick = function exe_botton() {
                let text = "Sblocca"
                showPopup(text, element.Nome + " " + element.Cognome, element)
            }
            buttonCell.appendChild(button);
        }
        if (element.Bloccato == false && element.Tipo != "Amministratore") {
            // Aggiungi una nuova cella alla fine della riga
            buttonCell = row.insertCell();
            let button1 = document.createElement("section");
            button1.style.backgroundColor = "#22b3c1";
            button1.style.color = "white";
            button1.style.textAlign = "center";
            button1.style.display = "flex";
            button1.style.alignItems = "center";
            button1.style.justifyContent = "center";
            button1.style.borderRadius = "10px";
            button1.style.margin = "0";
            button1.style.padding = "30%";
            button1.innerHTML = "Blocca";
            button1.type = 'submit';
            button1.value = element.ID;
            button1.onclick = function exe_botton() {
                let text = "Blocca"
                showPopup(text, element.Nome + " " + element.Cognome, element)
            }
            buttonCell.appendChild(button1);
        }
    }
}

async function create_table(ex_data, en_page = 0) {
    //let table = document.querySelector("table");// create table
    let keys = ["Nome", "Cognome", "Data_di_nascita", "ID", "Telefono", "Tipo", "Bloccato"];

    if (en_page == 0) {
        ex_data = await richiedi_utenti();
    }

    var table = document.getElementById("json-table");
    table.innerHTML = "";

    if (ex_data.length > 0) {
        let data = Object.keys(ex_data[0]);//save the keys
        generateTableHead(table, data, keys);//create header
        generateTable(table, ex_data, keys);
    }//print table}
    else { table.innerHTML = "Non è presente nessuna prenotazione..."; }
}

//listener bottone prenotazione
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn_filtra").addEventListener("click", async function (e) {
        e.preventDefault();

        let filtro = {}
        filtro.Nome = document.getElementById("Nome").value;
        filtro.Cognome = document.getElementById("Cognome").value;
        let dati_filtrati = []

        console.log(filtro)

        ex_data = await richiedi_utenti(filtro);
        for (let element of ex_data) {
            if (element.Nome != filtro.Nome && filtro.Nome != '') {

            }
            else if (element.Cognome != filtro.Cognome && filtro.Cognome != '') {

            }
            else {
                console.log(element)
                dati_filtrati.push(element)
            }
        }
        let en_page = 1;
        console.log(dati_filtrati);
        create_table(dati_filtrati, en_page);
    });
});