const date = new Date();
var month = date.getMonth() + 1;
const dayWeek = date.getDay();
const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const getDays = (day, month) => {
    let dayMonth = new Date(2024, month - 1, day).getDay();
    return dayMonth;
}

const dayMonth = (months) => {
    let dayMonth = new Date(2024, months, 0).getDate();
    let week = [];
    let weekV2 = [];

    for (let i = 1; i <= dayMonth; i++) {
        let getDay = getDays(i, months);
        weekV2.push([i, getDay]);
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
    let previusMonth = dayMonth(month - 1);
    let nextMonth = dayMonth(month + 1);
    week.forEach((day) => {
        let newWeek = `<tr id="delete">`;
        if (day[0][1] !== 1) {
            let a = day[0][1] - 1 == -1 ? i = 6 : day[0][1] - 1;
            for (let i = 0; i < a; i++) {
                newWeek += `<td class="otherMonth">${previusMonth[previusMonth.length - 1][i][0]}</td>`;
            }
        }
        day.forEach((dayV2) => {
            newWeek += `
                    <td id="${dayV2[0]}" class="month">
                    <div class="title">${dayV2[0]}</div>
                    <div id="${dayV2[0]}Container" class="containerDay"><div>
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
}


function nexttMonth() {
    month += 1;
    let deleteTable = document.querySelectorAll('#delete');
    document.getElementById("date").innerHTML = `${months[month - 1]}`;
    deleteTable.forEach((table) => {
        table.remove();
    });
    createTable();
}
document.getElementById("date").innerHTML = `${months[month - 1]}`;
createTable()

document.querySelectorAll('.month').forEach((day) => {
    day.onclick = (e)=> {
        let modal = document.getElementById('modal');
        modal.style.display = "flex"
        let id = e.target.id + "Container";
        let container = document.getElementById(id);
        let input = document.getElementById('eventName');


        document.getElementById('addItem').addEventListener(
            'click', () => {
                container.innerHTML += `<div class="addItem">${input.value}</div>`;
                console.log({"hola":input.value});
                modal.style.display = "none";
                input.value = "";
            }
        );
        document.getElementById('cancel').addEventListener(
            'click', () => {
                modal.style.display = "none";
                input.value = "";

            }
        );


        //document.getElementById('addItem').removeEventListener('click', () => {});
        
    };
});