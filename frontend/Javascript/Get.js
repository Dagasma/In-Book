var myBody = {
    "Data_giorno": "2022-01-16",
    "ID_fornitore": "6"
  };
  
  const userAction = async () => {
    console.log("sono entrato");
    console.log("dati entrati:", myBody);
  
    const response = await fetch('http://127.0.0.1:4000//servizi/api/get_servizi_dal_cliente/5', {
      method: 'GET',
      headers: {
        "Access-Control-Request-Method": "GET",
        "Accept": "application/json",
        'Content-Type': 'application/json;charset-UTF-8'
      }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson)
  }