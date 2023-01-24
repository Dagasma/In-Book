let id_fornitore = document.cookie.substring(3, 40);

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("btn_salva").addEventListener("click", async function (e) {
		e.preventDefault();
		const Tipologia = document.getElementById("Tipologia").value;
		const Descrizione = document.getElementById("Descrizione").value;
		const Durata = document.getElementById("Durata").value;
		console.log(Tipologia)

	if(Tipologia.length!=0 && Durata.length !=0 && Descrizione.length!=0 ){

		const response = await fetch('/servizi/api/crea_servizio', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"ID_fornitore": id_fornitore,
				"Tipologia": Tipologia,
				"Descrizione": Descrizione,
				"Durata": Durata
			})
		})
		const risposta = await response;

		if (risposta.status == 200) {
			window.alert("Servizio creato");
		}
		else {
			window.alert("Errore");
		}
		location.reload();
}
else{
	window.alert("Inserire tutti i campi");
}

	});
});