var current_month = 9;
var current_year = 2023;
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var week_1 = [0,0,0,0,0,0,0];
var week_2 = [0,0,0,0,0,0,0];
var week_3 = [0,0,0,0,0,0,0];
var week_4 = [0,0,0,0,0,0,0];
var week_5 = [0,0,0,0,0,0,0];
var week_6 = [0,0,0,0,0,0,0];

var week_no = 0;
var day;
function add_to_div(){
    const inputElement = document.getElementById("userInput");
    const inputValue = inputElement.value;
    if (inputValue) {
        const eventsDiv = document.getElementById("events");
        const eventElement = document.createElement("p");
        eventElement.textContent = inputValue;
        eventsDiv.append(day.toString()+"\u00A0"+months[current_month] +"\u00A0"+current_year.toString()+'\u00A0\-\u00A0'+inputValue+'\u00A0\-\u00A0');
        inputElement.value = "";
    }
    alert("Event Added Successfully")
    inputElement.disabled = true;
}
function next_month(){
    if (current_month == 11){
        current_month = 0;
        current_year += 1;
    }
    else{
        current_month += 1;
    }
    console.log(current_month)
    console.log(current_year)
}
function prev_month(){
    if(current_month == 0){
        current_month = 11;
        current_year -= 1;
    }
    else{
        current_month -= 1;
    }
    console.log(current_month)
    console.log(current_year)
}
function getDaysInMonth() {
    return new Date(current_year,current_month-1,0).getDate();
  }
function make_calender(){
    let firstDay = new Date(Number(current_year),Number(current_month),1);
    var first_day;
    console.log(firstDay)
    if (firstDay.toString().match("Mon")){
        first_day =0;
    }
    else if (firstDay.toString().match("Tue")){
        first_day =1;
    }
    else if (firstDay.toString().match("Wed")){
        first_day =2;
    }
    else if (firstDay.toString().match("Thur")){
        first_day =3;
    }
    else if (firstDay.toString().match("Fri")){
        first_day =4;
    }
    else if (firstDay.toString().match("Sat")){
        first_day =5;
    }
    else if (firstDay.toString().match("Sun")){
        first_day =6;
    }
    else{
        console.log(first_day);
    }
    var tab = document.getElementById("calender_days");
    var newRec = tab.insertRow(0);
    var new_cell;
    for (var i = 0; i < 6; i++) {
        var newRec = tab.insertRow(i);
        for (var j = 0; j < 7; j++) {
            new_cell = document.createElement('td');
            new_cell.textContent = "-";
            new_cell.id = "clickable_cell";
            new_cell.addEventListener("click", function() {
                cellClick(this);
            });

            newRec.appendChild(new_cell);
        }

    }
    var row = tab.rows[0];
    var new_num = 1;
    var end = first_day;
    while(end != 7){
        row.cells[end].innerHTML = new_num;
        week_1[end] = new_num;
        new_num ++;
        end ++;
    }
    var total_days = getDaysInMonth()
    for (var x = 1; x<6; x++){
        var row = tab.rows[x];
        for(var y = 0; y<7; y++){
            if(new_num <= total_days){
                row.cells[y].innerHTML = new_num;
                new_num++;
                if (x == 1){
                    week_2[y] = new_num
                }
                if (x == 2){
                    week_3[y] = new_num
                }
                if (x == 3){
                    week_4[y] = new_num
                }
                if (x == 4){
                    week_5[y] = new_num
                }
                if (x == 5){
                    week_6[y] = new_num
                }
            }
        }
    }

    var mon_year = months[current_month] +"\u00A0\u00A0\u00A0\u00A0\u00A0"+current_year.toString();
    var heading = document.getElementById("header");
    heading.innerHTML = mon_year;
}

function delete_table() {
    var table = document.getElementById("calender_days");
    while(table.rows.length != 0) { // Ensure there is at least one row left
        table.deleteRow(0); // Delete the second row (index 1)
    }

}
function cellClick(cell) {
    day = cell.innerHTML;
    const inputElement = document.getElementById("userInput");
    inputElement.removeAttribute("disabled");
    if (cell.style.backgroundColor == "rgb(166, 214, 240)"){
        cell.style.backgroundColor = "rgb(250, 200, 152)";
    }
    else{
        cell.style.backgroundColor = "rgb(166, 214, 240)";
        inputElement.disabled = true;
    }
}
function prev_week(){
    if(week_no != 0){
        week_no --;
    }
}
function next_week(){
    week_no ++;
}
function get_week(){
    if (week_no == 0){
        return week_1;
    }
    if (week_no == 1){
        return week_2;
    }
    if (week_no == 2){
        return week_3;
    }
    if (week_no == 3){
        return week_4;
    }
    if (week_no == 4){
        return week_5;
    }
    if (week_no == 5){
        return week_6;
    }
}
function switch_view(){
    var button = document.getElementById("views").innerHTML;
    document.getElementById("change_week_next").style.visibility = "visible";
    document.getElementById("change_week_prev").style.visibility = "visible";
    document.getElementById("month_change_next").style.visibility = "hidden";
    document.getElementById("month_change_prev").style.visibility = "hidden";
    if (button.match("WEEKLY VIEW")){
        document.getElementById("views").innerHTML = "MONTHLY VIEW";
        var tab = document.getElementById("calender_days");
        var newRec = tab.insertRow(0);
        var week = get_week();
        for (var j = 0; j < 7; j++) {
            new_cell = document.createElement('td');
            new_cell.textContent = week[j];
            new_cell.id = "clickable_cell";
            new_cell.addEventListener("click", function() {
                cellClick(this);
            });
            newRec.appendChild(new_cell);
        }

    }
    if (button.match("MONTHLY VIEW")){
        document.getElementById("views").innerHTML = "WEEKLY VIEW";
        document.getElementById("change_week_next").style.visibility = "hidden";
        document.getElementById("change_week_prev").style.visibility = "hidden";
        document.getElementById("month_change_next").style.visibility = "visible";
        document.getElementById("month_change_prev").style.visibility = "visible";
        make_calender();
    }
}