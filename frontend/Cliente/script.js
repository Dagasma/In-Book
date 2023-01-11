const picked = document.getElementById("picked");
const month = document.getElementById("month");
const calendar = document.getElementById("calendar");

const DATE = new Date(); // object of daye
let thisMonth = DATE.getMonth(); 
let year = DATE.getFullYear();

const MONTHS = [ // list of months
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//CALENDAR : calculate of date
picked.innerHTML = `${DATE.getDate()}/${thisMonth + 1}/${year}`;

// CALENDAR :function create calendard
const createCalendar = () => {
  month.innerHTML = `${MONTHS[thisMonth]}, ${year}`;

  const dayOne = new Date(year, thisMonth).getDay(); // 0 to 6
  const monthDays = 32 - new Date(year, thisMonth, 32).getDate();

  date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      let column = document.createElement("td");
      if (date > monthDays) break;
      else if (i === 0 && j < dayOne) {
        let columnText = document.createTextNode("");
        column.appendChild(columnText);
        row.appendChild(column);
      } else {
        let columnText = document.createTextNode(date);
        column.appendChild(columnText);

        if(date === DATE.getDate() && thisMonth === DATE.getMonth() && year === DATE.getFullYear()){
          column.classList.add("today")
        }

        column.onclick = () => {
          picked.innerHTML = `${column.textContent}/${thisMonth + 1}/${year}`;
        };

        row.appendChild(column);

        date++;
      }
    }
    calendar.appendChild(row);
  }
};

createCalendar();

//CALENDAR : NEXT MONTH
const nextMonth = () => {
  thisMonth = thisMonth + 1;
  calendar.innerHTML = ""

  if(thisMonth > 11){
    year = year + 1
    thisMonth = 0
  }
  createCalendar()
  return thisMonth
};

// CALENDAR : PREV MONTHS
const prevMonth = () => {
  thisMonth = thisMonth - 1;
  calendar.innerHTML = ""

  if(thisMonth < 0){
    year = year - 1
    thisMonth = 11
  }
  createCalendar()
  return thisMonth
};




buildTable()
function buildTable(){
    var myArray = [
        {'name':'Michael', 'age':'30', 'birthdate':'11/10/1989'},
        {'name':'Mila', 'age':'32', 'birthdate':'10/1/1989'},
        {'name':'Paul', 'age':'29', 'birthdate':'10/14/1990'},
        {'name':'Dennis', 'age':'25', 'birthdate':'11/29/1993'},
        {'name':'Tim', 'age':'27', 'birthdate':'3/12/1991'},
        {'name':'Erik', 'age':'24', 'birthdate':'10/31/1995'},
    ]
    var table = document.getElementById('myTable')

    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].age}</td>
                        <td>${data[i].birthdate}</td>
                  </tr>`
        table.innerHTML += row


    }
}


let data = [
  {
      "ID": 1,
      "Name": "John Doe",
      "Email": "johndoe@example.com"
  },
  {
      "ID": 2,
      "Name": "Jane Smith",
      "Email": "janesmith@example.com"
  },
  {
      "ID": 3,
      "Name": "Bob Johnson",
      "Email": "bobjohnson@example.com"
  }
]

// Get the table body element
var tableBody = document.getElementById("table-body");

// Fetch the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Loop through the data and add each item to the table
    for (var i = 0; i < data.length; i++) {
      var row = tableBody.insertRow();
      var idCell = row.insertCell();
      var nameCell = row.insertCell();
      var emailCell = row.insertCell();
      idCell.innerHTML = data[i].id;
      nameCell.innerHTML = data[i].name;
      emailCell.innerHTML = data[i].email;
    }
  });