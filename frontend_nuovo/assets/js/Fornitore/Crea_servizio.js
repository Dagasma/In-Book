let id_fornitore = document.cookie.substring(3, 40);

function salva_servizio() {

	const Tipologia = document.getElementById("Tipologia").value;
	const Descrizione = document.getElementById("Descrizione").value;
	const Durata = document.getElementById("Durata").value;


	console.log(Tipologia)

	fetch('/servizi/api/crea_servizio', {
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
		.then(response => response.json())
		.then(data => { console.log(data); })
		.catch(error => console.error(error));
	esempio_slot = response;
	window.alert("Servizio creato");
	location.reload();
}