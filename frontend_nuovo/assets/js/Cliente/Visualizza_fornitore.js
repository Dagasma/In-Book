var ex_data = {
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




function generateTable(table, data, keys, index) {
    for (key of keys) {
        console.log(index);
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = "<b>" + index[key] + "<b>";
        cell2.innerHTML = data[key];
    }
}

function stampa(a, b) {
    console.log(a, b);
}

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

    var table = document.getElementById("json-table");
    console.log("pre func", ex_data)
    generateTable(table, ex_data, keys, index);//print table


}

