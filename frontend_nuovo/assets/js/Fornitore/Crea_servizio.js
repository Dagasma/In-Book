let id_fornitore = document.cookie.substring(3, 40);

async function showPopup(Action, name) {
	var popup = document.createElement("div");
	popup.style.cssText = "position: fixed; top: 20%; left: 10%; width: 80%; background-color: #22b3c1; padding: 20px; z-index: 999; border-radius:10px; text-align:center; font-size:40px; color: white; font-weight:bold;";
	document.body.appendChild(popup);

	if (Action == "Creato") { popup.innerHTML = "Il servizio " + name + " è stato creato"; }
	else { popup.innerHTML = "Inserire tutti i campi "; }

	var btn = document.createElement("BUTTON");
	var t = document.createTextNode("Chiudi");
	btn.appendChild(t);
	btn.style.cssText = "position: relative; margin: 10px auto; padding: 10px 20px; background-color: #22b3c1; color: white; border-radius:10px; font-size:20px;";
	btn.onclick = function () {
		if (Action == "Creato") {
			let url = "/fornitore/visualizza_servizi";
			window.location.href = url;
		}
		else {
			window.location.reload;
		}


		document.body.removeChild(popup);
	};
	var linebreak = document.createElement("br");
	popup.appendChild(linebreak);
	popup.appendChild(btn);
	popup.appendChild(btn);
}

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("btn_salva").addEventListener("click", async function (e) {
		e.preventDefault();
		const Tipologia = document.getElementById("Tipologia").value;
		const Descrizione = document.getElementById("Descrizione").value;
		const Durata = document.getElementById("Durata").value;
		console.log(Tipologia)

		if (Tipologia.length != 0 && Durata.length != 0 && Descrizione.length != 0) {

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

			let text = "Creato";
			showPopup(text,Tipologia)
		}
		else {
			let text = "Non Creato";
			showPopup(text)
		}

	});
});