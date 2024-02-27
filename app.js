const date = new Date();
var month = date.getMonth() + 1;
var year = date.getFullYear();
const dayWeek = date.getDay();
const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var input = document.getElementById('eventName');
var eventUpdate = document.getElementById('eventUpdate');
var modal = document.getElementById('modal');
var modalDelete = document.getElementById('modalDelete');
var idItem;


const startEvent = () => {
    document.querySelectorAll('.month').forEach((day) => {
        day.addEventListener("click",(e) => {
            idItem = e.target.id+"Container";
            if (JSON.parse(localStorage.getItem("event"))[e.target.id]) {
                modalDelete.style.display = "flex";
                eventUpdate.value = JSON.parse(localStorage.getItem("event"))[e.target.id];
            } else{
                modal.style.display = "flex"
            }
        });
    });
}

const getDays = (day, month) => {
    let dayMonth = new Date(year, month - 1, day).getDay();
    return dayMonth;
}

const dayMonth = (months) => {
    let dayMonth = new Date(year, months, 0).getDate();
    let week = [];
    let weekV2 = [];

    for (let i = 1; i <= dayMonth; i++) {
        let getDay = getDays(i, months);
        weekV2.push([i, getDay, [i, months, year]]);
        if (getDay === 0) {
            week.push(weekV2);
            weekV2 = [];
        }
    }
    week.push(weekV2);
    return week;
}

const createTable = () => {
    let eletenTable = document.getElementById('calendar');
    let week = dayMonth(month);
    let previousMonth = dayMonth(month - 1);
    let nextMonth = dayMonth(month + 1);
    week.forEach((day) => {
        let newWeek = `<tr id="delete">`;
        if (day[0][1] !== 1) {
            let a = day[0][1] - 1 == -1 ? i = 6 : day[0][1] - 1;
            for (let i = 0; i < a; i++) {
                newWeek += `<td class="otherMonth">${previousMonth[previousMonth.length - 1][i][0]}</td>`;
            }
        }
        day.forEach((dayV2) => {
            let dayTime = `${dayV2[2][0]}/${dayV2[2][1]}/${dayV2[2][2]}`;
            let Item = ""
            if (JSON.parse(localStorage.getItem("event"))) { 
                Item = JSON.parse(localStorage.getItem("event"))[dayTime]? `<div class="addItem" id="${dayTime}">${JSON.parse(localStorage.getItem("event"))[dayTime]}</div>`: "";
            } 

            newWeek += `
                    <td id="${dayTime}" class="month">
                    <div class="title" id="${dayTime}">${dayV2[0]}</div>
                    <div id="${dayTime}Container" class="containerDay">${Item}<div>
                    </td>`;
        });
        if (day.length < 7 && day[0][1] === 1) {
            nextMonth[0].forEach((next) => {
                newWeek += `
                    <td class="otherMonth">
                    ${next[0]}
                    </td>`;
            });
        }

        newWeek += `</tr>`;
        eletenTable.innerHTML += newWeek;
    });
    startEvent();
}
document.getElementById("date").innerHTML = `<div class="titleDate">${months[month - 1]} de ${year} </div>`;


document.getElementById("sendItem").addEventListener('click', (e) => {
    let date = idItem.split("Container")[0];
    document.getElementById(idItem).innerHTML = `<div class="addItem">${input.value}</div>`;
    let previousEvent = JSON.parse(localStorage.getItem("event"));
    let json = {
        ...previousEvent,
        [date]: input.value
    };
    localStorage.setItem("event", JSON.stringify(json));
    modal.style.display = "none";
    input.value = "";
});

document.getElementById("cancel").addEventListener('click', () => {
    modal.style.display = "none";
    input.value = "";
});

document.getElementById("eventDelete").addEventListener('click', () => {
    let allEvent = JSON.parse(localStorage.getItem("event"));
    delete allEvent[idItem.split("Container")[0]];
    document.getElementById(idItem).innerHTML = "";
    localStorage.setItem("event", JSON.stringify(allEvent));
    modalDelete.style.display = "none";
    eventUpdate.value = "";
});

document.getElementById("Update").addEventListener('click', (e) => {
    let date = idItem.split("Container")[0];
    document.getElementById(idItem).innerHTML = `<div class="addItem">${eventUpdate.value}</div>`;
    let previousEvent = JSON.parse(localStorage.getItem("event"));
    let json = {
        ...previousEvent,
        [date]: eventUpdate.value
    };
    localStorage.setItem("event", JSON.stringify(json));
    modalDelete.style.display = "none";
    eventUpdate.value = "";
});

document.getElementById("previous").addEventListener('click', () => {
   
    month -= 1;
    if (month === 0) {
        month = 12;
        year -= 1;
    }
    console.log(month);
    let deleteTable = document.querySelectorAll('#delete');
    document.getElementById("date").innerHTML = `<div class="titleDate">${months[month - 1]} de ${year} </div>`;

    deleteTable.forEach((table) => {
        table.remove();
    });
    createTable();
});

document.getElementById("next").addEventListener('click', () => {
    console.log("next");
    month += 1;
    if (month === 13) {
        month = 1;
        year += 1;
    }
    console.log(month);
    let deleteTable = document.querySelectorAll('#delete');
    document.getElementById("date").innerHTML = `<div class="titleDate">${months[month - 1]} de ${year} </div>`;
    deleteTable.forEach((table) => {
        table.remove();
    });
    createTable();
});

if (!localStorage.getItem("event")) {
    localStorage.setItem("event", JSON.stringify({}));
}

createTable();