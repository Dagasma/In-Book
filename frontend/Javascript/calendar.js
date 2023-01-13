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

                if (date === DATE.getDate() && thisMonth === DATE.getMonth() && year === DATE.getFullYear()) {
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

    if (thisMonth > 11) {
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

    if (thisMonth < 0) {
        year = year - 1
        thisMonth = 11
    }
    createCalendar()
    return thisMonth
};

/* 

<div class="calendar">
       
        <div id="calender-header">
          <button onclick="prevMonth()"><</button>
          <h3 id="month"></h3>
          <button onclick="nextMonth()">></button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thur</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody id="calendar">
    
          </tbody>
        </table>
    </div>

    <!-importare il css-->
*/